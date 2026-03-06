import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams, Link } from 'react-router-dom'
import { TbStarFilled, TbShoppingBagPlus, TbHeart } from 'react-icons/tb'
import { FaTruckFast } from 'react-icons/fa6'
import ProductDescription from '../components/ProductDescription' 
import ProductFeatures from '../components/ProductFeatures'
import RelatedProducts from '../components/RelatedProducts' 

const ProductDetails = () => {
    const { products, currency, addToCart } = useContext(ShopContext)
    const { id } = useParams()
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const product = products.find((item) => item._id === id)

    if (product && !image) {
        setImage(product.image[0])
    }

    const handleAddToCart = () => {
        if (!size) {
            // Bạn có thể thêm toast error ở đây nếu có
            alert("Please select a size first")
            return
        }
        
        setIsClicked(true)
        addToCart(product._id, size)
        
        // Reset sau 300ms
        setTimeout(() => {
            setIsClicked(false)
        }, 300)
    }

    return product ? (
        <div className='max-padd-container py-16 pt-28 bg-primary'>
            {/* Breadcrumb */}
            <div className='text-sm breadcrumbs text-gray-500 mb-6'>
                <Link to='/' className='hover:text-black'>Home</Link> /
                <Link to='/collection' className='hover:text-black ml-1'>Collection</Link> /
                <Link to={`/collection/${product.category}`} className='hover:text-black ml-1'>{product.category}</Link> /
                <span className='text-secondary ml-1'>{product.name}</span>
            </div>

            <div className='flex flex-col lg:flex-row gap-12'>
                {/* Image Section */}
                <div className='flex-1 flex flex-col-reverse lg:flex-row gap-5'>
                    {/* Thumbnail Images */}
                    <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible'>
                        {product.image.map((item, i) => (
                            <div key={i} className='w-16 h-16 flex-shrink-0 cursor-pointer'>
                                <img 
                                    src={item} 
                                    alt={`productImg${i}`} 
                                    className='w-full h-full object-cover rounded'
                                    onClick={() => setImage(item)}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Main Image */}
                    <div className='flex-1'>
                        <img src={image} alt='productImg' className='w-full h-auto object-cover rounded-lg' />
                    </div>
                </div>

                {/* Product Info Section */}
                <div className='flex-1 space-y-6'>
                    <h3 className='h3 font-bold'>{product.name}</h3>
                    
                    {/* Rating */}
                    <div className='flex items-center gap-2'>
                        <div className='flex text-[#ff532e]'>
                            <TbStarFilled />
                            <TbStarFilled />
                            <TbStarFilled />
                            <TbStarFilled />
                            <TbStarFilled />
                        </div>
                        <p className='text-gray-500 text-sm'>(22 reviews)</p>
                    </div>

                    {/* Price */}
                    <div className='flex items-center gap-4'>
                        <h3 className='h3 font-bold text-secondary'>{currency}{product.price}.00</h3>
                        <h4 className='h4 text-gray-400 line-through'>{currency}{product.price}.00</h4>
                    </div>

                    {/* Description */}
                    <p className='max-w-[555px] text-gray-600'>{product.description}</p>

                    {/* Size Selection */}
                    <div className='space-y-3'>
                        <h5 className='font-medium'>Select Size</h5>
                        <div className='flex gap-2 flex-wrap'>
                            {product.sizes?.sort((a, b) => {
                                const order = ["S", "M", "L", "XL", "XXL"]
                                return order.indexOf(a) - order.indexOf(b)
                            }).map((item, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setSize(item)}
                                    className={`medium-14 h-8 w-10 bg-primary rounded transition-all ${
                                        item === size 
                                            ? 'bg-red-300 text-white ring-2 ring-red-300'
                                            : 'bg-primary ring-1 ring-slate-900/10 hover:ring-slate-900/20'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center gap-4 pt-4'>
                        <button 
                            onClick={handleAddToCart}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isClicked 
                                    ? 'bg-green-600 text-white scale-95' 
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            {isClicked ? 'Added!' : 'Add to Cart'} 
                            <TbShoppingBagPlus className='text-lg' />
                        </button>
                        <button className='btn-outline p-3 rounded-full'>
                            <TbHeart className='text-xl' />
                        </button>
                    </div>

                    {/* Delivery Info */}
                    <div className='flex items-center gap-2 mt-1'>
                        <FaTruckFast className='text-lg text-secondary' />
                        <span className='medium-14 text-gray-600'>Free Delivery on orders over 500$</span>
                    </div>

                    <hr className='my-1 w-2/3 border-gray-200' />

                    {/* Additional Info */}
                    <div className='space-y-2 text-sm text-gray-600'>
                        <p>✓ AUTHENTIC YOU CAN TRUST</p>
                        <p>✓ Enjoy CASH ON DELIVERY FOR YOUR CONVENIENCE</p>
                        <p>✓ EASY RETURNS AND EXCHANGES WITHIN 7 DAYS</p>
                    </div>
                </div>
            </div>

            {/* Product Description Component */}
            <ProductDescription />

            {/* Product Features Component */}
            <ProductFeatures />

            {/* Related Products */}
            <div className='mt-20'>
                <h3 className='h3 font-bold mb-8'>Related Products</h3>
                <RelatedProducts product={product} id={id}/>
            </div>
        </div>
    ) : null
}

export default ProductDetails