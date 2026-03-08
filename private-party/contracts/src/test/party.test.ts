import { PartySimulator } from './party-simulator.js';
import {
    NetworkId,
    setNetworkId,
} from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { randomBytes } from './utils.js';
import { PartyState } from '../managed/private-party/contract/index.js';

setNetworkId("undeployed" as NetworkId);

describe("Private Party smart contract", () => {
    it("executes the constructor correctly", () => {
        //const key = randomBytes(32);
        const sim0 = new PartySimulator();
        const initialLedgerState = sim0.getLedger();
        expect(initialLedgerState.organizers.size()).toEqual(1n);
        expect(initialLedgerState.partyState).toEqual(PartyState.NOT_READY);
    });

    it("adds an organizer", () => {
        const sim0 = new PartySimulator();
        const initialLedgerState = sim0.getLedger();
        sim0.addOrganizer(randomBytes(32));
        const newLedgerState = sim0.getLedger();
        expect(initialLedgerState.organizers.size()).toEqual(1n);
        expect(newLedgerState.organizers.size()).toEqual(2n);
    });

})