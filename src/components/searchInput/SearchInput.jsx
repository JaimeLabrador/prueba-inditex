import React from 'react'
import { PropTypes } from 'prop-types'

const SearchInput = ({ handleAction }) => {
  return (
    <input placeholder='Serach' type="text" onChange={ handleAction }/>
  )
}
SearchInput.propTypes = {
  handleAction: PropTypes.func
}

export default SearchInput
