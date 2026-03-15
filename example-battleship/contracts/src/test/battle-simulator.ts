import {
    type CircuitContext,
    sampleContractAddress,
    createConstructorContext,
    createCircuitContext,
    CostModel,
    QueryContext,
    sampleUserAddress,
    ContractState
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
import { randomBytes } from './utils.js';

export class BattleSimulator {
    readonly contract: Contract<BattlePrivateState>;
    contractAddress: string;
    adminSk: Uint8Array;
    adminAddress: string;
    adminPrivateState: BattlePrivateState;
    circuitContext: CircuitContext<BattlePrivateState>;
    contractState: ContractState;

    constructor() {
        this.contract = new Contract<BattlePrivateState>(witnesses);
        this.contractAddress = sampleContractAddress();
        this.adminSk = randomBytes(32);
        this.adminAddress = sampleUserAddress();
        this.adminPrivateState = createBattlePrivateState(BigInt(0), BigInt(0), BoardState.UNSET, ShotState.MISS, this.adminSk);

        const {
            currentPrivateState,
            currentContractState,
            currentZswapLocalState
        } = this.contract.initialState(
            createConstructorContext(this.adminPrivateState, this.adminAddress),
            this.adminSk
        );
        this.contractState = currentContractState;
        this.circuitContext = {
            currentPrivateState,
            currentZswapLocalState,
            costModel: CostModel.initialCostModel(),
            currentQueryContext: new QueryContext(
                currentContractState.data,
                this.contractAddress,
            )
        }
    }
    // helper functions
    public getLedger(): Ledger {
        return ledger(this.circuitContext.currentQueryContext.state);
    }

    // exported smart contract circuits
    public setBoard1(x1: Uint8Array, x2: Uint8Array, sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.setBoard1(
            this.circuitContext,
            x1,
            x2,
            sk
        ).context;
    }

    public setBoard2(x1: Uint8Array, x2: Uint8Array, sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.setBoard2(
            this.circuitContext,
            x1,
            x2,
            sk
        ).context;
    }

    public player1Shoot(x: Uint8Array, sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.player1Shoot(
            this.circuitContext,
            x,
            sk
        ).context;
    }

    public player2Shoot(x: Uint8Array, sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.player2Shoot(
            this.circuitContext,
            x,
            sk
        ).context;
    }

    public checkBoard1(sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.checkBoard1(
            this.circuitContext,
            sk
        ).context;// maybe?
        // return this.contract.impureCircuits.checkBoard1(
        //     this.circuitContext,
        //     sk
        // ).result;
    }

    public checkBoard2(sk: Uint8Array): void {
        this.circuitContext = this.contract.impureCircuits.checkBoard2(
            this.circuitContext,
            sk
        ).context;
        // return this.contract.impureCircuits.checkBoard2(
        //     this.circuitContext,
        //     sk
        // ).result;
    }

    public publicKey(sk: Uint8Array): Uint8Array {
        return this.contract.circuits.publicKey(
            this.circuitContext,
            sk
        ).result;
    }

    public commitBoardSpace(x: Uint8Array, sk: Uint8Array) {
        return this.contract.circuits.commitBoardSpace(
            this.circuitContext,
            x,
            sk
        ).result;
    }
}

export class WalletBuilder {
    walletSk: Uint8Array;
    walletAddress: string;
    privateState: BattlePrivateState;
    circuitContext: CircuitContext<BattlePrivateState>;
    constructor(contractAddress: string, contractState: ContractState){
        this.walletSk = randomBytes(32);
        this.walletAddress = sampleUserAddress();
        this.privateState = createBattlePrivateState(
            BigInt(0), 
            BigInt(0), 
            BoardState.UNSET, 
            ShotState.MISS, 
            this.walletSk
        );
        this.circuitContext = createCircuitContext(
            contractAddress,
            this.walletAddress,
            contractState,
            this.privateState,  
        );
    }
}
