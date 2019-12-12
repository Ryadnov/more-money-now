import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, Popover, TextField } from '@material-ui/core'
import { getTag } from 'store/data/tags'
import { patchTag } from 'store/data/tags/thunks'

export function NamePopover({
  title,
  onChange,
  onClose,
  open,
  anchorEl,
  ...rest
}) {
  const [value, setValue] = useState(title)

  const save = () => {
    if (value !== title) onChange(value)
    onClose()
  }

  return (
    <Popover
      onClose={save}
      open={open}
      anchorEl={anchorEl}
      style={{ transform: 'translate(-14px, -18px)' }}
    >
      <Box m={0}>
        <TextField
          autoFocus
          variant="outlined"
          value={value}
          onChange={e => setValue(e.target.value)}
          fullWidth
        />
      </Box>
    </Popover>
  )
}

const mapStateToProps = (state, { tag }) => getTag(state, tag) || {}

const mapDispatchToProps = (dispatch, { tag }) => ({
  onChange: title => dispatch(patchTag({ title, id: tag })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NamePopover)
