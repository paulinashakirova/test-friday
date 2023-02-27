import { Transaction } from '@/types/transactions'

export const sortDates = (transactions: Transaction[], direction: boolean) => {
  const sortedDatesAsc = transactions
    .slice()
    .sort((a: Transaction, b: Transaction) => {
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    })

  const sortedDatesDesc = transactions
    .slice()
    .sort((a: Transaction, b: Transaction) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
    })

  return direction ? sortedDatesDesc : sortedDatesAsc
}
