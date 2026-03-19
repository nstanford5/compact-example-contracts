import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum AuctionState { CLOSED = 0, OPEN = 1 }

export type Witnesses<PS> = {
  localSk(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  bid(context: __compactRuntime.CircuitContext<PS>, bidAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeAuction(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  revealWin(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
}

export type ProvableCircuits<PS> = {
  bid(context: __compactRuntime.CircuitContext<PS>, bidAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeAuction(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  revealWin(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
}

export type PureCircuits = {
  publicKey(_sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  bid(context: __compactRuntime.CircuitContext<PS>, bidAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeAuction(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  revealWin(context: __compactRuntime.CircuitContext<PS>, minPrice_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly auctionOrganizer: { bytes: Uint8Array };
  readonly hiddenPrice: Uint8Array;
  readonly publicPrice: bigint;
  readonly maxBids: bigint;
  bidders: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly bidCount: bigint;
  readonly highestBid: bigint;
  readonly auctionState: AuctionState;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               _minPrice_0: bigint,
               maxBidCount_0: bigint): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
