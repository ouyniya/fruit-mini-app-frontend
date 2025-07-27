export function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // pad with 0
  const day = `0${date.getDate()}`.slice(-2); // pad with 0
  return `${year}-${month}-${day}`;
}
