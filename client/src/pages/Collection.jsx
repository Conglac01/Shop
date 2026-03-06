import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'

const Collection = () => {
  const { products, searchQuery } = useContext(ShopContext)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currPage, setCurrPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = products
      
      // Lọc theo searchQuery
      if (searchQuery?.length > 0) {
        filtered = products.filter((product) => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Lọc theo inStock
      filtered = filtered.filter(product => product.inStock === true)
      
      setFilteredProducts(filtered)
      setCurrPage(1)
    }
  }, [products, searchQuery])

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currPage])

  // Tính toán phân trang
  const indexOfLastItem = currPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className='max-padd-container py-16 pt-28'>
      <Title 
        title1="All" 
        title2="Products" 
        titleStyles="pb-10" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredProducts.length > 0 ? (
          currentItems.map((product) => (
            <Item key={product._id} product={product} />
          ))
        ) : (
          <h4 className='h4 text-red-500 col-span-full text-center py-10'>
            Oops! Nothing matched your search
          </h4>
        )}
      </div>

      
      {/* Pagination */}
{totalPages > 1 && (
  <div className='flex items-center justify-center gap-4 mt-12'>
    <button
      disabled={currPage === 1}
      onClick={() => setCurrPage((prev) => prev - 1)}
      className={`px-3 py-1.5 text-sm border rounded transition ${
        currPage === 1 
          ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      Previous
    </button>

    <div className='flex items-center gap-3'>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrPage(index + 1)}
          className={`text-sm transition ${
            currPage === index + 1
              ? 'text-black font-bold'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      disabled={currPage === totalPages}
      onClick={() => setCurrPage((prev) => prev + 1)}
      className={`px-2 py-0.5 text-sm border rounded transition ${
        currPage === totalPages
          ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      Next
    </button>
  </div>
)}
    </div>
  )
}

export default Collection