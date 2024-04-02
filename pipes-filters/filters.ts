export function revert(data: string): string {
  return data.split("").reverse().join("");
}

export function upperCase(data: string): string {
  return data.toUpperCase();
}

export function trim(data: string): string {
  return data.trim();
}

export function fullStop(data: string): string {
  return `${data}.`;
}

export function length(data: string): string {
  return `${data}(${data.length})`;
}
