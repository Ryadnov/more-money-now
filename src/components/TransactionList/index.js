import React, { memo, forwardRef } from 'react'
import { Box } from '@material-ui/core'
import { VariableSizeList as List } from 'react-window'
import { areEqual } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { connect } from 'react-redux'
import TransactionGroup from './TransactionGroup'
import TopBar from './TopBar'
import { getMainTransactionList } from 'store/data/transactions'
import formatDate from './formatDate'

const GROUP_HEADER_HEIGHT = 48
const TRANSACTION_HEIGHT = 72
const PADDINGS = 16

class TransactionList extends React.Component {
  state = { listRef: {} }

  componentDidUpdate = (_, prevState) => {
    if (prevState.listRef.resetAfterIndex) prevState.listRef.resetAfterIndex(0)
  }

  setRef = r => this.setState({ listRef: r })

  getItemKey = i => +this.props.groups[i].date

  getItemSize = (i, d) =>
    GROUP_HEADER_HEIGHT +
    TRANSACTION_HEIGHT * this.props.groups[i].transactions.length +
    PADDINGS +
    16

  render() {
    const { groups, className, opened, setOpened } = this.props
    const SEARCH_HEIGHT = 72
    const PADDING_BOTTOM = 40

    const innerElementType = forwardRef(({ children, style, ...rest }, ref) => (
      <div
        ref={ref}
        style={{
          ...style,
          height: style.height + SEARCH_HEIGHT + PADDING_BOTTOM,
          scrollbarWidth: 0,
        }}
        {...rest}
      >
        {children}
      </div>
    ))

    const Row = memo(
      ({ index, style }) => (
        <TransactionGroup
          style={{ ...style, top: style.top + SEARCH_HEIGHT + 16 }}
          topOffset={SEARCH_HEIGHT}
          name={formatDate(groups[index].date)}
          transactions={groups[index].transactions}
          {...{ opened, setOpened }}
        />
      ),
      areEqual
    )

    return (
      <Box position="relative" className={className}>
        <TopBar />
        <AutoSizer disableWidth={true}>
          {({ height, width }) => (
            <List
              className="hidden-scroll"
              ref={this.setRef}
              innerElementType={innerElementType}
              height={height}
              itemCount={groups.length}
              itemSize={this.getItemSize}
              width={'100%'}
              itemKey={this.getItemKey}
              itemData={groups}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </Box>
    )
  }
}

export default connect(
  state => ({ groups: getMainTransactionList(state) }),
  null
)(TransactionList)
