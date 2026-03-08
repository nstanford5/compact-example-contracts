// This file defines the shape of the private state,
// as well as the witness function(s)

import { Ledger } from './managed/private-party/contract/index.js';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

// we need to define a type for the private state
export type PartyPrivateState = {
    partyState: number;// is this the right type?
}

// create a function for making an object of the custom PrivatePartyState type
export const createPartyPrivateState = (partyState: number) => ({
    partyState,
});


export const witnesses = {
  startParty: ({
    privateState
  }: WitnessContext<Ledger, PartyPrivateState>): [
    // no params
    PartyPrivateState,
    number
    // return 1 to start the party
  ] => [privateState, 1],
};

