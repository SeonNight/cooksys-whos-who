export const removeState = () => {
  window.localStorage.removeItem('whoState')
}

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('whoState');
    if(serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('load failed')
    console.log(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem('whoState', serializedState)
  } catch (err) {
    console.log('save failed')
    console.log(err)
  }
}