import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  localSk(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, { is_some: boolean,
                                                                        value: Uint8Array
                                                                      }];
  getParticipant(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 participant_0: string): [PS, boolean];
  setParticipant(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 participant_0: string): [PS, []];
}

export type ImpureCircuits<PS> = {
  addOrganizer(context: __compactRuntime.CircuitContext<PS>,
               organizerPk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addParticipant(context: __compactRuntime.CircuitContext<PS>,
                 participant_0: string): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>, participant_0: string): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  addOrganizer(context: __compactRuntime.CircuitContext<PS>,
               organizerPk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addParticipant(context: __compactRuntime.CircuitContext<PS>,
                 participant_0: string): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>, participant_0: string): __compactRuntime.CircuitResults<PS, []>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  organizerPks: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  checkedInParticipants: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: string): boolean;
    [Symbol.iterator](): Iterator<string>
  };
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
