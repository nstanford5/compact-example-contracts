// This file defines the shape of the private state,
// as well as the witness function(s)

import { Ledger, BoardState, ShotState } from './managed/battleship-simple/contract/index.js';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

// we need to define a type for the private state
// this is first exposure to Compact -> TS type mappings
export type BattlePrivateState = {
    x1: bigint,
    x2: bigint,
    boardState: number,
    shotState: number
};

// export type BoardState = {
//     UNSET: number,
//     SET: number
// };

// export type ShotState = {
//     MISS: number,
//     HIT: number
// };

// do I need these? Probably not, only witness states are needed here and
// these are ledger states
// export type TurnState = {
//     PLAYER_1_SHOOT: number,
//     PLAYER_1_CHECK: number,
//     PLAYER_2_SHOOT: number,
//     PLAYER_2_CHECK: number
// }
// export type WinState = {
//     CONTINUE_PLAY: number,
//     PLAYER_1_WINS: number,
//     PLAYER_2_WINS: number
// }

// create a function for making an object of the custom PrivatePartyState type
export const createBattlePrivateState = (x1: bigint, x2: bigint, boardState: number, shotState: number) => ({
    x1,
    x2,
    boardState,
    shotState
});

// do I need this?
export const createBoardState = (boardState: number) => ({
    boardState
});

export const witnesses = {
//   startParty: ({
//     privateState
//   }: WitnessContext<Ledger, PartyPrivateState>): [
//     PartyPrivateState,
//     number
//     // return 1 to start the party
//   ] => [privateState, PartyState.READY],
    setBoard: ({
        privateState
    }: WitnessContext<Ledger, BattlePrivateState>, x1: bigint, x2: bigint): [
        BattlePrivateState,
        BoardState
    ] => [privateState, BoardState.SET],
    checkBoard: ({
        privateState
        // parameter input types
    }: WitnessContext<Ledger, BattlePrivateState>, x: bigint): [
        // return types
        BattlePrivateState,
        ShotState
    ] => [privateState, privateState.shotState]
};
