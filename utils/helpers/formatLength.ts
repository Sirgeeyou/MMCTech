export function formatLength(minutes: string, seconds: string): string {
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}:00`;
}
