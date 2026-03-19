import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { BiSearch, BiFilter, BiEdit, BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";

const ProductList = () => {
    const navigate = useNavigate();
    const { products, axios, fetchProducts } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const categories = ['All', 'Tshirt', 'Poloshirt', 'Windbreaker', 'Sweatshirt', 'Downjacket'];

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'Tshirt': return '👕';
            case 'Poloshirt': return '👔';
            case 'Windbreaker': return '🧥';
            case 'Sweatshirt': return '🧶';
            case 'Downjacket': return '🧥';
            default: return '🏷️';
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const { data } = await axios.delete(`/api/product/${productId}`);
                if (data.success) {
                    toast.success('Product deleted successfully');
                    fetchProducts();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Error deleting product');
                console.error(error);
            }
        }
    };

    const handleEdit = (productId) => {
        navigate(`/admin/edit/${productId}`);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your products</p>
                </div>
                
                <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none w-full md:w-80"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                <BiFilter className="text-gray-400" size={20} />
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex items-center gap-1 ${
                            selectedCategory === cat
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat !== 'All' && getCategoryIcon(cat)} {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                    >
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img
                                src={product.image?.[0] || '/placeholder-image.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                                }}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button 
                                    onClick={() => handleEdit(product._id)}
                                    className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition group"
                                    title="Edit product"
                                >
                                    <BiEdit size={16} className="text-gray-600 group-hover:text-pink-500" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(product._id)}
                                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition group"
                                    title="Delete product"
                                >
                                    <BiTrash size={16} className="text-red-500 group-hover:text-red-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                                {product.name}
                            </h3>
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full flex items-center gap-1">
                                    {getCategoryIcon(product.category)} {product.category}
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

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No products found</p>
                    <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-lg transition ${
                            currentPage === 1
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg transition ${
                                currentPage === page
                                    ? 'bg-pink-500 text-white'
                                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-lg transition ${
                            currentPage === totalPages
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;