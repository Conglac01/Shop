import React, { useState } from 'react'

const ProductDescription = () => {
    const [activeTab, setActiveTab] = useState('description')

    return (
        <div className='mt-14 bg-white rounded-lg p-6 shadow-sm'>
            {/* Tab Buttons */}
            <div className='flex gap-3 border-b border-gray-200 pb-2'>
                <button 
                    onClick={() => setActiveTab('description')}
                    className={`medium-14 p-3 w-32 transition-all relative ${
                        activeTab === 'description' 
                            ? 'text-secondary font-bold after:content-[""] after:absolute after:left-0 after:-bottom-2.5 after:w-full after:h-0.5 after:bg-secondary' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Description
                </button>
                <button 
                    onClick={() => setActiveTab('color')}
                    className={`medium-14 p-3 w-32 transition-all relative ${
                        activeTab === 'color' 
                            ? 'text-secondary font-bold after:content-[""] after:absolute after:left-0 after:-bottom-2.5 after:w-full after:h-0.5 after:bg-secondary' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Color Guide
                </button>
                <button 
                    onClick={() => setActiveTab('size')}
                    className={`medium-14 p-3 w-32 transition-all relative ${
                        activeTab === 'size' 
                            ? 'text-secondary font-bold after:content-[""] after:absolute after:left-0 after:-bottom-2.5 after:w-full after:h-0.5 after:bg-secondary' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Size Guide
                </button>
            </div>

            {/* Content based on active tab */}
            <div className="mt-6">
                {activeTab === 'description' && (
                    <div className="space-y-4">
                        <h5 className="h5 font-semibold text-gray-800">Details</h5>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dicta adipisci nihil deserunt delectus? Dignissimos, numquam eum, voluptates reiciendis ipsa maxime enim quasi praesentium est totam neque dolores quam.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatem magni cupiditate in voluptates non ea.
                        </p>
                        
                        <div className="mt-6">
                            <h5 className="h5 font-semibold text-gray-800 mb-3">Benefits</h5>
                            <ul className='list-disc pl-5 text-gray-600 space-y-2'>
                                <li>High-quality materials ensure long-lasting durability and comfort.</li>
                                <li>Designed to meet the needs of modern, active lifestyles.</li>
                                <li>Available in a wide range of colors and trendy styles.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'color' && (
                    <div className="text-gray-600">
                        <h5 className="h5 font-semibold text-gray-800 mb-3">Color Guide</h5>
                        <p>Available colors: Black, White, Navy Blue, Gray, Burgundy</p>
                        <div className="flex gap-3 mt-4">
                            <div className="w-8 h-8 rounded-full bg-black cursor-pointer hover:scale-110 transition"></div>
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-300 cursor-pointer hover:scale-110 transition"></div>
                            <div className="w-8 h-8 rounded-full bg-blue-900 cursor-pointer hover:scale-110 transition"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-500 cursor-pointer hover:scale-110 transition"></div>
                            <div className="w-8 h-8 rounded-full bg-red-800 cursor-pointer hover:scale-110 transition"></div>
                        </div>
                    </div>
                )}

                {activeTab === 'size' && (
                    <div className="text-gray-600">
                        <h5 className="h5 font-semibold text-gray-800 mb-3">Size Guide</h5>
                        <p>Available sizes: S, M, L, XL, XXL</p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Size</th>
                                        <th className="py-2">Chest (cm)</th>
                                        <th className="py-2">Length (cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td className="py-2">S</td>
                                        <td>86-91</td>
                                        <td>68</td>
                                    </tr>
                                    <tr className="text-center">
                                        <td className="py-2">M</td>
                                        <td>91-96</td>
                                        <td>70</td>
                                    </tr>
                                    <tr className="text-center">
                                        <td className="py-2">L</td>
                                        <td>96-101</td>
                                        <td>72</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDescription