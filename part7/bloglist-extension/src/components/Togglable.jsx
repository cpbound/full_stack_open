import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Box } from '@mui/material'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  Togglable.displayName = 'Togglable'

  return (
    <Box>
      <Box sx={{ display: visible ? 'none' : 'block' }}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>

      <Box
        className="togglableContent"
        sx={{ display: visible ? 'block' : 'none', mt: 2 }}
      >
        {props.children}
        <Button
          variant="outlined"
          color="error"
          onClick={toggleVisibility}
          sx={{ mt: 1 }}
        >
          {props.buttonClose}
        </Button>
      </Box>
    </Box>
  )
})

export default Togglable
