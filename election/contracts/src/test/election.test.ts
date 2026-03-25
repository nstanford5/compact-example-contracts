import { ElectionSimulator, WalletBuilder } from './election-simulator.js';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { VotingState, VoteChoice } from '../managed/election/contract/index.js';

setNetworkId('undeployed' as NetworkId);

describe("Election Smart contract", () => {
    it('executes the constructor correctly', () => {
        const sim = new ElectionSimulator();
        const initialLedgerState = sim.getLedger();
        expect(initialLedgerState.votingState).toEqual(VotingState.CLOSED);
        expect(initialLedgerState.candidate0).toEqual(sim.candidateA);
        expect(initialLedgerState.candidate1).toEqual(sim.candidateB);
    });
    it('runs the full contract flow', () => {
        // setup contract
        const sim = new ElectionSimulator();

        const bob = new WalletBuilder(sim.contractAddress, sim.getContractState());
        sim.switchCallers(bob.callerContext);
        sim.registerToVote();

        const claire = new WalletBuilder(sim.contractAddress, sim.getContractState());
        sim.switchCallers(claire.callerContext);
        sim.registerToVote();

        const don = new WalletBuilder(sim.contractAddress, sim.getContractState());
        sim.switchCallers(don.callerContext);
        sim.registerToVote();

        sim.updateAliceContext(sim.getContractState());

        // open voting
        sim.openVoting();
        const openLedgerState = sim.getLedger();
        expect(openLedgerState.votingState).toEqual(VotingState.OPEN);

        // commitVote
        bob.updateVotePrivateState(VoteChoice.BAD);
        bob.updateCallerContext(sim.getContractState());
        // bob sumbits his vote privately
        sim.switchCallers(bob.callerContext);
        sim.commitVote();

        claire.updateVotePrivateState(VoteChoice.WORSE);
        claire.updateCallerContext(sim.getContractState());
        sim.switchCallers(claire.callerContext);
        sim.commitVote();

        don.updateVotePrivateState(VoteChoice.BAD);
        don.updateCallerContext(sim.getContractState());
        sim.switchCallers(don.callerContext);
        sim.commitVote();

        // updates Alice and switches to calling as Alice
        sim.updateAliceContext(sim.getContractState());

        // closeVoting
        sim.closeVoting();
        const closeLedgerState = sim.getLedger();
        expect(closeLedgerState.votingState).toEqual(VotingState.CLOSED);
        expect(closeLedgerState.candidate0VoteCounter).toEqual(0n);
        expect(closeLedgerState.candidate1VoteCounter).toEqual(0n);

        // revealVote (each user needs to trigger)
        bob.updateCallerContext(sim.getContractState());
        sim.switchCallers(bob.callerContext);
        sim.revealVote();
        const firstCountLedgerState = sim.getLedger();
        expect(firstCountLedgerState.candidate0VoteCounter).toEqual(1n);

        // claire decides to cheat
        const originalVote = claire.privateState.vote;
        claire.updateVotePrivateState(VoteChoice.BAD);
        claire.updateCallerContext(sim.getContractState());
        sim.switchCallers(claire.callerContext);
        expect(() => {
            sim.revealVote();
        }).toThrow("Attempt to change the vote!");

        // claire realizes she can't cheat and goes back to her original vote
        claire.updateVotePrivateState(originalVote);
        claire.updateCallerContext(sim.getContractState());
        sim.revealVote();

        don.updateCallerContext(sim.getContractState());
        sim.switchCallers(don.callerContext);
        sim.revealVote();

        // checkWinner
        sim.updateAliceContext(sim.getContractState());
        sim.checkWinner();
        const finalLedgerState = sim.getLedger();
        expect(finalLedgerState.winner).toEqual(VoteChoice.BAD);

    })
})