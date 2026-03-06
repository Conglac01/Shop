import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'

const PlaceOrder = () => {
    const { navigate, cartItems, setCartItems, products } = useContext(ShopContext)
    const [method, setMethod] = useState("COD")
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        e.preventDefault()
        try {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        // Xử lý đặt hàng ở đây
        console.log('Order placed:', { formData, method })
    }

    return (
        <div className='max-padd-container py-16 pt-28'>
            {/* Container */}
            <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-12'>
                {/* LEFT SIDE - Delivery Information */}
                <div className='flex-1'>
                    <Title title1={"Delivery"} title2={"Information"} titleStyles={"pb-5"} />
                    
                    <div className='space-y-4'>
                        {/* Name Fields */}
                        <div className='flex gap-3'>
                            <input 
                                onChange={onChangeHandler} 
                                value={formData.firstName} 
                                type="text" 
                                name='firstName' 
                                placeholder='First Name' 
                                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                                required
                            />
                            <input 
                                onChange={onChangeHandler} 
                                value={formData.lastName} 
                                type="text" 
                                name='lastName' 
                                placeholder='Last Name' 
                                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                                required
                            />
                        </div>

                        {/* Email */}
                        <input 
                            onChange={onChangeHandler} 
                            value={formData.email} 
                            type="email" 
                            name='email' 
                            placeholder='Email' 
                            className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                            required
                        />

                        {/* Phone */}
                        <input 
                            onChange={onChangeHandler} 
                            value={formData.phone} 
                            type="tel" 
                            name='phone' 
                            placeholder='Phone Number' 
                            className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                            required
                        />

                        {/* Street Address */}
                        <input 
                            onChange={onChangeHandler} 
                            value={formData.street} 
                            type="text" 
                            name='street' 
                            placeholder='Street Address' 
                            className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                            required
                        />

                        {/* City and State */}
                        <div className='flex gap-3'>
                            <input 
                                onChange={onChangeHandler} 
                                value={formData.city} 
                                type="text" 
                                name='city' 
                                placeholder='City' 
                                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                                required
                            />
                            <input 
                                onChange={onChangeHandler} 
                                value={formData.state} 
                                type="text" 
                                name='state' 
                                placeholder='State' 
                                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary'
                                required
                            />
                        </div>

                        
                    </div>
                </div>

                {/* RIGHT SIDE - Payment Method and Cart Total */}
                <div className='lg:w-1/3'>
                    {/* Cart Total Component */}
                    <CartTotal />
                    
                    {/* Payment Method */}
                    <div className='mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
                        <h4 className='font-semibold text-gray-800 mb-4'>
                            Payment <span className='text-secondary'>Method</span>
                        </h4>
                        
                        <div className='space-y-3'>
                            {/* COD Option */}
                            <div 
                                onClick={() => setMethod('COD')} 
                                className={`w-full px-4 py-3 text-sm rounded-xl cursor-pointer transition-all duration-200 border ${
                                    method === 'COD' 
                                        ? 'bg-secondary text-white border-secondary' 
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-secondary hover:bg-gray-50'
                                }`}
                            >
                                <div className='flex items-center justify-between'>
                                    <span>Cash on Delivery</span>
                                    {method === 'COD' && (
                                        <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>Selected</span>
                                    )}
                                </div>
                            </div>

                            {/* Stripe Option */}
                            <div 
                                onClick={() => setMethod('stripe')} 
                                className={`w-full px-4 py-3 text-sm rounded-xl cursor-pointer transition-all duration-200 border ${
                                    method === 'stripe' 
                                        ? 'bg-secondary text-white border-secondary' 
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-secondary hover:bg-gray-50'
                                }`}
                            >
                                <div className='flex items-center justify-between'>
                                    <span>Credit / Debit Card (Stripe)</span>
                                    {method === 'stripe' && (
                                        <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>Selected</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button 
                        type="submit"
                        className='w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all mt-6 shadow-md'
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder