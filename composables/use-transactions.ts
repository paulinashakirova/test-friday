import transactions from '@/static/mock-data/transactions.json'
import { Transaction } from '@/types/transactions'

export const fetchAllTransactions = async () => {
  const mockAsyncPromise = (mockTransactions: Transaction[], delay: number) =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          mockTransactions
            ? resolve(mockTransactions)
            : reject(
                new Error(
                  "Sadly, we couldn't load the necessary data. Please try again, or contact us. Sorry for the inconvenience."
                )
              ),
        delay
      )
    )

  return mockAsyncPromise(transactions, 100)

  // catch is unnecesary here, since it is duplicating an error displayed in the console (should error occur)
}
