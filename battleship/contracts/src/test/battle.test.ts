import { BattleSimulator } from './battle-simulator.js';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { randomBytes, startArgs} from './utils.js';
// import custom states
import { BoardState, WinState } from '../managed/battleship-simple/contract/index.js'

setNetworkId('undeployed' as NetworkId);

describe("Battleship simple smart contract", () => {
    it("executes the constructor correctly", () => {
        const [x1, x2, sk] = startArgs(2, 4, randomBytes(32));
        const sim0 = new BattleSimulator(x1, x2, sk);
        const ledgerState = sim0.getLedger();

        expect(ledgerState.board1.size()).toEqual(2n);
        expect(ledgerState.board1State).toEqual(BoardState.SET);
        expect(ledgerState.winState).toEqual(WinState.CONTINUE_PLAY);
    });

    it("forces valid space selection to player1", () => {
        const skBytes = randomBytes(32);

        expect(() => {
            const [x1, x2, sk] = startArgs(0, 5, skBytes);
            const sim0 = new BattleSimulator(x1, x2, sk);
        }).toThrow("No zero index, board starts at 1");

        expect(() => {
            const [x1, x2, sk] = startArgs(2, 0, skBytes);
            const sim0 = new BattleSimulator(x1, x2, sk);
        }).toThrow("No zero index, board starts at 1");

        expect(() => {
            const [x1, x2, sk] = startArgs(2, 2, skBytes);
            const sim0 = new BattleSimulator(x1, x2, sk);
        }).toThrow("Cannot use the same number twice");

        expect(() => {
            const [x1, x2, sk] = startArgs(21, 5, skBytes);
            const sim0 = new BattleSimulator(x1, x2, sk);
        }).toThrow("Out of bounds, please keep ships on the board");

        expect(() => {
            const [x1, x2, sk] = startArgs(8, 30, skBytes);
            const sim0 = new BattleSimulator(x1, x2, sk);
        }).toThrow("Out of bounds, please keep ships on the board");
    });

    // it("allows player2 to accept the game", () => {
    //     const [x1, x2, sk] = startArgs(5, 8, randomBytes(32));
    //     const sim0 = new BattleSimulator(x1, x2, sk);
    //     // this is where you need to shape two players against each other
    // })
})