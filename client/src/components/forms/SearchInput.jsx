import React from 'react'
import { useNavigate } from 'react-router-dom'
import { searchProducts } from '../../utils/dmart-api'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectValues,
  setResults,
  setKeyword,
} from '../../app/slices/search/searchSlice'
const SearchInput = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const values = useSelector(selectValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await searchProducts(values.keyword)
      dispatch(setResults(data))
      navigate('/search')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => dispatch(setKeyword(e.target.value))}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchInput
