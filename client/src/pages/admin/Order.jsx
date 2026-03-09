import React, { useState } from 'react';
import { BiSearch, BiFilter, BiPackage, BiUser, BiPhone, BiMap, BiCalendar, BiDollar, BiCreditCard } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';

// Dữ liệu mẫu cho đơn hàng
const sampleOrders = [
    {
        id: "ORD-685b7c899d1094925488b3e",
        customer: {
            name: "user one",
            phone: "(555) 123-4567",
            address: "123 main street, Springfield, CA, USA, 12345"
        },
        payment: {
            status: "Done",
            method: "stripe",
            amount: 50.8
        },
        date: new Date("2025-06-25"),
        items: [
            {
                name: "Classic Striped Button Down Shirt For Formal Office Wear",
                price: 10,
                quantity: 2,
                size: "S"
            },
            {
                name: "Trendy Floral Printed Casual Shirt With Slim Fit Cut",
                price: 20,
                quantity: 1,
                size: "XL"
            }
        ],
        status: "Delivered"
    },
    {
        id: "ORD-785c8d899d2095925488c4f",
        customer: {
            name: "user two",
            phone: "(555) 987-6543",
            address: "456 oak avenue, Riverside, NY, USA, 67890"
        },
        payment: {
            status: "Pending",
            method: "cod",
            amount: 125.5
        },
        date: new Date("2025-06-26"),
        items: [
            {
                name: "Slim Fit Denim Jeans for Men",
                price: 59,
                quantity: 1,
                size: "32"
            },
            {
                name: "Men's Casual Hoodie with Front Pocket",
                price: 49,
                quantity: 2,
                size: "L"
            },
            {
                name: "Women's Floral Print Summer Dress",
                price: 49,
                quantity: 1,
                size: "M"
            }
        ],
        status: "Processing"
    },
    {
        id: "ORD-885d9e011e3096926599d5g",
        customer: {
            name: "user three",
            phone: "(555) 456-7890",
            address: "789 pine street, Denver, CO, USA, 54321"
        },
        payment: {
            status: "Done",
            method: "stripe",
            amount: 89.99
        },
        date: new Date("2025-06-24"),
        items: [
            {
                name: "Women's Elegant Evening Gown",
                price: 179,
                quantity: 1,
                size: "S"
            },
            {
                name: "Women's High-Waist Skinny Jeans",
                price: 54,
                quantity: 1,
                size: "28"
            }
        ],
        status: "Shipped"
    }
];

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Lọc đơn hàng theo tìm kiếm và trạng thái
    const filteredOrders = sampleOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'bg-green-100 text-green-600';
            case 'Shipped': return 'bg-blue-100 text-blue-600';
            case 'Processing': return 'bg-yellow-100 text-yellow-600';
            case 'Cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch(method) {
            case 'stripe': return <BiCreditCard className="text-blue-500" />;
            case 'cod': return <BiDollar className="text-green-500" />;
            default: return <BiDollar />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage customer orders</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none w-full md:w-80"
                    />
                </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                <BiFilter className="text-gray-400" size={20} />
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                            statusFilter === status
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                        {/* Order Header */}
                        <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <BiPackage className="text-pink-500" size={24} />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm text-gray-500">Order ID:</span>
                                        <span className="font-semibold text-gray-800">{order.id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-sm text-gray-400">|</span>
                                        <span className="text-sm text-gray-500">
                                            <BiCalendar className="inline mr-1" size={14} />
                                            {order.date.toDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">Total Amount</div>
                                    <div className="font-bold text-lg text-pink-500">${order.payment.amount}</div>
                                </div>
                                <button 
                                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm"
                                >
                                    {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                                </button>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                    <BiUser className="text-gray-400 mt-1" size={18} />
                                    <div>
                                        <div className="text-xs text-gray-400">Customer</div>
                                        <div className="font-medium text-gray-800">{order.customer.name}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BiPhone className="text-gray-400 mt-1" size={18} />
                                    <div>
                                        <div className="text-xs text-gray-400">Phone</div>
                                        <div className="font-medium text-gray-800">{order.customer.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 md:col-span-2">
                                    <BiMap className="text-gray-400 mt-1" size={18} />
                                    <div>
                                        <div className="text-xs text-gray-400">Address</div>
                                        <div className="font-medium text-gray-800">{order.customer.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="px-4 pb-4 bg-white">
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                {getPaymentMethodIcon(order.payment.method)}
                                <span className="text-sm text-gray-600">
                                    Payment Status: <span className={`font-medium ${order.payment.status === 'Done' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order.payment.status}
                                    </span>
                                </span>
                                <span className="text-sm text-gray-400">|</span>
                                <span className="text-sm text-gray-600">
                                    Method: <span className="font-medium capitalize">{order.payment.method}</span>
                                </span>
                            </div>
                        </div>

                        {/* Order Items (Expandable) */}
                        {selectedOrder === order.id && (
                            <div className="border-t border-gray-200 bg-gray-50 p-4">
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <FiShoppingBag />
                                    Order Items
                                </h4>
                                <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 bg-white rounded-lg">
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800">{item.name}</div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">Size: {item.size}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                                <span className="font-semibold text-pink-500">${item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No orders found</p>
                    <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            )}

            {/* Pagination */}
            {filteredOrders.length > 0 && (
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

export default Orders;