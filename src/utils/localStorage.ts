export function saveToLS(key: string, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getFromLS(key: string) {
  if (global.localStorage) {
    try {
      const item = global.localStorage.getItem(key)

      return item ? JSON.parse(item) : null
    } catch (e) {
      return null
    }
  }

  return null
}
