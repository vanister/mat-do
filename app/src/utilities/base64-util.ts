const hasBuffer = typeof Buffer !== 'undefined';
const encoding: BufferEncoding = 'base64url';

export function toBase64(data: string): string {
  if (hasBuffer) {
    return Buffer.from(data).toString(encoding);
  }

  // legacy
  return btoa(data);
}

export function fromBase64(base64Str: string): string {
  if (hasBuffer) {
    return Buffer.from(base64Str, encoding).toString();
  }

  // legacy
  return atob(base64Str);
}
