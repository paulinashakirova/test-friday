export const performSearch = (searchString: string, transactions: any) => {
  return searchString
    ? transactions.filter(
        (transaction: any) => transaction.reference === searchString
      )
    : transactions
}
