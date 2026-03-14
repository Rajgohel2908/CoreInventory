/**
 * Generates a reference number in the format: PREFIX/YEAR/SEQUENCE
 * e.g., REC/2026/0108, DEL/2026/0045, TRF/2026/0042
 */

const counters: Record<string, number> = {
  REC: 108,
  DEL: 45,
  TRF: 42,
  ADJ: 19,
};

export function generateReference(prefix: "REC" | "DEL" | "TRF" | "ADJ"): string {
  const year = new Date().getFullYear();
  counters[prefix] = (counters[prefix] || 0) + 1;
  const sequence = String(counters[prefix]).padStart(4, "0");
  return `${prefix}/${year}/${sequence}`;
}

export function generateSku(productName: string): string {
  const words = productName.trim().split(/\s+/);
  const prefix = words
    .slice(0, 3)
    .map((w) => w.substring(0, 3).toUpperCase())
    .join("-");
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `${prefix}-${random}`;
}
