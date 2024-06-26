import React from 'react'
import { fetchUserOrders } from '../../utils/dmart-api'
import { useLoaderData } from 'react-router-dom'
import moment from 'moment'

export const ordersLoader = async () => {
  const response = await fetchUserOrders()
  const { orders } = response?.data

  return { orders }
}

const Orders = () => {
  const { orders } = useLoaderData()
  return (
    <>
      <h1 className='text-center'>All Orders</h1>
      {orders?.map((o, i) => {
        return (
          <div key={o._id} className='border shadow'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Buyer</th>
                  <th scope='col'> Date</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{o?.status}</td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.products?.length}</td>
                  <td>{o?.amount}</td>
                </tr>
              </tbody>
            </table>
            <div className='container'>
              {o?.products?.map((p, i) => (
                <div className='row mb-2 p-3 card flex-row' key={p._id}>
                  <div className='col-md-4'>
                    <img
                      src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                      width='100px'
                      height={'100px'}
                    />
                  </div>
                  <div className='col-md-8'>
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Orders
