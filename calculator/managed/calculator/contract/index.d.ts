import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  add(context: __compactRuntime.CircuitContext<PS>,
      num1_0: bigint,
      num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  subtract(context: __compactRuntime.CircuitContext<PS>,
           num1_0: bigint,
           num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  multiply(context: __compactRuntime.CircuitContext<PS>,
           num1_0: bigint,
           num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  square(context: __compactRuntime.CircuitContext<PS>, num1_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  add(context: __compactRuntime.CircuitContext<PS>,
      num1_0: bigint,
      num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  subtract(context: __compactRuntime.CircuitContext<PS>,
           num1_0: bigint,
           num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  multiply(context: __compactRuntime.CircuitContext<PS>,
           num1_0: bigint,
           num2_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  square(context: __compactRuntime.CircuitContext<PS>, num1_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly result: bigint;
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
