# Private Party Tutorial

The private-party contract is a beginner level contract that will demonstrate the following features:
- Hiding information on the public ledger
- Access control to circuits
- Operations on a set
- Introduction to Witness functions

This tutorial covers a line-by-line walkthrough of the Compact code and the supporting frontend test suite. It does not cover any UI implementation.

## Prerequisites

Before you begin this tutorial, esure you have:
- [installed the toolchain](../../getting-started/installation)
- Node.js v22+

## Problem Analysis

Let's say you have a party and want to keep the guest list private. Maybe you want to keep the guests from knowing who each other are or maybe you want to hide the guest list from the public. Midnight allows you to hide this information in plain sight and later verify that information.

The party organizer can hide each participant on the public ledger through hashing capabilities provided by Compact and use those same capabilities to later prove the information under that hash.

Each user could be added to the list by the organizer and the list kept private until the attendees arrive to check-in to the party. After attendees check in, their information can be made public.

## Program Design

The organizer needs to be able to:
1. start the contract
1. add other organizers
1. add party participants
1. start the party (locally and on-chain)
1. Allow members of the guest list to check in (verification)
1. Reveal members of the guest list to the public

These program actions will map to (in no particular order):
- Compact circuits
- TypeScript Witness functions
- Public Ledger operations
- Private state variables
- Hashing functions and later verification of the data

## Compact Tutorial

Compact provides many useful capabilities to support our private party. This section focuses on the design and implementation of the Compact code that will be deployed as the backend.

### Setup

Create the project root folder and `package.json`:
```bash
mkdir example-private-party && cd example-private-party
touch package.json 
```

Add the following to `package.json`:
```json
{
  "name": "example-private-party",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "workspaces": [
    "contracts"
  ],
  "scripts": {
    "test": "vitest"
  },
  "devDependencies": {
    "@types/node": "^25.3.2",
    "@types/ws": "^8.18.1",
    "@typescript-eslint/eslint-plugin": "^8.56.1",
    "@typescript-eslint/parser": "^8.56.1",
    "testcontainers": "^11.12.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3",
    "vitest": "^4.0.18"
  },
  "dependencies": {
    "@midnight-ntwrk/compact-runtime": "0.14.0",
    "@midnight-ntwrk/midnight-js-network-id": "3.1.0",
    "@midnight-ntwrk/compact-js": "2.4.0"
  }
}
```

Install depedencies:
```bash
npm install
```

Set up for Compact code:
```bash
mkdir contracts && cd contracts
mkdir src && cd src
touch private-party.compact
```
Open the `.compact` file in your text editor and start with some declarations:
```compact
pragma language_version 0.21;
import CompactStandardLibrary;

export enum PartyState {
    NOT_READY,
    READY
}
```
- line 1 specifies the compatible version of the Compact language
- line 2 imports the `CompactStandardLibrary` which provides standard types and circuits for use in Compact programs
- lines 4-7 declare a custom data type through `enum` and assign it two avaible values `NOT_READY, READY`

### Identifier declarations

Now we'll declare the public ledger identifiers and their types:
```compact
export ledger organizers: Set<ZswapCoinPublicKey>;
export ledger hashedPartyGoers: Set<Bytes<32>>;
export ledger checkedInParty: Set<Bytes<32>>;
export ledger partyState: PartyState;
export ledger partiers: Counter;
export ledger maxListSize: Uint<8>;
```

All values with the `ledger` declaration are *public* values. Compact comes with the ability to hide information in these values through hashing and commitment schemes. In particular, we will be hiding the list of party participants in `hashedPartyGoers`.

Organizers will be public information through their public key in the Set of `organizers`, which is represented through the `ZswapCoinPublicKey` type.

### Witness function signature
The Compact code will only be aware of the function signature of our witness code. In this way, Compact does not actually need to know the underlying code in the frontend -- we can still enforce correct execution there through our use of `assert()` statements in the backend.

Add the witness function signature:
```compact
witness localStartParty() : PartyState;
```

We expect the party to start (IRL or "locally") when the guest list is full or the organizer starts the party manually. After the party starts, the function should return the current state of the party.

### Party Constructor

