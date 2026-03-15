import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum ReadyState { NOT_READY = 0, READY = 1 }

export enum Color { GREEN = 0, RED = 1, BLACK = 2 }

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  placeBet(context: __compactRuntime.CircuitContext<PS>,
           amount_0: bigint,
           number_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealWinningNumber(context: __compactRuntime.CircuitContext<PS>,
                      winningNum_0: bigint,
                      _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkForWin(context: __compactRuntime.CircuitContext<PS>,
              number_0: bigint,
              amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  placeBet(context: __compactRuntime.CircuitContext<PS>,
           amount_0: bigint,
           number_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealWinningNumber(context: __compactRuntime.CircuitContext<PS>,
                      winningNum_0: bigint,
                      _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkForWin(context: __compactRuntime.CircuitContext<PS>,
              number_0: bigint,
              amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly theHouse: { bytes: Uint8Array };
  readonly maxBet: bigint;
  readonly winningNumHash: Uint8Array;
  readonly winningNumPublic: bigint;
  readonly readyState: ReadyState;
  playerList: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: { bytes: Uint8Array }): boolean;
      lookup(key_1: { bytes: Uint8Array }): bigint;
      [Symbol.iterator](): Iterator<[{ bytes: Uint8Array }, bigint]>
    }
  };
  winnerList: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: { bytes: Uint8Array }): boolean;
    lookup(key_0: { bytes: Uint8Array }): bigint;
    [Symbol.iterator](): Iterator<[{ bytes: Uint8Array }, bigint]>
  };
  readonly color: Color;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               setMaxBet_0: bigint,
               _winningNum_0: bigint,
               _sk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
