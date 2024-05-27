import React, { useState, useEffect } from 'react'

import { Checkbox, Radio } from 'antd'
import { prices } from '../utils/prices'
import { fetchFilteredProducts, fetchProductList } from '../utils/dmart-api'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setItemInLocal } from '../utils/local-storage-utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, setCart } from '../app/slices/cart/cartSlice'
import { useFetchCategoriesQuery } from '../app/api/categoryApi'
import { useFetchProductCountQuery } from '../app/api/productApi'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)

  const { data: categories, error: categoriesError } = useFetchCategoriesQuery()
  const { data: total, error: productCountError } = useFetchProductCountQuery()

  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (categoriesError) {
      toast.error('Failed to fetch categories')
    }
  }, [categoriesError])

  useEffect(() => {
    if (productCountError) {
      toast.error('Failed to fetch product count')
    }
  }, [productCountError])

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await fetchProductList(page)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])
  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await fetchProductList(page)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct()
    } else {
      getAllProducts()
    }
  }, [checked, radio])

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await fetchFilteredProducts({
        checked,
        radio,
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  const hideLoadMore =
    !(products && products.length < total) ||
    checked.length > 0 ||
    radio.length > 0

  return (
    <div className="container-fluid row mt-3">
      <div className="col-md-2">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column">
          {categories?.map((c) => (
            <Checkbox
              key={`category_${c._id}`}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {prices?.map((p) => (
              <div key={`price_${p._id}`}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-column">
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className="col-md-9">
        <h1 className="text-center" data-testid="home-title">
          All Products
        </h1>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div
              key={`product_${p._id}`}
              className="card m-2"
              style={{ width: '18rem' }}
            >
              <img
                src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    dispatch(setCart([...cart, p]))
                    setItemInLocal('cart', [...cart, p])
                    toast.success('Item Added to cart')
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3">
          {!hideLoadMore && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}
            >
              {loading ? 'Loading ...' : 'Loadmore'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
