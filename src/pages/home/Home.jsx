import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../api/Api-requests'
import './Home.scss'
import { Link, generatePath } from 'react-router-dom'
import { route } from '../../config/routes'
import { setLocalStorage } from '../../functions/functions'
import { LocalStorage } from 'ttl-localstorage'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const itemsList = LocalStorage.get('itemsList')
    if (itemsList === null) {
      axios.get(`${baseUrl}/product`).then((response) => {
        setData(response.data)
        setLocalStorage('itemsList', response.data)
      })
    } else {
      setData(itemsList)
    }
  }, [])

  return (
    <div className='itemsList'>
      {data.map(item =>
        <Link
          className='itemsList__item'
          key={item.id}
          to={generatePath(route.item, { id: item.id })}
          onClick={() => { setLocalStorage('item', item.id) }}
        >
          <img className='itemsList__item__image' src={item.imgUrl} alt={item.model} />
          <h3 className='itemsList__item__model'>{item.model}</h3>
          <h4 className='itemsList__item__price'>From {item.price}€</h4>
        </Link>
      )}
    </div>
  )
}

export default Home
