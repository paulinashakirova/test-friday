import { Account } from '@/types/accounts'
import { Transaction } from '@/types/transactions'

export const filterByBank = (
  bank: string,
  accounts: Account[],
  transactions: Transaction[]
) => {
  if (bank) {
    const bankId = accounts.find(
      (account: Account) => account.bank === bank
    )?.id

    const result = transactions.filter(
      (transaction: Transaction) => transaction.accountId == bankId
    )

    return result
  }

  return transactions
}
