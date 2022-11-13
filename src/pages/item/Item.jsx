import React, { useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../api/Api-requests'
import axios from 'axios'
import { LocalStorage } from 'ttl-localstorage'
import { setLocalStorage } from '../../functions/functions'
import { Link } from 'react-router-dom'
import { route } from '../../config/routes'
import Button from '../../components/button/Button'
import { cartContext } from '../../providers/CartProvider'

const Item = () => {
  const [item, setItem] = useState({})
  const [colors, setColors] = useState([])
  const [memory, setMemory] = useState([])
  const [selectedColor, setSelectedColor] = useState()
  const [selectedMemory, setSelectedMemory] = useState()
  const [cartNumber, setCartNumber] = useContext(cartContext)

  useEffect(() => {
    const id = LocalStorage.get('item')
    const currentId = LocalStorage.get('currentId')
    const localItem = LocalStorage.get('localItem')
    if (id !== currentId) {
      axios.get(`${baseUrl}/product/${id}`).then((response) => {
        setItem(response.data)
        setLocalStorage('localItem', response.data)
        setLocalStorage('currentId', response.data.id)
        setColors(response.data.options.colors)
        setMemory(response.data.options.storages)
      })
    } else {
      setItem(localItem)
      setColors(localItem.options.colors)
      setMemory(localItem.options.storages)
    }
  }, [])

  const sendItemInfo = () => {
    axios.post(`${baseUrl}/cart`, {
      id: item.id,
      colorCode: selectedColor,
      storageCode: selectedMemory
    }).then((response) => {
      setCartNumber(response.data)
      setLocalStorage('cartNumberLocal', cartNumber)
    })
  }

  return (
    <div>
        <img src={item.imgUrl} alt={item.model} />
        <div>
            <div>
                <h2>Description</h2>
                <p>{item.brand === '' ? null : `Brand: ${item.brand}`}</p>
                <p>{item.model === '' ? null : `Model: ${item.model}`}</p>
                <p>{item.price === '' ? null : `Price: ${item.price}€`}</p>
                <p>{item.cpu === '' ? null : `CPU: ${item.cpu}`}</p>
                <p>{item.ram === '' ? null : `RAM: ${item.ram}`}</p>
                <p>{item.os === '' ? null : `OS: ${item.os}`}</p>
                <p>{item.displayResolution === '' ? null : `Resolution: ${item.displayResolution}`}</p>
                <p>{item.battery === '' ? null : `Battery: ${item.battery}`}</p>
                <p>Camera:</p>
                <ul>
                    <li>{item.primaryCmera === '' ? null : `Primary: ${item.primaryCamera}`}</li>
                    <li>{item.secondaryCmera === '' ? null : `Secondary: ${item.secondaryCmera}`}</li>
                </ul>
                <p>{item.dimentions === '' ? null : `Dimentions ${item.dimentions}`}</p>
                <p>{item.weight === '' ? null : `Peso: ${item.weight}g`}</p>
            </div>
            <div>
              <p>Storage:</p>
              {colors.map(color =>
                <Button key={color.code} onClick={() => { setSelectedColor(color.code) }} text={color.name}/>
              )}
              <p>Memory:</p>
              {memory.map(element =>
                <Button key={element.code} onClick={() => { setSelectedMemory(element.code) }} text={element.name}/>
              )}
              <Button onClick={() => { sendItemInfo() }} text={'Add to cart'}/>
            </div>
        </div>
        <div>
            <Link to={route.home}>Return to list</Link>
        </div>
    </div>
  )
}

export default Item
