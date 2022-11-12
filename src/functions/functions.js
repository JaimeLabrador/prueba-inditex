import { LocalStorage } from 'ttl-localstorage'

export const setLocalStorage = (key, data) => {
  LocalStorage.put(key, data, 3600)
}

export const simplifyString = (func, text) => {
  return func(text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '').toLowerCase())
}