Let's construct this party by defining its initial state through the constructor:
```compact
constructor() {
    organizers.insert(ownPublicKey());
    partyState = PartyState.NOT_READY;
    maxListSize = 99;
}
```
- line 19 uses `insert` on the `organizers` Set to add the public key of the caller
- line 20 sets the public partyState variable to `NOT_READY`
- line 21 arbitrarily sets the max guest list size to `99`

### Add Organizer Circuit

The existing organizer may wish to add other organizers to the Set:
```compact
export circuit addOrganizer(newOrganizerPk: ZswapCoinPublicKey): [] {
    const organizer = ownPublicKey();
    assert(organizers.member(organizer), "You are not an organizer");
    assert(!organizers.member(disclose(newOrganizerPk)), "You are already in the organizer list");
    assert(partyState == PartyState.NOT_READY, "The party has already started");
    
    organizers.insert(disclose(newOrganizerPk));
}
```
- line 24 is the signature of the circuit `addOrganizer`  
    - `export` makes this circuit available outside of the contract  
    - `(newOrganizerPk: ZswapCoinPublicKey)` takes the public key of the organizer to be added to the Set as an input parameter  
    - `[]` denotes that this circuit has no return value  
- line 25 `ownPublicKey()` grabs the publicKey of the caller and stores it 
- lines 26-28 are access control checks. These checks verify:
    - Only an `organizer` can call this function
    - The organizer to be added is not already in the Set
    - The party has not started yet
    - Only after these have been verified to be correct, will the new organizer be added to the public `organizers` set

:::note
Information passed through parameters to and inside of Compact circuits is *private by default* and not including explicit `disclosure()` when a value may be exposed publicly, will result in a compiler error.
:::

### Add Participant(s)

Now that we have our list of organizers, we need to be able to add them to the ledger. But we know that all ledger information is public, so how do we hide the participants public keys on the ledger without revealing them?

The answer is through Compact's `persistentHash`, a SHA-256–based, upgrade-stable hash function that compresses (mostly arbitrary) Compact values into a 32-byte result suitable for deriving persistent on-chain state. Let's implement it:
```compact
circuit commitWithSk(_participantPk: Bytes<32>, _sk: Bytes<32>) : Bytes<32> {
    return disclose(persistentHash<Vector<2, Bytes<32>>>([_participantPk, _sk]));
}
```
- line 71 is the signature
    - note there is no `export`, so this function is only available to this contract internally
    - The circuit takes in the public key to be hashed and the secret key of the organizer hashing the information. Remember that circuit inputs are private, so it is safe to pass this information here.
- line 72 returns the hash after `disclose()`ing it. Attempting to post this hash to the ledger before `disclose()` will result in a compiler error.

Let's look at the full `addParticipant` circuit:
```compact
export circuit addParticipant(_participantPk: Bytes<32>, _organizerSk: Bytes<32>): [] {
    assert(organizers.member(ownPublicKey()), "You are not an organizer");
    assert(partyState == PartyState.NOT_READY, "The party has already started");
    assert(partiers < maxListSize, "The list is full.");

    const participant = commitWithSk(_participantPk, _organizerSk);
    hashedPartyGoers.insert(disclose(participant));
    partiers.increment(1);

    if (partiers == maxListSize) {
        const localPartyState = localStartParty();
        
        // don't trust, verify
        assert(localPartyState == PartyState.READY, "Please start the party, the list is full");
        partyState = PartyState.READY;
    }
}
```
- lines 35-37 are access control `assert`ions
- line 39 calls the `commitWithSk()` circuit and returns the hash of the participant
- line 40 inserts that hash into the Set of `hashedPartyGoers`
- line 41 increments the counter for number of invited attendees
- line 43 checks if the list is full
- line 45 calls the witness function `localStartParty()` in the frontend
- line 47 `assert`s the correct return from the frontend function. In this way, we can guarantee the frontend function returns what we expect it to.
- line 48 updates the ledger variable `partyState`

### Start the party (on-chain)

