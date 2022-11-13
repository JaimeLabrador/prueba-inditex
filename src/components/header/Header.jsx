import React, { useEffect, useContext } from 'react'
import { Breadcrumbs } from '@mui/material'
import { route } from '../../config/routes'
import { Link } from 'react-router-dom'
import { cartContext } from '../../providers/CartProvider'
import { LocalStorage } from 'ttl-localstorage'

const Header = () => {
  const [cartNumber, setCartNumber] = useContext(cartContext)

  useEffect(() => {
    const cartNumberLocal = LocalStorage.get('cartNumberLocal')
    if (cartNumberLocal) {
      setCartNumber(cartNumberLocal)
    }
  }, [cartNumber])

  return (
    <div>
        <nav>
            <Link to={route.home}>Jaime Labrador TEST</Link>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to={route.home}>Product list</Link>
                <Link to={route.item}>Product page</Link>
            </Breadcrumbs>
        </nav>
        <div>
            <p>{cartNumber.count}</p>
            <p>Cart</p>
        </div>
    </div>
  )
}

export default Header
