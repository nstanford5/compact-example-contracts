export type RafflePrivateState = {
    winState: number,
    sk: Uint8Array
}

export const createRafflePrivateState = (winState: number, sk: Uint8Array) => ({
    winState,
    sk
});

export const witnesses = {};