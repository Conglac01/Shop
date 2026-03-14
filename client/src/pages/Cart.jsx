import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { TbTruckDelivery, TbArrowBackUp } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, getCartCount, getCartAmount } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])
    const [couponCode, setCouponCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [hoveredBtn, setHoveredBtn] = useState({ id: null, type: null })

    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size]
                        })
                    }
                }
            }
            setCartData(tempData)
        }
    }, [products, cartItems])

    const increment = (id, size) => {
        const newQuantity = (cartItems[id][size] || 0) + 1
        updateQuantity(id, size, newQuantity)
    }

    const decrement = (id, size) => {
        const newQuantity = Math.max((cartItems[id][size] || 0) - 1, 0)
        if (newQuantity === 0) {
            const updatedCart = { ...cartItems }
            delete updatedCart[id][size]
            if (Object.keys(updatedCart[id]).length === 0) {
                delete updatedCart[id]
            }
            updateQuantity(id, size, 0)
        } else {
            updateQuantity(id, size, newQuantity)
        }
    }

    const handleRemoveItem = (id, size) => {
        if (window.confirm('Remove this item from cart?')) {
            const updatedCart = { ...cartItems }
            delete updatedCart[id][size]
            if (Object.keys(updatedCart[id]).length === 0) {
                delete updatedCart[id]
            }
            updateQuantity(id, size, 0)
        }
    }

    const applyCoupon = () => {
        if (couponCode.toLowerCase() === 'save20') {
            setDiscount(0.2)
            alert('Coupon applied successfully! 20% discount')
        } else {
            alert('Invalid coupon code')
        }
    }

    const subtotal = getCartAmount()
    const shipping = subtotal > 500 ? 0 : 1
    const discountAmount = subtotal * discount
    const total = subtotal - discountAmount + shipping

    return (
        <div className='max-padd-container py-16 pt-28'>
            {/* Header */}
            <Title title1={"Shopping"} title2={"Cart"} titleStyles={"pb-5"} />
            <p className='text-gray-500 text-sm max-w-2xl mb-8'>
                Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence.
            </p>

            {cartData.length > 0 ? (
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Left Side - Cart Items */}
                    <div className='lg:w-2/3'>
                        <div className='space-y-4'>
                            {cartData.map((item, i) => {
                                const product = products.find((p) => p._id === item._id)
                                if (!product) return null
                                
                                return (
                                    <div key={i} className='bg-white rounded-lg p-5 shadow-sm border border-gray-100'>
                                        {/* Product Name */}
                                        <h5 className='font-semibold text-base mb-3'>{product.name}</h5>
                                        
                                        <div className='grid grid-cols-3 gap-4 items-center'>
                                            {/* Size */}
                                            <div className='col-span-1'>
                                                <span className='text-sm text-gray-500'>Size:</span>
                                                <span className='ml-2 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm'>
                                                    {item.size}
                                                </span>
                                            </div>
                                            
                                            {/* Quantity with colored buttons */}
                                            <div className='col-span-1 flex items-center gap-3'>
                                                <button
                                                    onClick={() => decrement(item._id, item.size)}
                                                    onMouseEnter={() => setHoveredBtn({ id: item._id + item.size, type: 'minus' })}
                                                    onMouseLeave={() => setHoveredBtn({ id: null, type: null })}
                                                    className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                                                        hoveredBtn.id === item._id + item.size && hoveredBtn.type === 'minus'
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                                                    }`}
                                                >
                                                    <FaMinus className='text-xs' />
                                                </button>
                                                <span className='w-8 text-center font-medium'>{item.quantity}</span>
                                                <button
                                                    onClick={() => increment(item._id, item.size)}
                                                    onMouseEnter={() => setHoveredBtn({ id: item._id + item.size, type: 'plus' })}
                                                    onMouseLeave={() => setHoveredBtn({ id: null, type: null })}
                                                    className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                                                        hoveredBtn.id === item._id + item.size && hoveredBtn.type === 'plus'
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white'
                                                    }`}
                                                >
                                                    <FaPlus className='text-xs' />
                                                </button>
                                            </div>
                                            
                                            {/* Subtotal */}
                                            <div className='col-span-1 flex items-center justify-between'>
                                                <span className='text-sm text-gray-500'>Subtotal:</span>
                                                <span className='font-bold text-secondary'>
                                                    {currency}{product.offerPrice * item.quantity}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Row with Remove Button */}
                                        <div className='flex justify-end mt-3 pt-2 border-t border-gray-100'>
                                            <button
                                                onClick={() => handleRemoveItem(item._id, item.size)}
                                                className='flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors'
                                            >
                                                <FaTrash size={12} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className='lg:w-1/3 flex-1 flex-col'>
                        <div className='max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16'>
                            <h4 className='text-xl font-bold mb-8 pb-4 border-b border-gray-200'>Order Summary</h4>
                            
                            {/* Summary Details */}
                            <div className='space-y-6 mb-8'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal ({getCartCount()} items)</span>
                                    <span className='font-medium'>{currency}{subtotal}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Shipping</span>
                                    {shipping === 0 ? (
                                        <span className='text-green-600 font-medium'>Free</span>
                                    ) : (
                                        <span className='font-medium'>{currency}{shipping}</span>
                                    )}
                                </div>
                                {discount > 0 && (
                                    <div className='flex justify-between text-green-600'>
                                        <span>Discount (20%)</span>
                                        <span className='font-medium'>-{currency}{discountAmount}</span>
                                    </div>
                                )}
                                <div className='flex justify-between font-bold text-lg pt-4 mt-4 border-t border-gray-200'>
                                    <span>Total</span>
                                    <span className='text-secondary'>{currency}{total}</span>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className='mb-8'>
                                <label className='text-sm font-medium text-gray-700 mb-3 block'>
                                    Coupon Code
                                </label>
                                <div className='flex gap-2'>
                                    <input 
                                        type="text" 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter code"
                                        className='flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary text-sm'
                                    />
                                    <button 
                                        onClick={applyCoupon}
                                        className='bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition font-medium text-sm'
                                    >
                                        Apply
                                    </button>
                                </div>
                                <p className='text-xs text-gray-400 mt-3'>Try "SAVE20" for 20% off</p>
                            </div>

                            {/* Checkout Button */}
                            <Link 
                                to='/place-order' 
                                className='block w-full bg-secondary text-white text-center py-5 rounded-xl font-semibold hover:bg-opacity-90 transition-all mb-6'
                            >
                                Proceed to Checkout
                            </Link>

                            {/* Features */}
                            <div className='space-y-4 pt-4 border-t border-gray-200 mt-auto'>
                                <div className='flex items-center gap-3 text-sm text-gray-600'>
                                    <RiSecurePaymentLine className='text-xl text-secondary' />
                                    <span>Secure Payment</span>
                                </div>
                                <div className='flex items-center gap-3 text-sm text-gray-600'>
                                    <TbTruckDelivery className='text-xl text-secondary' />
                                    <span>Free Delivery on orders over $500</span>
                                </div>
                                <div className='flex items-center gap-3 text-sm text-gray-600'>
                                    <TbArrowBackUp className='text-xl text-secondary' />
                                    <span>7 Days Easy Return</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-center py-16 bg-white rounded-lg'>
                    <p className='text-gray-400'>Your cart is empty</p>
                </div>
            )}
        </div>
    )
}

export default Cart