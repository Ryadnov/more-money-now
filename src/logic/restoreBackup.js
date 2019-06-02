// import { format } from 'date-fns'
import getRootUser from '../store/data/selectors/users'
import uuidv4 from 'uuid'
import forIn from 'lodash/forIn'

export const restoreBackup = newData => (dispatch, getState) => {
  const state = getState()
  const curData = state.data
  const userId = getRootUser(state)
  const idMap = generateIdMap(newData)

  const changed = {
    account: [],
    tag: [],
    budget: [],
    merchant: [],
    reminder: [],
    reminderMarker: [],
    transaction: []
  }

  // SYNC ACCOUNTS
  for (const type in changed) {
    if (newData[type]) {
      for (const item in newData[type]) {
        if (type === 'budget') {
          changed[type].push()
        }
      }
    }
  }
}

function convertItem(item, idMap, newUser, isBudget = false) {
  const newItem = { ...item }
  newItem.id = idMap[newItem.id]
  if (newItem.user) {
    newItem.user = newUser
  }
}

function generateIdMap(data) {
  const result = {}
  const types = [
    'account',
    'tag',
    'merchant',
    'reminder',
    'reminderMarker',
    'transaction'
  ]

  types.forEach(type => {
    if (data[type]) {
      Object.keys(data[type]).forEach(id => {
        result.id = uuidv4()
      })
    }
  })
  return result
}
