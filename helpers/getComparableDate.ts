export function getComparableDate(date: Date) {
  const seperator = "-";
  return (
    date.getFullYear() +
    seperator +
    date.getMonth() +
    seperator +
    date.getDate()
  );
}
