import React, { useState, useContext } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';
import { ShopContext } from '../../context/ShopContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const { axios } = useContext(ShopContext);
    const [files, setFiles] = useState([null, null, null, null]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("10");
    const [offerPrice, setOfferPrice] = useState("10");
    const [category, setCategory] = useState("Tshirt");
    const [popular, setPopular] = useState(false);
    const [sizes, setSizes] = useState([]);

    const categories = [
        { value: "Tshirt", label: "👕 T-Shirt" },
        { value: "Poloshirt", label: "👔 Polo Shirt" },
        { value: "Windbreaker", label: "🧥 Windbreaker" },
        { value: "Sweatshirt", label: "🧶 Sweatshirt" },
        { value: "Downjacket", label: "🧥 Down Jacket" }
    ];

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const productData = {
                name,
                description,
                category,
                type: category,
                price: Number(price),
                offerPrice: Number(offerPrice),
                sizes,
                popular,
                inStock: true,
                rating: 4.5,
                image: []
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    formData.append('images', files[i]);
                }
            }

            const { data } = await axios.post('/api/product/add', formData);

            if (data.success) {
                toast.success(data.message);
                setName("");
                setDescription("");
                setPrice("10");
                setOfferPrice("10");
                setCategory("Tshirt");
                setPopular(false);
                setSizes([]);
                setFiles([null, null, null, null]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleSizeToggle = (size) => {
        setSizes(prev =>
            prev.includes(size)
                ? prev.filter(item => item !== size)
                : [...prev, size]
        );
    };

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>
            
            <form onSubmit={onSubmitHandler} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Men's Classic Cotton T-Shirt"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category <span className="text-red-400">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none text-gray-700"
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                            Type will be automatically set to: <span className="font-medium text-pink-500">{category}</span>
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your product in detail..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none resize-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Regular Price ($) <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="49.99"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Offer Price ($)
                        </label>
                        <input
                            type="number"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            placeholder="39.99"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Product Sizes
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeToggle(size)}
                                className={`w-14 h-14 rounded-xl font-semibold text-base transition-all duration-200 ${
                                    sizes.includes(size)
                                        ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Product Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                            <label key={index} className="relative group cursor-pointer">
                                <input
                                    onChange={(e) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = e.target.files[0];
                                        setFiles(updatedFiles);
                                    }}
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    className="hidden"
                                />
                                <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-pink-400 transition-all duration-200">
                                    {files[index] ? (
                                        <div className="relative w-full h-full group/image">
                                            <img
                                                src={URL.createObjectURL(files[index])}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const updatedFiles = [...files];
                                                    updatedFiles[index] = null;
                                                    setFiles(updatedFiles);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity"
                                            >
                                                <BiTrash size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-pink-500 transition-colors">
                                            <FiUploadCloud className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-medium">Upload</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 mt-3">
                        Upload up to 4 images (PNG, JPG, WEBP. Max 5MB each)
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={popular}
                            onChange={(e) => setPopular(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                    <span className="text-sm font-medium text-gray-700">
                        Mark as popular product (will appear in featured section)
                    </span>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-10 py-3.5 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition-all shadow-md shadow-pink-200"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;