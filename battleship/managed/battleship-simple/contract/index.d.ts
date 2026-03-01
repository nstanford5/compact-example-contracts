import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  acceptGame(context: __compactRuntime.CircuitContext<PS>,
             x1_0: bigint,
             x2_0: bigint,
             sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player1Shoot(context: __compactRuntime.CircuitContext<PS>, x_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  player2Shoot(context: __compactRuntime.CircuitContext<PS>, x_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  checkBoard1(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, number>;
  checkBoard2(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, number>;
}

export type PureCircuits = {
  commitBoardSpace(x_0: Uint8Array, sk_0: Uint8Array): Uint8Array;
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  acceptGame(context: __compactRuntime.CircuitContext<PS>,
             x1_0: bigint,
             x2_0: bigint,
             sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player1Shoot(context: __compactRuntime.CircuitContext<PS>, x_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  player2Shoot(context: __compactRuntime.CircuitContext<PS>, x_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  checkBoard1(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, number>;
  checkBoard2(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, number>;
  commitBoardSpace(context: __compactRuntime.CircuitContext<PS>,
                   x_0: Uint8Array,
                   sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly player1: { bytes: Uint8Array };
  readonly player2: { bytes: Uint8Array };
  readonly player1State: number;
  readonly player2State: number;
  readonly gameState: number;
  board1: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  board2: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  player1Shots: {
    isEmpty(): boolean;
    length(): bigint;
    head(): { is_some: boolean, value: bigint };
    [Symbol.iterator](): Iterator<bigint>
  };
  player2Shots: {
    isEmpty(): boolean;
    length(): bigint;
    head(): { is_some: boolean, value: bigint };
    [Symbol.iterator](): Iterator<bigint>
  };
  readonly hitCountBoard1: bigint;
  readonly hitCountBoard2: bigint;
  readonly shotResult: number;
  readonly winner: { bytes: Uint8Array };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               x1_0: bigint,
               x2_0: bigint,
               sk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
