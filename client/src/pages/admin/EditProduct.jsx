import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { BiSave, BiArrowBack, BiImageAdd, BiX } from 'react-icons/bi';
import toast from 'react-hot-toast';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { axios, fetchProducts, products } = useContext(ShopContext); // Thêm products từ context
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        offerPrice: '',
        category: 'Men',
        description: '',
        sizes: [],
        inStock: true,
        stock: 0,
        image: []
    });

    const categories = ['Men', 'Women', 'Kids', 'Footwear', 'Winterwear', 'Sportswear'];
    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Kiểm tra nếu ID không phải ObjectId hợp lệ (24 ký tự hex)
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        
        if (!isValidObjectId) {
            // Nếu là dummy data, tìm trong products context
            const dummyProduct = products.find(p => p._id === id);
            if (dummyProduct) {
                setFormData({
                    ...dummyProduct,
                    price: dummyProduct.price?.toString() || '',
                    offerPrice: dummyProduct.offerPrice?.toString() || '',
                    image: dummyProduct.image || []
                });
                setLoading(false);
            } else {
                toast.error('Invalid product ID');
                navigate('/admin/list');
            }
        } else {
            // Nếu là ObjectId hợp lệ, gọi API
            fetchProduct();
        }
    }, [id, products]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/product/single', { productId: id });
            
            if (data.success) {
                setFormData({
                    ...data.product,
                    image: data.product.image || [],
                    price: data.product.price?.toString() || '',
                    offerPrice: data.product.offerPrice?.toString() || ''
                });
            } else {
                toast.error(data.message || 'Failed to fetch product');
                navigate('/admin/list');
            }
        } catch (error) {
            toast.error('Error fetching product details');
            console.error(error);
            navigate('/admin/list');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSizeToggle = (size) => {
        setFormData(prev => {
            const currentSizes = prev.sizes || [];
            const newSizes = currentSizes.includes(size)
                ? currentSizes.filter(s => s !== size)
                : [...currentSizes, size];
            return { ...prev, sizes: newSizes };
        });
    };

    const handleAddImage = () => {
        if (imageUrl && imageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                image: [...(prev.image || []), imageUrl.trim()]
            }));
            setImageUrl('');
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.category) {
            toast.error('Please fill in required fields');
            return;
        }

        if (formData.sizes.length === 0) {
            toast.error('Please select at least one size');
            return;
        }

        setSubmitting(true);

        try {
            // Kiểm tra lại ID trước khi submit
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
            
            if (!isValidObjectId) {
                // Nếu là dummy data, chỉ thông báo thành công giả
                toast.success('Product updated successfully (Demo)');
                fetchProducts();
                navigate('/admin/list');
                return;
            }

            const { data } = await axios.put(`/api/product/${id}`, formData);
            
            if (data.success) {
                toast.success('Product updated successfully');
                fetchProducts();
                navigate('/admin/list');
            } else {
                toast.error(data.message || 'Failed to update product');
            }
        } catch (error) {
            toast.error('Error updating product');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Edit Product</h2>
                <button
                    onClick={() => navigate('/admin/list')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                    <BiArrowBack size={20} />
                    Back to List
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Price ($) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Offer Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="offerPrice"
                                    value={formData.offerPrice}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                placeholder="0"
                                min="0"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-400"
                                id="inStock"
                            />
                            <label htmlFor="inStock" className="text-gray-700">
                                In Stock
                            </label>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Sizes <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSizeToggle(size)}
                                        className={`w-12 h-12 rounded-lg font-medium transition ${
                                            (formData.sizes || []).includes(size)
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Images
                    </label>
                    
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                            placeholder="Enter image URL"
                        />
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition"
                        >
                            <BiImageAdd size={20} />
                            Add
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(formData.image || []).map((img, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <BiX size={16} />
                                </button>
                            </div>
                        ))}
                        
                        {(!formData.image || formData.image.length === 0) && (
                            <div className="col-span-4 text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-400">No images added yet</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 transition ${
                            submitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {submitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <BiSave size={20} />
                                Update Product
                            </>
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/admin/list')}
                        className="flex items-center gap-2 bg-gray-100 text-gray-600 px-8 py-3 rounded-xl hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;