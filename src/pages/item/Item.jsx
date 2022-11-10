import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../api/Api-requests'
import axios from 'axios'
import { LocalStorage } from 'ttl-localstorage'
import { setLocalStorage } from '../../functions/functions'
import { Link } from 'react-router-dom'
import { route } from '../../config/routes'

const Item = () => {
  const [item, setItem] = useState({})
  const [colors, setColors] = useState([])
  const [memory, setMemory] = useState([])

  useEffect(() => {
    const id = LocalStorage.get('item')
    const currentId = LocalStorage.get('currentId')
    const localItem = LocalStorage.get('localItem')
    if (id !== currentId) {
      axios.get(`${baseUrl}/product/${id}`).then((response) => {
        setItem(response.data)
        setLocalStorage('localItem', response.data)
        setLocalStorage('currentId', response.data.id)
        setColors(response.data.colors)
        setMemory(response.data.internalMemory)
        console.log(response.data)
      })
    } else {
      setItem(localItem)
      setColors(localItem.colors)
      setMemory(localItem.internalMemory)
    }
  }, [])

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
                {colors.map(color => colors.length > 0 ? <button key={color}>{color}</button> : null)}
                <p>Memory:</p>
                {memory.map(element => memory.length > 0 ? <button key={element}>{element}</button> : null)}
            </div>
        </div>
        <div>
            <Link to={route.home}>Return to list</Link>
        </div>
    </div>
  )
}

export default Item
