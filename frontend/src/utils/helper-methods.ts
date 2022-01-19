export const getFirstCap = (text: string) => {
  return text.charAt(0).toUpperCase();
}

export const trimString = (text: string, length: number) => {
  const trimmed = text.substring(0, length);
  return trimmed + (trimmed.length > length ? "..." : "");
};