import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'
import { useParams } from 'react-router-dom'

const CategoryCollection = () => {
    const { products, searchQuery } = useContext(ShopContext)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const itemsPerPage = 9
    const { category } = useParams()

    useEffect(() => {
        if (!products) return
        
        let result = [...products]

        // Filter by category from URL
        if (category) {
            result = result.filter((product) => 
                product.category.toLowerCase() === category.toLowerCase()
            )
        }

        // Filter by search query
        if (searchQuery && searchQuery.length > 0) {
            result = result.filter((product) => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by stock
        result = result.filter(product => product.inStock === true)

        setFilteredProducts(result)
        setCurrPage(1) // Reset to first page on filter change
    }, [products, searchQuery, category])

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currPage])

    return (
        <div className='max-padd-container py-16 pt-28 bg-primary min-h-screen'>
            <Title 
                title1={"All"} 
                title2={"Products"} 
                titleStyles={"pb-10"} 
            />

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <>
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
                        {currentProducts.map((product) => (
                            <Item key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className='flex items-center justify-center gap-2 mt-12'>
                            <button
                                onClick={() => setCurrPage(prev => Math.max(prev - 1, 1))}
                                disabled={currPage === 1}
                                className={`px-3 py-1 text-sm border rounded-md transition ${
                                    currPage === 1 
                                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrPage(page)}
                                    className={`w-8 h-8 text-sm border rounded-md transition ${
                                        currPage === page
                                            ? 'bg-black text-white border-black'
                                            : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currPage === totalPages}
                                className={`px-3 py-1 text-sm border rounded-md transition ${
                                    currPage === totalPages
                                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className='flex items-center justify-center min-h-[400px]'>
                    <p className='text-gray-400 text-lg'>No products found in this category</p>
                </div>
            )}
        </div>
    )
}

export default CategoryCollection