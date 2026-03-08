import { CompiledContract } from '@midnight-ntwrk/compact-js';
export * from './managed/private-party/contract/index.js';
export * from './witnesses';

import * as CompiledPartyContract from './managed/private-party/contract/index.js';
import * as Witnesses from './witnesses';

export const CompiledPartyContractContract = CompiledContract.make<CompiledPartyContract.Contract<Witnesses.PartyPrivateState>>(
    "Private Party",
    CompiledPartyContract.Contract<Witnesses.PartyPrivateState>,
).pipe(
    CompiledContract.withWitnesses(Witnesses.witnesses),
    CompiledContract.withCompiledFileAssets('./compiled/private-party'),
);