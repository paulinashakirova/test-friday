import accounts from '@/static/mock-data/accounts.json'
import { Account } from '@/types/accounts'

export const fetchAllAccounts = async () => {
  const mockAsyncPromise = (mockAccounts: Account[], delay: number) =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          mockAccounts
            ? resolve(mockAccounts)
            : reject(
                new Error(
                  "Sadly, we couldn't load the necessary data. Please try again, or contact us. Sorry for the inconvenience."
                )
              ),
        delay
      )
    )

  return mockAsyncPromise(accounts, 100)

  // catch is unnecesary here, since it is duplicating an error displayed in the console (should error occur)
}
