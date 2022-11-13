import './App.scss'
import React from 'react'
import Home from '../pages/home/Home'
import Item from '../pages/item/Item'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { route } from '../config/routes'
import Header from '../components/header/Header'
import CartProvider from '../providers/CartProvider'

function App () {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Header />
          <Routes>
            <Route exact path={route.home} element={<Home />}/>
            <Route exact path={route.item} element={<Item />}/>
          </Routes>
        </CartProvider>
      </Router>
    </div>
  )
}

export default App
