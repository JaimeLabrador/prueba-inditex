import axios from 'axios'

export const baseUrl = 'https://front-test-api.herokuapp.com/api'

export const getItems = () => {
  axios.get(`${baseUrl}/product`).then((response) => {
    return (response)
  })
}

export const getItemById = (id) => {
  axios.get(`${baseUrl}/product/:${id}`).then((response) => {
    return response
  })
}

export const postItem = (id, colorCode, storageCode) => {
  axios.post(`${baseUrl}/cart`, {
    productId: id,
    productColorCode: colorCode,
    productStorageCode: storageCode
  }).then((response) => {
    return response
  })
}
