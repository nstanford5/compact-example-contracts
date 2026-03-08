import {
    type CircuitContext,
    sampleContractAddress,
    createConstructorContext,
    CostModel,
    QueryContext,
} from '@midnight-ntwrk/compact-runtime';
import {
    Contract,
    type Ledger,
    ledger,
    BoardState,
    ShotState,
    WinState
} from '../managed/battleship-simple/contract/index.js';
import {
    witnesses,
    BattlePrivateState,
    createBattlePrivateState
} from '../witnesses.js';

export class BattleSimulator {
    // declare types
    readonly contract: Contract<BattlePrivateState>;
    circuitContext: CircuitContext<BattlePrivateState>;
    startingState: BattlePrivateState;
    boardState: number;
    shotState: number;

    constructor(x1: bigint, x2: bigint, sk: Uint8Array) {
        // initialize values for type declarations
        this.contract = new Contract<BattlePrivateState>(witnesses);
        this.boardState = BoardState.UNSET;
        this.shotState = ShotState.MISS;
        this.startingState = createBattlePrivateState(
            x1,
            x2,
            this.boardState,
            this.shotState,
        );
        const {
            currentPrivateState,
            currentContractState,
            currentZswapLocalState
        } = this.contract.initialState( //(context, param1, param2, param3)
            createConstructorContext(this.startingState, "0".repeat(64)),
            this.startingState.x1,
            this.startingState.x2,
            sk
        );
        this.circuitContext = {
            currentPrivateState,
            currentZswapLocalState,
            costModel: CostModel.initialCostModel(),
            currentQueryContext: new QueryContext(
                currentContractState.data,
                sampleContractAddress(),
            ),
        };
    }

    // helper function
    public getLedger(): Ledger {
        return ledger(this.circuitContext.currentQueryContext.state);
    }

    // helper function
    public getPrivateState(): BattlePrivateState {
        return this.circuitContext.currentPrivateState;
    }

    // exported smart contract circuits
    public acceptGame(x1: bigint, x2: bigint, sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.acceptGame(
            this.circuitContext,
            x1, 
            x2,
            sk
        ).context;
    }

    public player1Shoot(x: bigint): void {
        this.circuitContext = this.contract.impureCircuits.player1Shoot(
            this.circuitContext,
            x
        ).context;
    }

    public player2Shoot(x: bigint): void {
        this.circuitContext = this.contract.impureCircuits.player2Shoot(
            this.circuitContext,
            x
        ).context;
    }

    public checkBoard1(sk: Uint8Array): WinState {
        return this.contract.impureCircuits.checkBoard1(
            this.circuitContext,
            sk
        ).result;
    }

    public checkBoard2(sk: Uint8Array): WinState {
        return this.contract.impureCircuits.checkBoard2(
            this.circuitContext,
            sk
        ).result;
    }
    

    public publicKey(sk: Uint8Array): Uint8Array {
        return this.contract.circuits.publicKey(
            this.circuitContext,
            sk
        ).result;
    }
}