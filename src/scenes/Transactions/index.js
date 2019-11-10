import React, { useState } from 'react'
import TransactionList from 'components/TransactionList'
import AccountList from 'components/AccountList'
import { Box, Drawer, useMediaQuery, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TransactionPreview from 'components/TransactionPreview'
import sendEvent from 'helpers/sendEvent'

const useStyles = makeStyles(theme => ({
  drawerWidth: { width: 360 },
}))

const StyledTransactionList = props => (
  <Box flexGrow={1} height="100vh" minWidth={0} clone>
    <TransactionList groupBy="DAY" {...props} />
  </Box>
)

export default function TransactionsView() {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [opened, setOpened] = useState(null)
  const c = useStyles()

  const onOpenTransaction = id => {
    setOpened(id)
    sendEvent('Transaction: see details')
  }

  return (
    <Box display="flex">
      <Box
        p={3}
        width={280}
        height="100vh"
        overflow="auto"
        display={{ xs: 'none', md: 'block' }}
      >
        <AccountList />
      </Box>

      <StyledTransactionList {...{ opened, setOpened: onOpenTransaction }} />

      <Drawer
        classes={
          isMobile ? null : { paper: c.drawerWidth, root: c.drawerWidth }
        }
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="right"
        open={!isMobile || !!opened}
        onClose={() => setOpened(null)}
      >
        {opened ? (
          <TransactionPreview
            id={opened}
            key={opened}
            onClose={() => setOpened(null)}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            color="text.hint"
            p={3}
          >
            <Typography variant="body2" align="center" color="inherit">
              Выберите операцию,
              <br />
              чтобы увидеть детали
            </Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}
