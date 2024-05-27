import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../app/slices/auth/authSlice'

const Dashboard = () => {
  const auth = useSelector(selectAuth)
  return (
    <div className="card w-75 p-3">
      <h3>Admin Name: {auth?.user?.name}</h3>
      <h3>Admin Email: {auth?.user?.email}</h3>
      <h3>Admin Contect: {auth?.user?.phone}</h3>
    </div>
  )
}

export default Dashboard