We've already defined in `addParticipant` the start of the party if the list is full, but what about starting the party with a less than full list? Let's craft an on-chain function that can be called by the organizer to transition the public state of the party:
```compact
export circuit chainStartParty(): [] {
    assert(organizers.member(ownPublicKey()), "Only organizers can start the party");
    assert(partyState == PartyState.NOT_READY, "The party has already started");

    const localPartyState = disclose(localStartParty());
    assert(localPartyState == PartyState.READY, "Please start the party locally");
    partyState = localPartyState;
}
```
- lines 62-63 are access control checks
- line 65 discloses the return of the frontend `localStartParty()` function
- line 66 `assert`s that verifies the return value is correct
- line 67 updates the `partyState` ledger variable

### Check-in to the party

Now that the participants have been added and the party has started, the next step is to let participants check in at the party:
```compact
export circuit checkIn(participantPk: Bytes<32>, _organizerSk: Bytes<32>): [] {
    assert(organizers.member(ownPublicKey()), "You are not an organizer");
    assert(partyState == PartyState.READY, "The party has not started yet");
    assert(checkedInParty.size() < partiers, "All guests have already checked in");
    assert(hashedPartyGoers.member(commitWithSk(participantPk, _organizerSk)), "You are not on the list");

    checkedInParty.insert(disclose(participantPk));
}
```
- lines 53-55 are access control checks verifying:
    - The caller is an organizer
    - Party state is as expected
    - Not all guests have checked in
- line 56 is the interesting line here in that it is how we check previously hashed information. We cannot "unhash" the existing hash, the value under it is hidden forever. What we can do is have the user provide the value again, hash the value again and compare the hashes. When hashing the exact same information, we expect the exact same hash.
- line 57 provides the `disclose` to let the compiler know that the information is now marked as public and stored in `checkedInParty`.

That's all folks, that's all of the Compact code we need to start our private party contract in about 75 lines. Let's make sure the program compiles, from the `src` directory:
```bash
compact compile private-party.compact managed/private-party
```

Should produce output like this:
```terminal
Compiling 4 circuits:
  circuit "addOrganizer" (k=10, rows=572)  
  circuit "addParticipant" (k=13, rows=4791)  
  circuit "chainStartParty" (k=9, rows=293)  
  circuit "checkIn" (k=13, rows=4765)  
Overall progress [====================] 4/4
```
:::note
If compilation was not successful, work with the compiler output to determine where the error may exist in your code. A lot of lessons can be learned by fighting the compiler.
:::

After successful compilation, you should see new directories for the compiled contract artifacts:
```
contracts/
├── src/
|   └── managed/
|       └── private-party/
|           ├── compiler/
|           ├── contract/
|           ├── keys/
|           └── zkir/
└── private-party.compact
```

Now that the contract compiles correctly, let's move on to defining the witness functions.

## TS config

Before writing any Typescript, make sure to create the config file in the `contracts` directory:
```bash
touch contracts/tsconfig.json
```

Populate the config file:
```json
{
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "lib": ["ESNext"],
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strict": true,
    "isolatedModules": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Witnesses in the frontend

In our Compact contract, we declared a witness function. As a reminder, the witness function only has a signature declaration in Compact, it is actually defined in the frontend of the DApp, which is why we *don't trust any witness* but we must *verify* information from witnesses. Enough philosophy, let's create our frontend witness file:
```bash
touch src/witnesses.ts
```

Start by creating necessary imports:
```ts
import { Ledger, PartyState } from './managed/private-party/contract/index.js';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';
```

We should also define a type for all of the data required to be in the private state of the DApp:
```ts
export type PartyPrivateState = {
    partyState: number;
}
```

Notice that `partyState` is the only private state variable in our DApp and that it has a different type than it did in Compact. That is because an `enum` type in Compact maps to a `number` in TypeScript, specifically to the index of the selected value in the `enum`. See the complete list of type mappings here(@TODO -- insert link for type mappings)

Next, let's create a helper function for returning on object of the `partyState`:
```ts
export const createPartyPrivateState = (partyState: number) => ({
    partyState,
});
```

Now let's move on to our witness function. The input parameters and returns *must exactly match* the function signature declaration in our .`compact` file. As a reminder, that signature is `localStartParty() : PartyState`. Let's see what that looks like in the frontend:
```ts
export const witnesses = {
    localStartParty: ({
        privateState
    }: WitnessContext<Ledger, PartyPrivateState>): [
        PartyPrivateState,
        number
    ] => [privateState, PartyState.READY],
};
```
1. line 27 is an object to hold all of the witness functions from the contract.
1. line 28 begins the definition of `localStartParty`.
1. line 29 passes `privateState` as a parameter and this *must be included* here for all witness functions.
1. line 30 passes the first parameter our witness function and *must always include* the `WitnessContext<L, PS>`. This can be followed by any other parameters defined by localStartParty in the contract.
1. lines 31-32 are the return types. The witness function must always pass the private state as its first argument.
1. line 33 returns the actual values for the corresponding return types.



2. export type PartyPrivateState
3. export const createPartyPrivateState (for use later)

## Party Simulator
In order to run many tests against our private-party contract, we'll need to create a class that will be used to initiate different test cases.

```bash
cd contracts/src
mkdir test
touch party-simulator.ts
```

Open the party-simulator.ts file in your VSCode

### Imports
For now let's just add the necessary imports:
```ts
import {
    type CircuitContext,
    sampleContractAddress,
    createConstructorContext,
    CostModel,
    QueryContext,
} from "@midnight-ntwrk/compact-runtime";
import { 
    Contract,
    type Ledger,
    ledger,
    PartyState,
 } from "../managed/private-party/contract/index.js";
