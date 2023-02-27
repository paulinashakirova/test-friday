import { Account } from '@/types/accounts'
import { Category } from '@/types/categories'
import { Transaction } from '@/types/transactions'

export const performSearch = (
  searchString: string,
  transactions: Transaction[]
) => {
  return searchString
    ? transactions.filter((transaction: Transaction) =>
        transaction.reference.includes(searchString)
      )
    : transactions
}

export const searchBankById = (id: string, accounts: Account[]) => {
  return accounts.find((account: Account) => account.id === id)?.bank
}

export const searchCategoryById = (id: string, categories: Category[]) => {
  const category = categories.find((category: Category) => category.id === id)
  return category?.name
}

export const searchCategoryColorById = (id: string, categories: Category[]) => {
  return categories.find((category: Category) => category.id === id)?.color
}
