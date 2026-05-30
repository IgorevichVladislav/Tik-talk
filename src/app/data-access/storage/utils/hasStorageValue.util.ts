export function hasStorageValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.some(v => hasStorageValue(v));
  }

  if (typeof value === 'object') {
    return Object.values(value).some(v => hasStorageValue(v));
  }

  return true;
}
