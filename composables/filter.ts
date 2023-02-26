export const filterByBank = (bank: any, accounts: any, transactions: any) => {
  if (bank) {
    const bankId = accounts.find((account: any) => account.bank === bank)?.id

    const result = transactions.filter(
      (transaction: any) => transaction.accountId == bankId
    )

    return result
  }

  return transactions
}
