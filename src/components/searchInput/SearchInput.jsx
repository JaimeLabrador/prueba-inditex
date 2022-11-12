import React from 'react'
import { PropTypes } from 'prop-types'

function SearchInput ({ handleAction }) {
  return (
    <input type="text" onChange={ handleAction }/>
  )
}
SearchInput.propTypes = {
  handleAction: PropTypes.func
}

export default SearchInput
