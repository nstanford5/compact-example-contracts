Compact --> TypeScript
Boolean --> boolean
Field   --> bigint
Uint    --> bigint
Bytes   --> Uint8Array
Opaque<"string">    --> string
Opaque<"Uint8Array">    --> Uint8Array
enum --> number
struct  --> direct mapping


Runtime
Boolean --> new CompactTypeBoolean()
Field	--> new CompactTypeField()
Uint<0..n> -->	new CompactTypeUnsignedInteger(n, length)
Bytes<n> --> new CompactTypeBytes(n)
Vector<n, T> --> new CompactTypeVector(n, rt_T)
Opaque<"String"> --> new CompactTypeString()
Opaque<"Uint8Array"> --> new CompactTypeUint8Array()
enum --> new CompactTypeEnum(maxValue, length)