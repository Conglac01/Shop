import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { dummyOrders } from "../assets/data";

const MyOrders = () => {
    const { currency, user } = useContext(ShopContext)
    const [orders, setOrders] = useState([])

    const loadOrderData = async () => {
        setOrders(dummyOrders)
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        <div className='max-padd-container py-16 pt-28 bg-primary min-h-screen'>
            <Title 
                title1={"My Orders"} 
                title2={"List"} 
                titleStyles={"pb-10"} 
            />

            <div className='space-y-6'>
                {orders.map((order) => (
                    <div key={order._id} className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
                        {/* Products List */}
                        <div className='space-y-4'>
                            {order.items.map((item, idx) => (
                                <div key={idx} className='flex flex-col sm:flex-row gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0'>
                                    {/* Product Image */}
                                    <img 
                                        src={item.product?.image[0]} 
                                        alt={item.product?.name} 
                                        className='w-24 h-24 object-cover rounded-lg'
                                    />
                                    
                                    {/* Product Details */}
                                    <div className='flex-1'>
                                        <h5 className='font-semibold text-gray-800'>{item.product?.name}</h5>
                                        
                                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3'>
                                            <div>
                                                <h5 className='text-xs text-gray-500'>Price</h5>
                                                <p className='font-medium text-secondary'>${item.product?.offerPrice}</p>
                                            </div>
                                            <div>
                                                <h5 className='text-xs text-gray-500'>Quantity</h5>
                                                <p className='font-medium text-gray-700'>{item.quantity}</p>
                                            </div>
                                            <div>
                                                <h5 className='text-xs text-gray-500'>Size</h5>
                                                <p className='font-medium text-gray-700'>{item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className='mt-6 pt-4 border-t border-gray-200'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                {/* Order ID */}
                                <div>
                                    <h5 className='text-xs text-gray-500'>Order ID</h5>
                                    <p className='text-xs text-gray-400 break-all'>{order._id}</p>
                                </div>

                                {/* Payment Status */}
                                <div>
                                    <h5 className='text-xs text-gray-500'>Payment Status</h5>
                                    <p className={`text-sm font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order.isPaid ? 'Done' : 'Pending'}
                                    </p>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h5 className='text-xs text-gray-500'>Method</h5>
                                    <p className='text-sm text-gray-600'>{order.paymentMethod}</p>
                                </div>

                                {/* Date */}
                                <div>
                                    <h5 className='text-xs text-gray-500'>Date</h5>
                                    <p className='text-sm text-gray-600'>{new Date(order.createdAt).toDateString()}</p>
                                </div>
                            </div>

                            {/* Amount and Status */}
                            <div className='flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100'>
                                <div className='flex items-center gap-4'>
                                    <div>
                                        <h5 className='text-xs text-gray-500'>Total Amount</h5>
                                        <p className='font-bold text-secondary'>${order.amount}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h5 className='text-xs text-gray-500'>Status:</h5>
                                        <span className='text-[#007bff] font-medium'>{order.status}</span>
                                    </div>
                                </div>

                                {/* Track Order Button */}
                                <button 
                                    onClick={() => {}} 
                                    className='btn-secondary py-2 px-6 text-xs rounded-lg hover:bg-opacity-90 transition-all'
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders