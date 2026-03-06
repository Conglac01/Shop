import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const CartTotal = () => {
    const { currency, getCartAmount, getCartCount, delivery_charges } = useContext(ShopContext)
    const location = useLocation()
    const isOrderPage = location.pathname.includes('place-order')

    const subtotal = getCartAmount()
    const tax = (subtotal * 2) / 100
 

    return (
        <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-24'>
            {/* Header */}
            <div className='flex items-center justify-between mb-5'>
                <h3 className='text-xl font-bold text-gray-800'>
                    Order Summary
                </h3>
                <span className='bg-secondary/10 text-secondary text-sm font-medium px-3 py-1 rounded-full'>
                    {getCartCount()} {getCartCount() === 1 ? 'Item' : 'Items'}
                </span>
            </div>
            
            <hr className='border-gray-200 mb-5' />

            {/* Price Details */}
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h5 className='text-gray-600'>Subtotal</h5>
                    <p className='font-semibold text-gray-800'>
                        {currency}{subtotal.toFixed(2)}
                    </p>
                </div>

                <div className='flex justify-between items-center'>
                    <h5 className='text-gray-600'>Shipping Fee</h5>
                    <p className='font-semibold text-gray-800'>
                        {subtotal === 0 ? (
                            <span className='text-gray-400'>$0.00</span>
                        ) : (
                            `${currency}${delivery_charges}.00`
                        )}
                    </p>
                </div>

                <div className='flex justify-between items-center'>
                    <h5 className='text-gray-600'>Tax (2%)</h5>
                    <p className='font-semibold text-gray-800'>
                        {currency}{tax.toFixed(2)}
                    </p>
                </div>

                <hr className='border-gray-200 my-4' />

                {/* Total Amount */}
                <div className='flex justify-between items-center'>
                    <h4 className='text-lg font-bold text-gray-800'>Total Amount</h4>
                    <p className='text-xl font-bold text-secondary'>
                        {subtotal === 0 ? (
                            `${currency}0.00`
                        ) : (
                            `${currency}${total.toFixed(2)}`
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal