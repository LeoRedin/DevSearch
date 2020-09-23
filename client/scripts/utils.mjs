export function normalizeString(string) {
  const normalized = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const lowercase = normalized.toLowerCase()
  const trimmed = lowercase.replace(/ /g, '')
  return trimmed
}
