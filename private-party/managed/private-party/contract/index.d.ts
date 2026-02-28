import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  addOrganizer(context: __compactRuntime.CircuitContext<PS>,
               organizerPk_0: Uint8Array,
               sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addParticipant(context: __compactRuntime.CircuitContext<PS>,
                 participantPk_0: Uint8Array,
                 sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>,
          participantPk_0: Uint8Array,
          sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  addOrganizer(context: __compactRuntime.CircuitContext<PS>,
               organizerPk_0: Uint8Array,
               sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addParticipant(context: __compactRuntime.CircuitContext<PS>,
                 participantPk_0: Uint8Array,
                 sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>,
          participantPk_0: Uint8Array,
          sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  organizerPks: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  hashedPartyGoers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  checkedInParty: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
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
