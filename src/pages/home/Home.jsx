import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../api/Api-requests'
import './Home.scss'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/product`).then((response) => {
      setData(response.data)
    })
    console.log(data)
  }, [])

  return (
    <div className='itemsList'>
      {data.map(item =>
        <div className='itemsList__item' key={item.id}>
          <img className='itemsList__item__image' src={item.imgUrl} alt={item.model} />
          <h3 className='itemsList__item__model'>{item.model}</h3>
          <h4 className='itemsList__item__price'>Desde {item.price}€</h4>
        </div>
      )}
    </div>
  )
}

export default Home
