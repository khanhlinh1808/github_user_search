import spinnerGif from './spinning-loading.gif'
const Spinner = () => {
  return (
    <>
      <img
        src={spinnerGif}
        alt="loading"
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </>
  )
}

export default Spinner
