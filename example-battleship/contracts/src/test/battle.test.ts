import { BattleSimulator, WalletBuilder } from './battle-simulator.js';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { BoardState, ShotState, WinState, TurnState } from '../managed/battleship-simple/contract/index.js';
import { randomBytes } from './utils.js';

setNetworkId('undeployed' as NetworkId);

describe("Battleship smart contract", () => {
    it('executes the constructor correctly', () => {
        const sim = new BattleSimulator();
        const ledgerState = sim.getLedger();

        expect(ledgerState.board1State).toEqual(BoardState.UNSET);
        expect(ledgerState.board2State).toEqual(BoardState.UNSET);
        expect(ledgerState.winState).toEqual(WinState.CONTINUE_PLAY);
    });
    it('allows player1 to set the board', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        sim.setBoard1(BigInt(9), BigInt(2), alice.walletSk);
        const aliceDappPubKey = sim.publicKey(alice.walletSk);
        const ledgerState = sim.getLedger();

        expect(ledgerState.board1State).toEqual(BoardState.SET);
        expect(ledgerState.board1.size()).toEqual(2n);
        expect(ledgerState.player1).toEqual(aliceDappPubKey);
    });
    it('allows player2 to set the board', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        sim.setBoard1(BigInt(9), BigInt(2), alice.walletSk);

        sim.setBoard2(BigInt(4), BigInt(12), bob.walletSk);
        const bobDAppPubKey = sim.publicKey(bob.walletSk);
        const ledgerState = sim.getLedger();
        expect(ledgerState.board2State).toEqual(BoardState.SET);
        expect(ledgerState.player2).toEqual(bobDAppPubKey);
        expect(ledgerState.board2.size()).toEqual(2n);
    });
    it('allows player1 to take the first shot', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        sim.setBoard1(BigInt(9), BigInt(2), alice.walletSk);
        sim.setBoard2(BigInt(4), BigInt(12), bob.walletSk);
        const aliceShot = BigInt(5);
        sim.player1Shoot(aliceShot, alice.walletSk);
        // check the state of the shot
        const ledgerState = sim.getLedger();
        expect(ledgerState.player1Shot.isEmpty()).toBeFalsy();
        expect(ledgerState.player1Shot.head().value).toEqual(aliceShot);
        expect(ledgerState.turn).toEqual(TurnState.PLAYER_2_CHECK);
    });
    it('allows player2 to check the board', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        sim.setBoard1(BigInt(9), BigInt(2), alice.walletSk);
        sim.setBoard2(BigInt(4), BigInt(12), bob.walletSk);
        const aliceShot = BigInt(5);
        sim.player1Shoot(aliceShot, alice.walletSk);
        sim.checkBoard2(bob.walletSk);
        const ledgerState = sim.getLedger();
        expect(ledgerState.winState).toEqual(WinState.CONTINUE_PLAY);
        expect(ledgerState.turn).toEqual(TurnState.PLAYER_2_SHOOT);
    });
    it('allows player2 to shoot', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        sim.setBoard1(BigInt(9), BigInt(2), alice.walletSk);
        sim.setBoard2(BigInt(4), BigInt(12), bob.walletSk);

        const aliceShot = BigInt(5);
        sim.player1Shoot(aliceShot, alice.walletSk);
        expect(() => {
            sim.player1Shoot(BigInt(10), alice.walletSk);
        }).toThrow("It is not player1 turn to shoot");

        sim.checkBoard2(bob.walletSk);
        sim.player2Shoot(BigInt(14), bob.walletSk);
        sim.checkBoard1(alice.walletSk);
    });
    it('checks that the hash is correct', () => {
        const sim = new BattleSimulator();
        const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        const ship1 = BigInt(1);
        const ship2 = BigInt(2);
        sim.setBoard1(ship1, ship2, alice.walletSk);
        const ledgerState = sim.getLedger();
        // are the types causing value mismatches?
        // did this only work on the private party because the types didn't change
        // from the frontend input to the hash?
        const ship1HashOnChain = sim.commitBoardSpace(, alice.walletSk);

    });
    it('tracks a hit to each board', () => {
        // const sim = new BattleSimulator();
        // const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
        // const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        // const aliceShip = BigInt(9);
        // const bobShip = BigInt(4);
        // sim.setBoard1(aliceShip, BigInt(2), alice.walletSk);
        // sim.setBoard2(bobShip, BigInt(12), bob.walletSk);

        // sim.player1Shoot(aliceShip, alice.walletSk);
        // sim.checkBoard2(bob.walletSk);

        // sim.player2Shoot(aliceShip, bob.walletSk);
        // sim.checkBoard1(alice.walletSk);

        // const ledgerState = sim.getLedger();
        // expect(ledgerState.board1HitCount).toEqual(1n);

        // sim.player1Shoot(bobShip, alice.walletSk);
        // sim.checkBoard2(bob.walletSk);


        // sim.checkBoard2(bob.walletSk);
        // sim.player2Shoot(aliceShip, bob.walletSk);
        // // claimed a MISS when it was a HIT
        // sim.checkBoard1(alice.walletSk);
        
        // const ledgerState = sim.getLedger();
        // expect(ledgerState.board1HitCount).toEqual(1n);
        // expect(ledgerState.board1Hits.member(aliceShip)).toBeTruthy();
        // expect(ledgerState.turn).toEqual(TurnState.PLAYER_1_SHOOT);
    });
    // it('plays a full game(player2 wins)', () => {
    //     // const sim = new BattleSimulator();
    //     // const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
    //     // const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        
    //     // const aliceShip1 = BigInt(1);
    //     // const aliceShip2 = BigInt(2);
    //     // const bobShip1 = BigInt(3);
    //     // const bobShip2 = BigInt(4);

    //     // sim.setBoard1(aliceShip1, aliceShip2, alice.walletSk);
    //     // sim.setBoard2(bobShip1, bobShip2, bob.walletSk);

    //     // sim.player1Shoot(BigInt(5), alice.walletSk);
    //     // sim.checkBoard2(bob.walletSk);

    //     // sim.player2Shoot(BigInt(13), bob.walletSk);
    //     // sim.checkBoard1(alice.walletSk);

    //     // sim.player1Shoot(BigInt(13), alice.walletSk);
    //     // sim.checkBoard2(bob.walletSk);

    //     // sim.player2Shoot(aliceShip1, bob.walletSk);
    //     // sim.checkBoard1(alice.walletSk);

    //     // const ledgerState = sim.getLedger();
    //     // expect(ledgerState.board1HitCount).toEqual(1n);
    //     // expect(ledgerState.board1Hits.member(aliceShip1)).toBeTruthy();

    //     // sim.player1Shoot(BigInt(9), alice.walletSk);
    //     // sim.checkBoard2(bob.walletSk);

    //     // sim.player2Shoot(aliceShip2, bob.walletSk);
    //     // sim.checkBoard1(alice.walletSk);

    //     // const nextLedgerState = sim.getLedger();
    //     // expect(nextLedgerState.winState).toEqual(WinState.PLAYER_2_WINS);
    //     // // there is a problem in player 1 claiming HITs and MISSes
    // });
    // it("let's player 1 win", () => {
    //     // const sim = new BattleSimulator();
    //     // const alice = new WalletBuilder(sim.contractAddress, sim.contractState);
    //     // const bob = new WalletBuilder(sim.contractAddress, sim.contractState);
        
    //     // const aliceShip1 = BigInt(1);
    //     // const aliceShip2 = BigInt(2);
    //     // const bobShip1 = BigInt(3);
    //     // const bobShip2 = BigInt(4);

    //     // sim.setBoard1(aliceShip1, aliceShip2, alice.walletSk);
    //     // sim.setBoard2(bobShip1, bobShip2, bob.walletSk);

    //     // sim.player1Shoot(bobShip1, alice.walletSk);
    //     // sim.checkBoard2(bob.walletSk);
    //     // const ledgerState = sim.getLedger();
    //     // expect(ledgerState.board2HitCount).toEqual(1n);
    // });
});