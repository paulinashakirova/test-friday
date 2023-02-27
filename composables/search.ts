export const performSearch = (searchString: string, transactions: any) => {
  return searchString
    ? transactions.filter((transaction: any) =>
        transaction.reference.includes(searchString)
      )
    : transactions
}

export const searchBankById = (id: string, accounts: any) => {
  return accounts.find((account: any) => account.id === id)?.bank
}

export const searchCategoryById = (id: string, categories: any) => {
  const category = categories.find((category: any) => category.id === id)
  return category?.name
}

export const searchCategoryColorById = (id: string, categories: any) => {
  return categories.find((category: any) => category.id === id)?.color
}
