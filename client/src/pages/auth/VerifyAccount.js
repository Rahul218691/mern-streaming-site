import React from 'react'
import { Card, CardBody, Spinner } from 'reactstrap'

const VerifyAccount = () => {
  return (
    <Card className='verify_account'>
        <CardBody>
            <h3>Account Verification</h3>
            <Spinner />
        </CardBody>
    </Card>
  )
}

export default VerifyAccount