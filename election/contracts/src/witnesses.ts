import { Ledger, VotingState, VoteChoice } from './managed/election/contract/index.js';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

export type VoterPrivateState = {
    address: string,
    sk: Uint8Array,
    vote: number,
};

export const createVoterPrivateState = (
    address: string,
    sk: Uint8Array,
    vote: number,
) => ({
    address,
    sk,
    vote
});

export const witnesses = {
    localSk: ({
        privateState
    }: WitnessContext<Ledger, VoterPrivateState>): [
        VoterPrivateState,
        Uint8Array
    ] => {
        return [privateState, privateState.sk];
    },
    localGetVote: ({
        privateState
    }: WitnessContext<Ledger, VoterPrivateState>): [
        VoterPrivateState,
        number
    ] => {
        return [privateState, privateState.vote];
    }
};