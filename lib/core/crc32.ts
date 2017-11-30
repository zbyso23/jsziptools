import {BufferLike, toBytes, defun} from '../common';

const table = new Uint32Array(256);
const poly = 0xEDB88320;
let u: number;
for (let i = 0; i < 256; ++i) {
    u = i;
    for (let j = 0; j < 8; ++j) {
        u = u & 1 ? (u >>> 1) ^ poly : u >>> 1;
    }
    table[i] = u >>> 0;
}

export interface Crc32Params {
    buffer: BufferLike
    crc?: number
}

/**
 * Calcurates Crc 32 checksum.
 *
 * @example
 * let checksum;
 * chucks.forEach(c => checksum = jz.common.crc32(c, checksum));
 */
function _crc32(pararms: Crc32Params): number;
function _crc32(buffer: BufferLike, crc?: number): number;
function _crc32(buffer: BufferLike | any, crc?: number): number {
    const bytes = toBytes(buffer);
    const t = table;
    let _crc = crc == null ? 0xFFFFFFFF : ~crc >>> 0
    for (let i = 0, n = bytes.length; i < n; ++i) _crc = (_crc >>> 8) ^ t[bytes[i] ^ (_crc & 0xFF)];
    return ~_crc >>> 0;
}

export const crc32 = defun(['buffer', 'crc'], _crc32);