import { 
    type PartyPrivateState, 
    witnesses, 
    createPartyPrivateState 
} from "../witnesses.js";
```

Now let's write the simulator class.

## Test using the Simulator

Create the scaffolding for necessary class components:
```ts
export class PartySimulator {

    constructor() {

    }
}
```

Let's define the type for our new contract and create a new instance:
```ts
export class PartySimulator {
    readonly contract: Contract<PartyPrivateState>;

    constructor() {
        this.contract = new Contract<PartyPrivateState>(witnesses);
    }
}
```

Now we create the initial state of our contract:
```ts
export class PartySimulator {
    readonly contract: Contract<PartyPrivateState>;
    startingState: PartyPrivateState;

    constructor() {
        this.contract = new Contract<PartyPrivateState>(witnesses);
        this.startingState = createPartyPrivateState(PartyState.NOT_READY);
        const {
            currentPrivateState,
            currentContractState,
            currentZswapLocalState
        } = this.contract.initialState(
            createConstructorContext(this.startingState, "0".repeat(64))
        );
    }
}
```

Now we need to provide context for the circuits, based on the returns from our initial state:
```ts
export class PartySimulator {
    readonly contract: Contract<PartyPrivateState>;
    startingState: PartyPrivateState;
    circuitContext: CircuitContext<PartyPrivateState>;// new
```

```ts
constructor() {
        this.contract = new Contract<PartyPrivateState>(witnesses);
        this.startingState = createPartyPrivateState(PartyState.NOT_READY);
        const {
            currentPrivateState,
            currentContractState,
            currentZswapLocalState
        } = this.contract.initialState(
            createConstructorContext(this.startingState, "0".repeat(64))
        );
        this.circuitContext = {// new
            currentPrivateState,
            currentZswapLocalState,
            costModel: CostModel.initialCostModel(),
            currentQueryContext: new QueryContext(
                currentContractState.data,
                sampleContractAddress(),
            )
        }
    }
```

Now we need to create functions in our simulator for the circuits in our contract, add this just below the constructor:
```ts
// addOrganizer
        public addOrganizer(newOrganizerPk: Uint8Array): void {
            this.circuitContext = this.contract.impureCircuits.addOrganizer(
                this.circuitContext,// always pass as first argument
                { bytes: newOrganizerPk }
            ).context;
        }
        // addParticipant
        // checkIn
        // chainStartParty
```
Here we demonstrate the shape of circuit calls, what would the other definitions look like? Be sure to try them yourself before lookig up the solution below -- the rest have very similar types and data shapes, with only some minor differences.


Now the solutions:
```ts
    }// end of constructor
        // addOrganizer
        public addOrganizer(newOrganizerPk: Uint8Array): void {
            this.circuitContext = this.contract.impureCircuits.addOrganizer(
                this.circuitContext,
                { bytes: newOrganizerPk },// transform ZswapPublicCoin -> Bytes<32>
            ).context;
        }
        // addParticipant
        public addParticipant(participantPk: Uint8Array, organizerSk: Uint8Array): void {
            this.circuitContext = this.contract.impureCircuits.addParticipant(
                this.circuitContext,
                participantPk,
                organizerSk,
            ).context;
        }
        // checkIn
        public checkIn(participantPk: Uint8Array, organizerSk: Uint8Array): void {
            this.circuitContext = this.contract.impureCircuits.checkIn(
                this.circuitContext,
                participantPk,
                organizerSk,
            ).context;
        }
        // chainStartParty
        public chainStartParty(): void {
            this.circuitContext = this.contract.impureCircuits.chainStartParty(
                this.circuitContext,
            ).context;
        }
}// end of class
```

It will also be useful to define some helper functions for use in our tests, add these after your `chainStartParty` function:
```ts
        // helper functions
        public getLedger(): Ledger {
            return ledger(this.circuitContext.currentQueryContext.state);
        }
        public getPrivateState(): PartyPrivateState {
            return this.circuitContext.currentPrivateState;
        }
}// end of class
```

And that is all for Simulator code -- we can now create instances of our party contract quickly and efficiently! Let's finish the setup before moving on to writing tests.

### More setup

Create the `src/index.ts` file:
```bash
touch src/index.ts
```

Populate the `index.ts` file: @TODO -- do I need this?
```ts
import { CompiledContract } from '@midnight-ntwrk/compact-js';
export * from './managed/private-party/contract/index.js';
export * from './witnesses';

