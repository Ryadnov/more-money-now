import createSelector from 'selectorator'
import { getAccountsInBudget } from 'store/data/accounts'
import { convertCurrency } from 'store/data/instruments'
import { round } from 'helpers/currencyHelpers'
import { getTransactions } from 'store/data/transactions'
import { checkRaw } from 'store/filterConditions'

export const getStartFunds = createSelector(
  [getAccountsInBudget, convertCurrency],
  (accounts, convert) =>
    accounts.reduce(
      (sum, acc) => round(sum + convert(acc.startBalance, acc.instrument)),
      0
    )
)

export const getTransactionsInBudget = createSelector(
  [getTransactions, getAccountsInBudget],
  (transactions, accounts) => {
    const accIds = accounts.map(acc => acc.id)
    return Object.values(transactions).filter(
      checkRaw({
        deleted: false,
        accounts: accIds,
      })
    )
  }
)
