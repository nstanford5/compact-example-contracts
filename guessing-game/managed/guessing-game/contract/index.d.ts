import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  localSk(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, { is_some: boolean,
                                                                        value: Uint8Array
                                                                      }];
  setNum(context: __compactRuntime.WitnessContext<Ledger, PS>, x_0: bigint): [PS, []];
  getNum(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
}

export type ImpureCircuits<PS> = {
  accept(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  onChainSetNum(context: __compactRuntime.CircuitContext<PS>, n_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  guessNum(context: __compactRuntime.CircuitContext<PS>, n_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  accept(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  onChainSetNum(context: __compactRuntime.CircuitContext<PS>, n_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  guessNum(context: __compactRuntime.CircuitContext<PS>, n_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly player1: Uint8Array;
  readonly player2: Uint8Array;
  readonly publicNum: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
