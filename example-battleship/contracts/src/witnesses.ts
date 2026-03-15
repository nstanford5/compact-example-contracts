import { Ledger, BoardState, ShotState } from './managed/battleship-simple/contract/index.js';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

export type BattlePrivateState = {
    x1: Uint8Array,
    x2: Uint8Array,
    boardState: number,
    shotState: number,
    sk: Uint8Array
};

export const createBattlePrivateState = (x1: Uint8Array, x2: Uint8Array, boardState: number, shotState: number, sk: Uint8Array) => ({
    x1,
    x2,
    boardState,
    shotState,
    sk
});

export const witnesses = {
    localSetBoard1: ({
        privateState
    }: WitnessContext<Ledger, BattlePrivateState>, x1: Uint8Array, x2: Uint8Array): [
        BattlePrivateState,
        number
    ] => {
        privateState.x1 = x1;
        privateState.x2 = x2;
        return [privateState, BoardState.SET]
    },
    localSetBoard2: ({
        privateState
    }: WitnessContext<Ledger, BattlePrivateState>, x1: Uint8Array, x2: Uint8Array): [
        BattlePrivateState,
        number
    ] => {
        privateState.x1 = x1;
        privateState.x2 = x2;
        return [privateState, BoardState.SET]
    },
    localCheckBoard1: ({
        privateState
    }: WitnessContext<Ledger, BattlePrivateState>, x: Uint8Array): [
        BattlePrivateState,
        ShotState
    ] => {

        const flag = (x == privateState.x1 || x == privateState.x2);
        privateState.shotState = flag ? ShotState.HIT : ShotState.MISS;

        //privateState.shotState = (x == privateState.x1 || x == privateState.x2) ? ShotState.HIT : ShotState.MISS;
        // if(x == privateState.x1 || x == privateState.x2){
        //     privateState.shotState = ShotState.HIT;
        //     return [privateState, privateState.shotState]
        // } else {
        //     return [privateState, privateState.shotState]
        // }
        return [privateState, privateState.shotState]
    },
    localCheckBoard2: ({
        privateState
    }: WitnessContext<Ledger, BattlePrivateState>, x: Uint8Array): [
        BattlePrivateState,
        ShotState
    ] => {
        const flag = (x == privateState.x1 || x == privateState.x2);
        privateState.shotState = flag ? ShotState.HIT : ShotState.MISS;
        //privateState.shotState = (x == privateState.x1 || x == privateState.x2) ? ShotState.HIT : ShotState.MISS;
        // if(x == privateState.x1 || x == privateState.x2){
        //     privateState.shotState = ShotState.HIT;
        // }
        return [privateState, privateState.shotState]
    },
}