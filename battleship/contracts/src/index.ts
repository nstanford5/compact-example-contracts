import { CompiledContract } from '@midnight-ntwrk/compact-js';
export * from './managed/battleship-simple/contract/index.js';
export * from './witnesses';

import * as CompiledPartyContract from './managed/battleship-simple/contract/index.js';
import * as Witnesses from './witnesses';

// do I need any of this?
export const CompiledPartyContractContract = CompiledContract.make<CompiledPartyContract.Contract<Witnesses.PartyPrivateState>>(
    "BattleShip Simple",
    CompiledPartyContract.Contract<Witnesses.PartyPrivateState>,
).pipe(
    CompiledContract.withWitnesses(Witnesses.witnesses),
    CompiledContract.withCompiledFileAssets('./compiled/private-party'),
);