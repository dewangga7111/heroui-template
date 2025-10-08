export const formatEllipsis = (text: string, maxChars: number = 12): string => {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "...";
}
