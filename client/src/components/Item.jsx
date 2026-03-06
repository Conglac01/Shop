import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Item = ({ product }) => {
    const { navigate, addToCart } = useContext(ShopContext)
    const [hovered, setHovered] = useState(false)
    const [btnHovered, setBtnHovered] = useState(false)

    const handleClick = () => {
        navigate(`/collection/${product.category.toLowerCase()}/${product._id}`)
        window.scrollTo(0, 0)
    }

    const handleAddToCart = (e) => {
        e.stopPropagation()
        navigate(`/collection/${product.category.toLowerCase()}/${product._id}`)
        window.scrollTo(0, 0)
    }

    return (
        <div 
            className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
            onClick={handleClick}
        >
            {/* Image */}
            <div 
                className='relative bg-[#f5f5f5] h-[220px] overflow-hidden'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img 
                    src={product.image.length > 1 && hovered ? product.image[1] : product.image[0]} 
                    alt={product.name}
                    className='w-full h-full object-cover'
                />
            </div>
            
            {/* Info */}
            <div className='p-1' onClick={(e) => e.stopPropagation()}>
                <h4 className='font-bold text-sm line-clamp-1 uppercase text-black'>
                    {product.name}
                </h4>
                <p className='text-sm text-gray-30 line-clamp-1 mt-1'>
                    {product.description}
                </p>
                
                <div className='flex items-center justify-between mt-3'>
                    <span className='text-sm font-bold text-black uppercase'>
                        {product.category}
                    </span>
                    <div className='flex items-center gap-3'>
                        <span className='font-bold text-lg text-black'>
                            ${product.offerPrice || product.price}
                        </span>
                        <button 
                            onClick={handleAddToCart}
                            onMouseEnter={() => setBtnHovered(true)}
                            onMouseLeave={() => setBtnHovered(false)}
                            className={`bg-black text-white text-sm px-4 py-2 rounded transition-all duration-300 font-medium ${
                                btnHovered ? 'text-yellow-300 scale-105' : ''
                            }`}
                        >
                            Add 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item