import React from 'react'
import { TransactionList } from './TransactionList'
import { Drawer, Box, Typography, Tooltip, IconButton } from '@material-ui/core'
import { getSortedTransactions } from 'store/data/transactions'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'

function TransactionsDrawer({
  transactions,
  filterConditions,
  title,
  onClose,
  open,
  ...rest
}) {
  return (
    <Drawer anchor="right" onClose={onClose} open={open} {...rest}>
      <Box
        px={1}
        height="100vh"
        display="flex"
        flexDirection="column"
        minWidth={400}
      >
        <Box py={1} px={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h6" noWrap>
              {title || 'Операции'}
            </Typography>
          </Box>

          <Tooltip title="Закрыть">
            <IconButton edge="end" onClick={onClose} children={<CloseIcon />} />
          </Tooltip>
        </Box>
        <Box flex="1 1 auto" clone>
          <TransactionList {...{ transactions, filterConditions }} />
        </Box>
      </Box>
    </Drawer>
  )
}

export default connect(
  state => ({ transactions: getSortedTransactions(state) }),
  () => ({})
)(TransactionsDrawer)
