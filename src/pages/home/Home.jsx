import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../api/Api-requests'
import './Home.scss'
import { Link, generatePath } from 'react-router-dom'
import { route } from '../../config/routes'
import { setLocalStorage, simplifyString } from '../../functions/functions'
import { LocalStorage } from 'ttl-localstorage'
import SearchInput from '../../components/searchInput/SearchInput'

const Home = () => {
  const [data, setData] = useState([])
  const [inputString, setInputString] = useState('')

  useEffect(() => {
    const itemsList = LocalStorage.get('itemsList')
    if (itemsList === null) {
      axios.get(`${baseUrl}/product`).then((response) => {
        setData(response.data)
        setLocalStorage('itemsList', response.data)
      })
    } else {
      const filteredData = []
      itemsList.map(item =>
        item.model.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '').toLowerCase().includes(inputString) ? filteredData.push(item) : null
      )
      if (inputString === '') {
        setData(itemsList)
      } else {
        setData(filteredData)
      }
    }
  }, [inputString])

  const getInputString = (e) => {
    simplifyString(setInputString, e.target.value)
  }

  return (
    <div className='itemsList'>
      <div>
        <SearchInput handleAction ={ getInputString }/>
      </div>
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
