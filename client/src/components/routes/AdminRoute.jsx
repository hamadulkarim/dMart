import { useEffect, useState } from 'react'
import { adminAuthCheck } from '../../utils/dmart-api'
import Spinner from '../Spinner'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SEOHeader from '../layout/SEOHeader'
import AdminMenu from '../layout/AdminMenu.jsx'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../app/slices/auth/authSlice.js'

const AdminRoute = () => {
  const [ok, setOk] = useState(false)
  const auth = useSelector(selectAuth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const authCheck = async () => {
      const res = await adminAuthCheck()

      if (res.data?.ok) {
        setOk(true)
      } else {
        setOk(false)
        navigate('/', { state: location.pathname })
      }
    }

    if (auth?.token) {
      authCheck()
    } else {
      navigate('/', { state: location.pathname })
    }
  }, [auth?.token, location])

  return ok ? (
    <div className="container-fluid">
      <SEOHeader />
      <div className="row">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

export default AdminRoute
