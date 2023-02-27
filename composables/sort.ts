export const sortDates = (transactions: any, direction: boolean) => {
  const sortedDatesAsc = transactions.slice().sort((a: any, b: any) => {
    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0
  })
  const sortedDatesDesc = transactions.slice().sort((a: any, b: any) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
  })

  return direction ? sortedDatesDesc : sortedDatesAsc
}