import * as CompiledPartyContract from './managed/private-party/contract/index.js';
import * as Witnesses from './witnesses';

export const CompiledPartyContractContract = CompiledContract.make<CompiledPartyContract.Contract<Witnesses.PartyPrivateState>>(
    "Private Party",
    CompiledPartyContract.Contract<Witnesses.PartyPrivateState>,
).pipe(
    CompiledContract.withWitnesses(Witnesses.witnesses),
    CompiledContract.withCompiledFileAssets('./compiled/private-party'),
);
```

Create the `vitest.config.ts` file:
```bash
touch contracts/vitest.config.ts
```

Populate the testing config file:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  mode: "node",
  test: {
    deps: {
      interopDefault: true
    },
    globals: true,
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules"],
    root: ".",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        branches: 50,
        functions: 73,
        lines: 72,
        statements: -269
      }
    },
    reporters: ["default", ["junit", { outputFile: "reports/report.xml" }]]
  },
  resolve: {
    extensions: [".ts", ".js"],
    conditions: ["import", "node", "default"]
  }
});
```

Save the file and we'll move on to writing some tests.

### Test writing party

...or is it a party writing tests? Either way, this is where we'll create many instances of the `private-party` contract and test every interaction possible. 

First, let's create our test file:
```bash
touch test/party.test.ts
```

Declare imports (this may be tempting to copy/paste, but you should write these out by hand to better understand the location and purpose of specific imports):
```ts
import { PartySimulator } from './party-simulator.js';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { PartyState } from '../managed/private-party/contract/index.js';
```

Set the networkId to undeployed:
```ts
setNetworkId('undeployed' as NetworkId);
```

Scaffold the test and write your first test case:
```ts
describe("Private Party smart contract", () => {
    it("executes the constructor correctly", () => {
        const sim = new PartySimulator();// create new simulator instance
        const ledgerState = sim.getLedger();// return current ledger state
        
        // tests
        expect(ledgerState.organizers.size()).toEqual(1n);
        expect(ledgerState.partyState).toEqual(PartyState.NOT_READY);
        expect(ledgerState.maxListSize).toEqual(99n);
    });
});
```

This tests that the constructor runs properly and that ledger values are set correctly after the constructor executes. Execute the test suite by navigating to the `test` directory and running:
```bash
npm run test
```

What other tests should be run? Spend some time looking over the smart contract and writing some tests. Maybe the next one should be:
```ts
// next test
it ("adds an organizer", () => {});
```

Make sure to write as many tests as you can think of!
