import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.14.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_3 = __compactRuntime.CompactTypeBoolean;

class _Maybe_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_3.fromValue(value_0),
      value: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_some).concat(_descriptor_2.toValue(value_0.value));
  }
}

const _descriptor_4 = new _Maybe_0();

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(1, 1);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_6 = new _ZswapCoinPublicKey_0();

const _descriptor_7 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_10 = new __compactRuntime.CompactTypeEnum(1, 1);

const _descriptor_11 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _Either_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_3.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_12 = new _Either_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_14 = new _ContractAddress_0();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      acceptGame: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`acceptGame: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const x1_0 = args_1[1];
        const x2_0 = args_1[2];
        const sk_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('acceptGame',
                                     'argument 1 (as invoked from Typescript)',
                                     'battleship-simple.compact line 75 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(x1_0) === 'bigint' && x1_0 >= 0n && x1_0 <= 255n)) {
          __compactRuntime.typeError('acceptGame',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'battleship-simple.compact line 75 char 1',
                                     'Uint<0..256>',
                                     x1_0)
        }
        if (!(typeof(x2_0) === 'bigint' && x2_0 >= 0n && x2_0 <= 255n)) {
          __compactRuntime.typeError('acceptGame',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'battleship-simple.compact line 75 char 1',
                                     'Uint<0..256>',
                                     x2_0)
        }
        if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
          __compactRuntime.typeError('acceptGame',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'battleship-simple.compact line 75 char 1',
                                     'Bytes<32>',
                                     sk_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(x1_0).concat(_descriptor_2.toValue(x2_0).concat(_descriptor_0.toValue(sk_0))),
            alignment: _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptGame_0(context,
                                            partialProofData,
                                            x1_0,
                                            x2_0,
                                            sk_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      player1Shoot: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`player1Shoot: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const x_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('player1Shoot',
                                     'argument 1 (as invoked from Typescript)',
                                     'battleship-simple.compact line 89 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(x_0) === 'bigint' && x_0 >= 0n && x_0 <= 255n)) {
          __compactRuntime.typeError('player1Shoot',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'battleship-simple.compact line 89 char 1',
                                     'Uint<0..256>',
                                     x_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(x_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._player1Shoot_0(context, partialProofData, x_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      player2Shoot: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`player2Shoot: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const x_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('player2Shoot',
                                     'argument 1 (as invoked from Typescript)',
                                     'battleship-simple.compact line 102 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(x_0) === 'bigint' && x_0 >= 0n && x_0 <= 255n)) {
          __compactRuntime.typeError('player2Shoot',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'battleship-simple.compact line 102 char 1',
                                     'Uint<0..256>',
                                     x_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(x_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._player2Shoot_0(context, partialProofData, x_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      checkBoard1: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`checkBoard1: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sk_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('checkBoard1',
                                     'argument 1 (as invoked from Typescript)',
                                     'battleship-simple.compact line 115 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
          __compactRuntime.typeError('checkBoard1',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'battleship-simple.compact line 115 char 1',
                                     'Bytes<32>',
                                     sk_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sk_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkBoard1_0(context, partialProofData, sk_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      checkBoard2: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`checkBoard2: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sk_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('checkBoard2',
                                     'argument 1 (as invoked from Typescript)',
                                     'battleship-simple.compact line 140 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
          __compactRuntime.typeError('checkBoard2',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'battleship-simple.compact line 140 char 1',
                                     'Bytes<32>',
                                     sk_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sk_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkBoard2_0(context, partialProofData, sk_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      commitBoardSpace(context, ...args_1) {
        return { result: pureCircuits.commitBoardSpace(...args_1), context };
      },
      publicKey(context, ...args_1) {
        return { result: pureCircuits.publicKey(...args_1), context };
      }
    };
    this.impureCircuits = {
      acceptGame: this.circuits.acceptGame,
      player1Shoot: this.circuits.player1Shoot,
      player2Shoot: this.circuits.player2Shoot,
      checkBoard1: this.circuits.checkBoard1,
      checkBoard2: this.circuits.checkBoard2
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const x1_0 = args_0[1];
    const x2_0 = args_0[2];
    const sk_0 = args_0[3];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof(x1_0) === 'bigint' && x1_0 >= 0n && x1_0 <= 255n)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'battleship-simple.compact line 51 char 1',
                                 'Uint<0..256>',
                                 x1_0)
    }
    if (!(typeof(x2_0) === 'bigint' && x2_0 >= 0n && x2_0 <= 255n)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'battleship-simple.compact line 51 char 1',
                                 'Uint<0..256>',
                                 x2_0)
    }
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 3 (argument 4 as invoked from Typescript)',
                                 'battleship-simple.compact line 51 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('acceptGame', new __compactRuntime.ContractOperation());
    state_0.setOperation('player1Shoot', new __compactRuntime.ContractOperation());
    state_0.setOperation('player2Shoot', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkBoard1', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkBoard2', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(5n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(6n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(7n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                                                                                             alignment: _descriptor_8.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(8n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                                                                                             alignment: _descriptor_8.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(9n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(10n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(11n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(12n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.assert(x1_0 > 0n && x2_0 > 0n,
                            'No zero index, please keep your ship on the game board');
    __compactRuntime.assert(x1_0 <= 20n && x2_0 <= 20n,
                            'The board only goes up to 20, please stay in bounds with your ship');
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const hashedX1_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     x1_0,
                                                                                     'battleship-simple.compact line 65 char 39'),
                                                sk_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(5n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(hashedX1_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const hashedX2_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     x2_0,
                                                                                     'battleship-simple.compact line 67 char 39'),
                                                sk_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(5n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(hashedX2_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_11, value_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _acceptGame_0(context, partialProofData, x1_0, x2_0, sk_0) {
    __compactRuntime.assert(!this._equal_0(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'You cannot play against yourself');
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const hashedX1_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     x1_0,
                                                                                     'battleship-simple.compact line 79 char 39'),
                                                sk_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(6n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(hashedX1_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const hashedX2_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     x2_0,
                                                                                     'battleship-simple.compact line 81 char 39'),
                                                sk_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(6n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(hashedX2_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _player1Shoot_0(context, partialProofData, x_0) {
    __compactRuntime.assert(this._equal_1(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(0n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value),
                                          this._ownPublicKey_0(context,
                                                               partialProofData)),
                            'You are not player1');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(3n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            1,
                            'Player2 has not finished setting up their board');
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(4n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'The game has ended');
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(7n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { dup: { n: 0 } },
                                                                                        'type',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'eq',
                                                                                        { branch: { skip: 4 } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        { swap: { n: 0 } },
                                                                                        { concat: { cached: false,
                                                                                                    n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                            _descriptor_2
                                                                                                            .alignment()
                                                                                                          ))) } },
                                                                                        { jmp: { skip: 2 } },
                                                                                        'pop',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() },
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() }
                                                                                                                                             )).encode() } },
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value).is_some,
                            'Shot already present and being checked');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(7n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { dup: { n: 0 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(2n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(x_0),
                                                                                                           alignment: _descriptor_2.alignment() })).arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newNull())
                                                          .encode() } },
                                       { swap: { n: 0 } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       { ins: { cached: true, n: 1 } },
                                       { swap: { n: 0 } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(2),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _player2Shoot_0(context, partialProofData, x_0) {
    __compactRuntime.assert(this._equal_2(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(1n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value),
                                          this._ownPublicKey_0(context,
                                                               partialProofData)),
                            'You are not player2');
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            1,
                            'Player 1 is not ready');
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(4n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'The game has ended');
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(8n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { dup: { n: 0 } },
                                                                                        'type',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'eq',
                                                                                        { branch: { skip: 4 } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        { swap: { n: 0 } },
                                                                                        { concat: { cached: false,
                                                                                                    n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                            _descriptor_2
                                                                                                            .alignment()
                                                                                                          ))) } },
                                                                                        { jmp: { skip: 2 } },
                                                                                        'pop',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() },
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() }
                                                                                                                                             )).encode() } },
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value).is_some,
                            'Shot already present and being checked');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(8n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { dup: { n: 0 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(2n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(x_0),
                                                                                                           alignment: _descriptor_2.alignment() })).arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newNull())
                                                          .encode() } },
                                       { swap: { n: 0 } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       { ins: { cached: true, n: 1 } },
                                       { swap: { n: 0 } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _checkBoard1_0(context, partialProofData, sk_0) {
    __compactRuntime.assert(this._equal_3(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(0n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value),
                                          this._ownPublicKey_0(context,
                                                               partialProofData)),
                            'You are not player1');
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            2,
                            'Board not ready to be checked');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(8n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(0n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { dup: { n: 0 } },
                                                                                       'type',
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                                                                       'eq',
                                                                                       { branch: { skip: 4 } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                                                                       { swap: { n: 0 } },
                                                                                       { concat: { cached: false,
                                                                                                   n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                           _descriptor_2
                                                                                                           .alignment()
                                                                                                         ))) } },
                                                                                       { jmp: { skip: 2 } },
                                                                                       'pop',
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                              { value: _descriptor_2.toValue(0n),
                                                                                                                                                alignment: _descriptor_2.alignment() },
                                                                                                                                              { value: _descriptor_2.toValue(0n),
                                                                                                                                                alignment: _descriptor_2.alignment() }
                                                                                                                                            )).encode() } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value).is_some,
                            'No shot to check');
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(4n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'The game has ended');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const currentShot_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_2.toValue(8n),
                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_2.toValue(0n),
                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                     { dup: { n: 0 } },
                                                                                     'type',
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                                     'eq',
                                                                                     { branch: { skip: 4 } },
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                                     { swap: { n: 0 } },
                                                                                     { concat: { cached: false,
                                                                                                 n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                         _descriptor_2
                                                                                                         .alignment()
                                                                                                       ))) } },
                                                                                     { jmp: { skip: 2 } },
                                                                                     'pop',
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                            { value: _descriptor_2.toValue(0n),
                                                                                                                                              alignment: _descriptor_2.alignment() },
                                                                                                                                            { value: _descriptor_2.toValue(0n),
                                                                                                                                              alignment: _descriptor_2.alignment() }
                                                                                                                                          )).encode() } },
                                                                                     { popeq: { cached: true,
                                                                                                result: undefined } }]).value).value;
    const shotHash_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     currentShot_0,
                                                                                     'battleship-simple.compact line 125 char 39'),
                                                sk_0);
    if (_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_2.toValue(6n),
                                                                                              alignment: _descriptor_2.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(shotHash_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      const tmp_0 = 1n;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_2.toValue(10n),
                                                                    alignment: _descriptor_2.alignment() } }] } },
                                         { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                { value: _descriptor_9.toValue(tmp_0),
                                                                  alignment: _descriptor_9.alignment() }
                                                                  .value
                                                              )) } },
                                         { ins: { cached: true, n: 1 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(11n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(1),
                                                                                                alignment: _descriptor_10.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
      const tmp_1 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_2.toValue(9n),
                                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                                               { popeq: { cached: true,
                                                                                          result: undefined } }]).value)
                    <
                    2n
                    ?
                    0 :
                    1;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_1),
                                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
      const tmp_2 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_2.toValue(1n),
                                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(12n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    if (!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_2.toValue(6n),
                                                                                               alignment: _descriptor_2.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(shotHash_0),
                                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(11n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0),
                                                                                                alignment: _descriptor_10.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(8n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(1n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_2.toValue(11n),
                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
  }
  _checkBoard2_0(context, partialProofData, sk_0) {
    __compactRuntime.assert(this._equal_4(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(1n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value),
                                          this._ownPublicKey_0(context,
                                                               partialProofData)),
                            'You are not player2');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(3n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            2,
                            'Board not ready to be checked');
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(7n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { dup: { n: 0 } },
                                                                                        'type',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'eq',
                                                                                        { branch: { skip: 4 } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        { swap: { n: 0 } },
                                                                                        { concat: { cached: false,
                                                                                                    n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                            _descriptor_2
                                                                                                            .alignment()
                                                                                                          ))) } },
                                                                                        { jmp: { skip: 2 } },
                                                                                        'pop',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() },
                                                                                                                                               { value: _descriptor_2.toValue(0n),
                                                                                                                                                 alignment: _descriptor_2.alignment() }
                                                                                                                                             )).encode() } },
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value).is_some,
                            'No shot to check');
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(4n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'The game has ended');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const currentShot_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_2.toValue(7n),
                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_2.toValue(0n),
                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                     { dup: { n: 0 } },
                                                                                     'type',
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                                     'eq',
                                                                                     { branch: { skip: 4 } },
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                                     { swap: { n: 0 } },
                                                                                     { concat: { cached: false,
                                                                                                 n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                                         _descriptor_2
                                                                                                         .alignment()
                                                                                                       ))) } },
                                                                                     { jmp: { skip: 2 } },
                                                                                     'pop',
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                            { value: _descriptor_2.toValue(0n),
                                                                                                                                              alignment: _descriptor_2.alignment() },
                                                                                                                                            { value: _descriptor_2.toValue(0n),
                                                                                                                                              alignment: _descriptor_2.alignment() }
                                                                                                                                          )).encode() } },
                                                                                     { popeq: { cached: true,
                                                                                                result: undefined } }]).value).value;
    const shotHash_0 = this._commitBoardSpace_0(__compactRuntime.convertFieldToBytes(32,
                                                                                     currentShot_0,
                                                                                     'battleship-simple.compact line 150 char 39'),
                                                sk_0);
    if (_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_2.toValue(5n),
                                                                                              alignment: _descriptor_2.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(shotHash_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      const tmp_0 = 1n;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_2.toValue(9n),
                                                                    alignment: _descriptor_2.alignment() } }] } },
                                         { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                { value: _descriptor_9.toValue(tmp_0),
                                                                  alignment: _descriptor_9.alignment() }
                                                                  .value
                                                              )) } },
                                         { ins: { cached: true, n: 1 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(11n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(1),
                                                                                                alignment: _descriptor_10.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
      const tmp_1 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_2.toValue(10n),
                                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                                               { popeq: { cached: true,
                                                                                          result: undefined } }]).value)
                    <
                    2n
                    ?
                    0 :
                    1;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_1),
                                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
      const tmp_2 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_2.toValue(0n),
                                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(12n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    if (!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_2.toValue(5n),
                                                                                               alignment: _descriptor_2.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(shotHash_0),
                                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(11n),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0),
                                                                                                alignment: _descriptor_10.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(7n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(1n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_2.toValue(11n),
                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
  }
  _commitBoardSpace_0(x_0, sk_0) { return this._persistentHash_0([x_0, sk_0]); }
  _publicKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([98, 97, 116, 116, 108, 101, 115, 104, 105, 112, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _equal_0(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_1(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_2(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_3(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_4(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get player1() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get player2() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(1n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get player1State() {
      return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(2n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get player2State() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(3n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get gameState() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(4n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    board1: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'battleship-simple.compact line 33 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    board2: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'battleship-simple.compact line 34 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[6];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    player1Shots: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(1n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'type',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      length(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`length: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(2n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      head(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`head: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(0n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { dup: { n: 0 } },
                                                                          'type',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { branch: { skip: 4 } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          { swap: { n: 0 } },
                                                                          { concat: { cached: false,
                                                                                      n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                              _descriptor_2
                                                                                              .alignment()
                                                                                            ))) } },
                                                                          { jmp: { skip: 2 } },
                                                                          'pop',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                 { value: _descriptor_2.toValue(0n),
                                                                                                                                   alignment: _descriptor_2.alignment() },
                                                                                                                                 { value: _descriptor_2.toValue(0n),
                                                                                                                                   alignment: _descriptor_2.alignment() }
                                                                                                                               )).encode() } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return (() => {  var iter = { curr: self_0 };  iter.next = () => {    const arr = iter.curr.asArray();    const head = arr[0];    if(head.type() == "null") {      return { done: true };    } else {      iter.curr = arr[1];      return { value: _descriptor_2.fromValue(head.asCell().value), done: false };    }  };  return iter;})();
      }
    },
    player2Shots: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(8n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(1n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'type',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      length(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`length: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(8n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(2n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      head(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`head: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(8n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(0n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { dup: { n: 0 } },
                                                                          'type',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { branch: { skip: 4 } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          { swap: { n: 0 } },
                                                                          { concat: { cached: false,
                                                                                      n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                              _descriptor_2
                                                                                              .alignment()
                                                                                            ))) } },
                                                                          { jmp: { skip: 2 } },
                                                                          'pop',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                                 { value: _descriptor_2.toValue(0n),
                                                                                                                                   alignment: _descriptor_2.alignment() },
                                                                                                                                 { value: _descriptor_2.toValue(0n),
                                                                                                                                   alignment: _descriptor_2.alignment() }
                                                                                                                               )).encode() } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return (() => {  var iter = { curr: self_0 };  iter.next = () => {    const arr = iter.curr.asArray();    const head = arr[0];    if(head.type() == "null") {      return { done: true };    } else {      iter.curr = arr[1];      return { value: _descriptor_2.fromValue(head.asCell().value), done: false };    }  };  return iter;})();
      }
    },
    get hitCountBoard1() {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(9n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get hitCountBoard2() {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(10n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get shotResult() {
      return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_2.toValue(11n),
                                                                                                    alignment: _descriptor_2.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    get winner() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(12n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
  commitBoardSpace: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`commitBoardSpace: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const x_0 = args_0[0];
    const sk_0 = args_0[1];
    if (!(x_0.buffer instanceof ArrayBuffer && x_0.BYTES_PER_ELEMENT === 1 && x_0.length === 32)) {
      __compactRuntime.typeError('commitBoardSpace',
                                 'argument 1',
                                 'battleship-simple.compact line 166 char 1',
                                 'Bytes<32>',
                                 x_0)
    }
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('commitBoardSpace',
                                 'argument 2',
                                 'battleship-simple.compact line 166 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._commitBoardSpace_0(x_0, sk_0);
  },
  publicKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`publicKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 1',
                                 'battleship-simple.compact line 170 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._publicKey_0(sk_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
