import React, { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardBody, Spinner } from 'reactstrap'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { VerifyUserAccount } from 'apiServices/auth'

const VerifyAccount = () => {

  const [ searchParams ] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const handleVerifyAccount = useCallback(async() => {
    setLoading(true)
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const payload = {
      email,
      verification: token
    }
    const decodeToken = await jwt_decode(token)
    const isExpired = dayjs.unix(decodeToken.exp).diff(dayjs()) < 1
    if (isExpired) {
      setLoading(false)
      return toast.error('Verification code expired!')
    }
    try {
      const response = await VerifyUserAccount(payload)
      toast.success(response.msg)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.msg)
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    handleVerifyAccount()
    // eslint-disable-next-line
  }, [])

  return (
    <Card className='verify_account'>
        <CardBody>
            <h3>Account Verification</h3>
            {loading ? <Spinner /> : 
              <Link to='/login' className='btn btn-primary'>Back To Login</Link>
            }
        </CardBody>
    </Card>
  )
}

export default VerifyAccount