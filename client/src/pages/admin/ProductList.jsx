import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { BiSearch, BiFilter, BiEdit, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const { products } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Lọc sản phẩm theo tìm kiếm và category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Danh sách category để lọc
    const categories = ['All', 'Men', 'Women', 'Kids', 'Footwear', 'Winterwear', 'Sportswear'];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your products</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none w-full md:w-80"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                <BiFilter className="text-gray-400" size={20} />
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                            selectedCategory === cat
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                    >
                        {/* Product Image */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img
                                src={product.image?.[0] || '/placeholder-image.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition">
                                    <BiEdit size={16} className="text-gray-600" />
                                </button>
                                <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition">
                                    <BiTrash size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                                {product.name}
                            </h3>
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                <span className="font-bold text-lg text-gray-800">
                                    ${product.offerPrice || product.price}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    {product.sizes?.length || 0} sizes
                                </span>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                    product.inStock 
                                        ? 'bg-green-50 text-green-600' 
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No products found</p>
                    <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                        Previous
                    </button>
                    <button className="w-10 h-10 bg-pink-500 text-white rounded-lg">1</button>
                    <button className="w-10 h-10 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">2</button>
                    <button className="w-10 h-10 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">3</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;