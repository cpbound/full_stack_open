import { useDispatch  } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const value = event.target.value
    dispatch(setFilter(value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <strong>Filter </strong><input onChange={handleChange} />
    </div>
  )
}

export default Filter
