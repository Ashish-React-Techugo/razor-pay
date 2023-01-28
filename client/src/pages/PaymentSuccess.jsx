import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const refNo = searchQuery.reference
  return (
    <div>
        <h3>Payment Successfull</h3>
        <p>{refNo}</p>
    </div>
  )
}

export default PaymentSuccess