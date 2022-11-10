import { LocalStorage } from 'ttl-localstorage'

export const setLocalStorage = (key, data) => {
  LocalStorage.put(key, data, 3600)
}
