import React from 'react'
import { connect } from 'react-redux'
import startOfMonth from 'date-fns/startOfMonth'
import AccountList from 'components/AccountList'
import TagTable from './containers/TagTable'
import TransferTable from './containers/TransferTable'
import BudgetInfo from './containers/BudgetInfo'
import MonthSelector from './MonthSelect'
import getMonthDates from './selectors/getMonthDates'
import { Box, Hidden, useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const Budgets = ({ monthDates }) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const [month, setMonth] = React.useState(+startOfMonth(new Date()))

  const setCurrentMonth = () => setMonth(+startOfMonth(new Date()))
  const setMonthByIndex = i => setMonth(monthDates[i])
  const index = monthDates.findIndex(date => date === month)

  return (
    <Box p={isMobile ? 1 : 3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MonthSelector
            months={monthDates}
            current={index}
            onSetCurrent={setCurrentMonth}
            onChange={setMonthByIndex}
          />
          <Box component={BudgetInfo} index={index} mt={3} />
          <Hidden smDown>
            <Box component={AccountList} mt={3} />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={9}>
          <TagTable index={index} date={monthDates[index]} />
          <Box component={TransferTable} index={index} mt={3} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default connect(
  state => ({ monthDates: getMonthDates(state) }),
  null
)(Budgets)
