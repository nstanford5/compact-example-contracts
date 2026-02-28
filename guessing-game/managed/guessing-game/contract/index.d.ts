import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  accept(context: __compactRuntime.CircuitContext<PS>,
         player1Pk_0: { bytes: Uint8Array },
         sk_0: Uint8Array,
         numberGuess_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  onChainSetNum(context: __compactRuntime.CircuitContext<PS>,
                num_0: bigint,
                sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  guessNum(context: __compactRuntime.CircuitContext<PS>,
           num_0: bigint,
           sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  accept(context: __compactRuntime.CircuitContext<PS>,
         player1Pk_0: { bytes: Uint8Array },
         sk_0: Uint8Array,
         numberGuess_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  onChainSetNum(context: __compactRuntime.CircuitContext<PS>,
                num_0: bigint,
                sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  guessNum(context: __compactRuntime.CircuitContext<PS>,
           num_0: bigint,
           sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly state: number;
  readonly player1: { bytes: Uint8Array };
  readonly numHash: Uint8Array;
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
