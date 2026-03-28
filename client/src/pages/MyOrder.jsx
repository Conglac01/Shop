import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { BiPackage, BiTime, BiCheckCircle, BiXCircle, BiLoader } from 'react-icons/bi'
import toast from 'react-hot-toast'

const MyOrders = () => {
    const { currency, user, axios } = useContext(ShopContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const loadOrderData = async () => {
        if (!user) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            console.log("📢 Fetching user orders...")
            
            // ✅ SỬA: Không gửi userId trong body, auth middleware sẽ tự lấy từ token
            const { data } = await axios.post("/api/order/user-orders", {}, {
                withCredentials: true
            })

            console.log("✅ Orders response:", data)

            if (data.success) {
                setOrders(data.orders)
            } else {
                toast.error(data.message || "Failed to load orders")
            }
        } catch (error) {
            console.error("❌ Error loading orders:", error)
            toast.error(error.response?.data?.message || "Error loading orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [user])

    const getStatusIcon = (status) => {
        switch(status) {
            case "Delivered": return <BiCheckCircle className="text-green-500 text-xl" />
            case "Processing": return <BiLoader className="text-yellow-500 text-xl animate-spin" />
            case "Shipped": return <BiPackage className="text-blue-500 text-xl" />
            case "Order Placed": return <BiTime className="text-purple-500 text-xl" />
            case "Cancelled": return <BiXCircle className="text-red-500 text-xl" />
            default: return <BiPackage className="text-gray-500 text-xl" />
        }
    }

    const getStatusColor = (status) => {
        switch(status) {
            case "Delivered": return "bg-green-100 text-green-700"
            case "Processing": return "bg-yellow-100 text-yellow-700"
            case "Shipped": return "bg-blue-100 text-blue-700"
            case "Order Placed": return "bg-purple-100 text-purple-700"
            case "Cancelled": return "bg-red-100 text-red-700"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className='max-padd-container py-16 pt-28 bg-primary min-h-screen flex justify-center items-center'>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading your orders...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className='max-padd-container py-16 pt-28 bg-primary min-h-screen'>
                <Title title1={"My Orders"} title2={"List"} titleStyles={"pb-10"} />
                <div className="bg-white rounded-xl p-8 text-center">
                    <BiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Please login to view your orders</h3>
                    <p className="text-gray-500 mb-6">You need to be logged in to see your order history</p>
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className='bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition'
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='max-padd-container py-16 pt-28 bg-primary min-h-screen'>
            <Title 
                title1={"My Orders"} 
                title2={"List"} 
                titleStyles={"pb-10"} 
            />

            {orders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                    <BiPackage className="text-8xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet</p>
                    <button 
                        onClick={() => window.location.href = '/collection'} 
                        className='bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition'
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className='space-y-6'>
                    {orders.map((order) => (
                        <div key={order._id} className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition'>
                            {/* Order Header */}
                            <div className='flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200'>
                                <div className='flex items-center gap-3'>
                                    {getStatusIcon(order.status)}
                                    <div>
                                        <h4 className='font-semibold text-gray-800'>Order #{order._id.slice(-8)}</h4>
                                        <p className='text-xs text-gray-500'>{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Products List */}
                            <div className='space-y-4'>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className='flex flex-col sm:flex-row gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-pink-50 p-2 rounded-lg transition'>
                                        <img 
                                            src={item.image || "https://via.placeholder.com/100"} 
                                            alt={item.name} 
                                            className='w-24 h-24 object-cover rounded-lg border border-gray-200'
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/100?text=Product"
                                            }}
                                        />
                                        <div className='flex-1'>
                                            <h5 className='font-semibold text-gray-800'>{item.name}</h5>
                                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3'>
                                                <div>
                                                    <h5 className='text-xs text-gray-500'>Price</h5>
                                                    <p className='font-medium text-pink-500'>{currency}{item.price}</p>
                                                </div>
                                                <div>
                                                    <h5 className='text-xs text-gray-500'>Quantity</h5>
                                                    <p className='font-medium text-gray-700'>{item.quantity}</p>
                                                </div>
                                                <div>
                                                    <h5 className='text-xs text-gray-500'>Size</h5>
                                                    <p className='font-medium text-gray-700'>{item.size}</p>
                                                </div>
                                                <div>
                                                    <h5 className='text-xs text-gray-500'>Subtotal</h5>
                                                    <p className='font-medium text-pink-500'>{currency}{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className='mt-6 pt-4 border-t border-gray-200'>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                    <div className='bg-pink-50 p-3 rounded-lg border border-pink-100'>
                                        <h5 className='text-xs text-gray-500 mb-1'>Payment Method</h5>
                                        <p className='text-sm font-medium text-pink-600 capitalize'>{order.paymentMethod}</p>
                                    </div>
                                    <div className='bg-pink-50 p-3 rounded-lg border border-pink-100'>
                                        <h5 className='text-xs text-gray-500 mb-1'>Payment Status</h5>
                                        <p className={`text-sm font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {order.paymentStatus || 'Pending'}
                                        </p>
                                    </div>
                                    <div className='bg-pink-50 p-3 rounded-lg border border-pink-100 col-span-2'>
                                        <h5 className='text-xs text-gray-500 mb-1'>Shipping Address</h5>
                                        <p className='text-sm text-gray-700'>
                                            {order.address?.name || 'N/A'}, {order.address?.city || 'N/A'}, {order.address?.phone || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100'>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-pink-500/10 px-4 py-2 rounded-lg border border-pink-200'>
                                            <h5 className='text-xs text-gray-500'>Total Amount</h5>
                                            <p className='font-bold text-pink-500 text-xl'>{currency}{order.amount}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <button 
                                            onClick={() => window.location.href = `/order-tracking/${order._id}`} 
                                            className='bg-pink-500 text-white px-6 py-2.5 text-sm rounded-lg hover:bg-pink-600 transition-all shadow-sm hover:shadow'
                                        >
                                            Track Order
                                        </button>
                                        <button 
                                            onClick={() => window.location.href = `/order-details/${order._id}`} 
                                            className='bg-gray-100 text-gray-700 px-6 py-2.5 text-sm rounded-lg hover:bg-gray-200 transition-all'
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyOrders