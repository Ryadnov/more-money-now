import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Popover,
  IconButton,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { formatMoney } from 'helpers/format'
import AmountInput from 'components/AmountInput'

export default function BudgetPopover({
  id,
  budgeted,
  available,
  prevBudgeted,
  prevSpend,
  currency,
  onChange,
  ...rest
}) {
  const [value, setValue] = React.useState(budgeted)

  return (
    <Popover disableRestoreFocus onClose={() => onChange(+value)} {...rest}>
      <Box p={2} pb={0}>
        <AmountInput
          autoFocus
          value={value}
          fullWidth
          onChange={value => setValue(+value)}
          onEnter={value => onChange(+value)}
          helperText={`Остаток категории ${formatMoney(
            available + +value - budgeted,
            currency
          )}`}
          placeholder="0"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => onChange(+value)}>
                  <CheckCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List>
        {!!prevBudgeted && (
          <ListItem
            button
            selected={+value === +prevBudgeted}
            onClick={() => onChange(+prevBudgeted)}
          >
            <ListItemText
              primary="Бюджет в прошлом месяце"
              secondary={formatMoney(prevBudgeted, currency)}
            />
          </ListItem>
        )}

        {!!prevSpend && (
          <ListItem
            button
            selected={+value === +prevSpend}
            onClick={() => onChange(+prevSpend)}
          >
            <ListItemText
              primary="Расход в прошлом месяце"
              secondary={formatMoney(prevSpend, currency)}
            />
          </ListItem>
        )}

        {available !== 0 && (
          <ListItem
            button
            selected={+value === +prevSpend}
            onClick={() => onChange(+budgeted - available)}
          >
            <ListItemText
              primary={
                available < 0 ? 'Покрыть перерасход' : 'Сбросить остаток'
              }
              secondary={formatMoney(+budgeted - available, currency)}
            />
          </ListItem>
        )}
      </List>
    </Popover>
  )
}
