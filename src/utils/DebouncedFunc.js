import debounce from 'lodash/debounce'

const DebouncedFunc = (func, delay) => {
  return debounce(func, delay)
}

export default DebouncedFunc
