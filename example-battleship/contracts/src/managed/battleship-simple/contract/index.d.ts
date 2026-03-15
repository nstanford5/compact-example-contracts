import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum BoardState { UNSET = 0, SET = 1 }

export enum ShotState { MISS = 0, HIT = 1 }

export enum TurnState { PLAYER_1_SHOOT = 0,
                        PLAYER_1_CHECK = 1,
                        PLAYER_2_SHOOT = 2,
                        PLAYER_2_CHECK = 3
}

export enum WinState { CONTINUE_PLAY = 0, PLAYER_1_WINS = 1, PLAYER_2_WINS = 2 }

export type Witnesses<PS> = {
  localSetBoard1(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 _x1_0: Uint8Array,
                 _x2_0: Uint8Array): [PS, BoardState];
  localSetBoard2(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 _x1_0: Uint8Array,
                 _x2_0: Uint8Array): [PS, BoardState];
  localCheckBoard1(context: __compactRuntime.WitnessContext<Ledger, PS>,
                   x_0: Uint8Array): [PS, ShotState];
  localCheckBoard2(context: __compactRuntime.WitnessContext<Ledger, PS>,
                   x_0: Uint8Array): [PS, ShotState];
}

export type ImpureCircuits<PS> = {
  setBoard1(context: __compactRuntime.CircuitContext<PS>,
            _x1_0: Uint8Array,
            _x2_0: Uint8Array,
            _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setBoard2(context: __compactRuntime.CircuitContext<PS>,
            _x1_0: Uint8Array,
            _x2_0: Uint8Array,
            _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player1Shoot(context: __compactRuntime.CircuitContext<PS>,
               x_0: Uint8Array,
               _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player2Shoot(context: __compactRuntime.CircuitContext<PS>,
               x_0: Uint8Array,
               _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkBoard1(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkBoard2(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  commitBoardSpace(_x_0: Uint8Array, _sk_0: Uint8Array): Uint8Array;
  publicKey(_sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  setBoard1(context: __compactRuntime.CircuitContext<PS>,
            _x1_0: Uint8Array,
            _x2_0: Uint8Array,
            _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setBoard2(context: __compactRuntime.CircuitContext<PS>,
            _x1_0: Uint8Array,
            _x2_0: Uint8Array,
            _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player1Shoot(context: __compactRuntime.CircuitContext<PS>,
               x_0: Uint8Array,
               _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  player2Shoot(context: __compactRuntime.CircuitContext<PS>,
               x_0: Uint8Array,
               _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkBoard1(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkBoard2(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  commitBoardSpace(context: __compactRuntime.CircuitContext<PS>,
                   _x_0: Uint8Array,
                   _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, _sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly organizer: Uint8Array;
  readonly player1: Uint8Array;
  readonly player2: Uint8Array;
  readonly turn: TurnState;
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
  readonly board1State: BoardState;
  readonly board2State: BoardState;
  player1Shot: {
    isEmpty(): boolean;
    length(): bigint;
    head(): { is_some: boolean, value: Uint8Array };
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  player2Shot: {
    isEmpty(): boolean;
    length(): bigint;
    head(): { is_some: boolean, value: Uint8Array };
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  board1Hits: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  board2Hits: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly winState: WinState;
  readonly board1HitCount: bigint;
  readonly board2HitCount: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               _sk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
