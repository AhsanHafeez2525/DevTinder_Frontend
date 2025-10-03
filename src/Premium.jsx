import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BASE_URL } from './utils/constants'

const Premium = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPremiumUser, setIsPremiumUser] = useState(false)
  
  useEffect(() => {
    verifyPremiumUser()
  }, [])
  
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/premium", { withCredentials: true })
      if(res.data.status === "success"){
        setIsPremiumUser(true)
      }
      console.log(res)
    } catch (error) {
      console.error('Error verifying premium status:', error)
    }
  }

  const handleBuyClick = async (type) => {
    setLoading(true)
    setError('')

    try {
      const order = await axios.post(BASE_URL + "/payment/create", {
        membershipType: type,
      }, { withCredentials: true })

      const { amount, orderId, currency, notes, status, keyId } = order.data

      // Open Razorpay Checkout
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'DevTinder',
        description: 'Connect to other developers',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: function (response) {
          console.log('Payment successful:', response)
          // Handle successful payment
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed')
            setLoading(false)
          }
        }
      }
      
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('Payment error:', err)
      setError(err.response?.data?.message || 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  if (isPremiumUser) {
    return (
      <div className="min-h-screen bg-base-200 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">You are already a premium user</h1>
          <p className="text-lg text-base-content/70">Enjoy your premium features!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Plan</h1>
          <p className="text-lg text-base-content/70">Unlock premium features and connect with more developers</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Silver Membership */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-base-300 shadow-xl w-full max-w-md"
          >
            <div className="card-body text-center p-8">
              <div className="badge badge-primary mb-4">POPULAR</div>
              <h2 className="card-title text-3xl justify-center mb-4">Silver Membership</h2>
              <div className="text-4xl font-bold text-primary mb-6">₹299<span className="text-lg text-base-content/70">/month</span></div>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Chat with other users
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  Blue Tick verification
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  100 connection requests per day
                </li>
                <li className="flex items-center">
                  <span className="text-success mr-2">✓</span>
                  3 months validity
                </li>
              </ul>
              
              <motion.button
                className="btn btn-primary btn-lg w-full"
                onClick={() => handleBuyClick("silver")}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Buy Silver"
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="divider lg:divider-horizontal">OR</div>

          {/* Gold Membership */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card bg-gradient-to-br from-yellow-500 to-orange-500 shadow-xl w-full max-w-md"
          >
            <div className="card-body text-center p-8 text-white">
              <div className="badge badge-warning mb-4">PREMIUM</div>
              <h2 className="card-title text-3xl justify-center mb-4">Gold Membership</h2>
              <div className="text-4xl font-bold mb-6">₹599<span className="text-lg text-white/70">/month</span></div>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Chat with other users
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Blue Tick verification
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  300 connection requests per day
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  6 months validity
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Priority support
                </li>
              </ul>
              
              <motion.button
                className="btn btn-warning btn-lg w-full"
                onClick={() => handleBuyClick("gold")}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Buy Gold"
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="alert alert-error mt-8 max-w-md mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Premium