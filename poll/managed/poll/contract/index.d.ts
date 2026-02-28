import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  onChainVote(context: __compactRuntime.CircuitContext<PS>,
              inputVote_0: bigint,
              sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  revealVote(context: __compactRuntime.CircuitContext<PS>,
             vote_0: bigint,
             sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  onChainVote(context: __compactRuntime.CircuitContext<PS>,
              inputVote_0: bigint,
              sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  revealVote(context: __compactRuntime.CircuitContext<PS>,
             vote_0: bigint,
             sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly voter: Uint8Array;
  readonly vote1: bigint;
  readonly vote2: bigint;
  readonly voteCommit: Uint8Array;
  readonly state: number;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               sk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
