export function getComparableDate(date: Date | null) {
  if (!date) {
    return "";
  }
  const seperator = "-";
  return (
    date.getFullYear() +
    seperator +
    date.getMonth() +
    seperator +
    date.getDate()
  );
}
