import {    
    type CircuitContext,
    sampleContractAddress,
    createConstructorContext,
    CostModel,
    QueryContext,
    sampleUserAddress,
    ChargedState,
    createCircuitContext,
    ContractState
} from '@midnight-ntwrk/compact-runtime';
import {
    Contract,
    type Ledger,
    ledger,
    VoteChoice,
    VotingState,
} from '../managed/election/contract/index.js';
import {
    witnesses,
    VoterPrivateState,
    createVoterPrivateState
} from '../witnesses.js';
import { randomBytes } from './utils.js';

export class ElectionSimulator {
    readonly contract: Contract<VoterPrivateState>;
    contractAddress: string;
    aliceAddress: string;
    alicePrivateState: VoterPrivateState;
    aliceSk: Uint8Array;
    contractState: ContractState;
    circuitContext: CircuitContext<VoterPrivateState>;
    candidateA: string;
    candidateB: string;

    constructor() {
        this.contract = new Contract<VoterPrivateState>(witnesses);
        this.contractAddress = sampleContractAddress();
        this.candidateA = "Bad Choice";
        this.candidateB = "Worse Choice";
        this.aliceAddress = sampleUserAddress();
        this.aliceSk = randomBytes(32);
        this.alicePrivateState = createVoterPrivateState(
            this.aliceAddress,
            this.aliceSk,
            VoteChoice.TIE
        )

        const {
            currentPrivateState,
            currentContractState,
            currentZswapLocalState
        } = this.contract.initialState(
            createConstructorContext(this.alicePrivateState, this.aliceAddress),
            this.candidateA,
            this.candidateB
        );
        this.contractState = currentContractState;
        this.circuitContext = {
            currentPrivateState,
            currentZswapLocalState,
            costModel: CostModel.initialCostModel(),
            currentQueryContext: new QueryContext(
                currentContractState.data,
                this.contractAddress
            ),
        };
    }// end of constructor

    // export contract circuit wrappers
    public registerToVote(): void {
        this.circuitContext = this.contract.impureCircuits.registerToVote(
            this.circuitContext
        ).context;
    }

    public openVoting(): void {
        this.circuitContext = this.contract.impureCircuits.openVoting(
            this.circuitContext,
        ).context;
    }

    public closeVoting(): void {
        this.circuitContext = this.contract.impureCircuits.closeVoting(
            this.circuitContext,
        ).context;
    }

    public commitVote(): void {
        this.circuitContext = this.contract.impureCircuits.commitVote(
            this.circuitContext,
        ).context;
    }

    public checkWinner(): void {
        this.circuitContext = this.contract.impureCircuits.checkWinner(
            this.circuitContext,
        ).context;
    }

    public revealVote(): void {
        this.circuitContext = this.contract.impureCircuits.revealVote(
            this.circuitContext,
        ).context;
    }

    public getDAppPublicKey(sk: Uint8Array): Uint8Array {
        return this.contract.circuits.getDappPublicKey(
            this.circuitContext,
            sk
        ).result;
    }

    // test helper functions
    public getLedger(): Ledger {
        return ledger(this.circuitContext.currentQueryContext.state);
    }

    public switchCallers(callerContext: CircuitContext): void {
        this.circuitContext = callerContext;
    }

    public getContractState(): ChargedState {
        return this.circuitContext.currentQueryContext.state;
    }

    public updateAliceContext(contractState: ChargedState): void {
        this.circuitContext = createCircuitContext(
            this.contractAddress,
            this.aliceAddress,
            contractState,
            this.alicePrivateState
        )
    }
}// end of class

export class WalletBuilder {
    address: string;
    sk: Uint8Array;
    callerContext: CircuitContext<VoterPrivateState>;
    privateState: VoterPrivateState;
    contractAddress: string;

    constructor(contractAddress: string, contractState: ChargedState) {
        this.address = sampleUserAddress();
        this.sk = randomBytes(32);
        this.privateState = createVoterPrivateState(this.address, this.sk, VoteChoice.TIE);
        this.contractAddress = contractAddress;
        this.callerContext = createCircuitContext(
            this.contractAddress,
            this.address,
            contractState,
            this.privateState
        );
    }
    public updateCallerContext(contractState: ChargedState): void {
        this.callerContext = createCircuitContext(
            this.contractAddress,
            this.address,
            contractState,
            this.privateState
        );
    }

    public updateVotePrivateState(vote: number): void {
        this.privateState.vote = vote;
    }
}