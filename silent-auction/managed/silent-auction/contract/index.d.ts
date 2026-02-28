import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  bid(context: __compactRuntime.CircuitContext<PS>,
      pk_0: Uint8Array,
      bidAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealWin(context: __compactRuntime.CircuitContext<PS>,
            minPrice_0: bigint,
            sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  bid(context: __compactRuntime.CircuitContext<PS>,
      pk_0: Uint8Array,
      bidAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealWin(context: __compactRuntime.CircuitContext<PS>,
            minPrice_0: bigint,
            sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly auctionOrganizer: Uint8Array;
  readonly hiddenPrice: Uint8Array;
  readonly publicPrice: bigint;
  bidders: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly bidCount: bigint;
  readonly highestBid: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               sk_0: Uint8Array,
               minPrice_0: bigint): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
