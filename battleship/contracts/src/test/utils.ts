
export const randomBytes = (length: number): Uint8Array => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
}

export const startArgs = (x1: number, x2: number, sk: Uint8Array): [x1: bigint, x2: bigint, sk: Uint8Array] => {
    return [BigInt(x1), BigInt(x2), sk];
}