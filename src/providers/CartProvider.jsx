import React, { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

const CartProvider = (props) => {
  const [cartNumber, setCartNumber] = useState('')
  return (
    <div>
        <cartContext.Provider value={[cartNumber, setCartNumber]}>
            {props.children}
        </cartContext.Provider>
    </div>
  )
}
CartProvider.propTypes = {
  children: PropTypes.array
}
export default CartProvider
export const cartContext = createContext()
