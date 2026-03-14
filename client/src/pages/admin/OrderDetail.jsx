import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPackage, BiUser, BiPhone, BiMap, BiCalendar, BiDollar, BiCreditCard } from 'react-icons/bi';

// Dữ liệu mẫu (sau này sẽ thay bằng API)
const sampleOrders = [
  {
    id: "ORD-685b7c899d1094925488b3e",
    customer: {
      name: "user one",
      phone: "(555) 123-4567",
      address: "123 main street, Springfield, CA, USA, 12345"
    },
    items: [
      {
        name: "Classic Striped Button Down Shirt For Formal Office Wear",
        price: 45,
        quantity: 2,
        size: "S"
      }
    ],
    amount: 50.8,
    date: "2025-06-25",
    status: "Delivered",
    paymentMethod: "stripe",
    isPaid: true
  },
  {
    id: "ORD-785c8d899d2095925488c4f",
    customer: {
      name: "user two",
      phone: "(555) 987-6543",
      address: "456 oak avenue, Riverside, NY, USA, 67890"
    },
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
      }
    ],
    amount: 125.5,
    date: "2025-06-26",
    status: "Processing",
    paymentMethod: "cod",
    isPaid: false
  },
  {
    id: "ORD-885d9e011e3096926599d5g",
    customer: {
      name: "user three",
      phone: "(555) 456-7890",
      address: "789 pine street, Denver, CO, USA, 54321"
    },
    items: [
      {
        name: "Women's Elegant Evening Gown",
        price: 179,
        quantity: 1,
        size: "S"
      }
    ],
    amount: 89.99,
    date: "2025-06-24",
    status: "Shipped",
    paymentMethod: "stripe",
    isPaid: true
  }
];

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tìm đơn hàng theo ID
    const foundOrder = sampleOrders.find(o => o.id === id);
    setOrder(foundOrder);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order not found</h2>
        <p className="text-gray-500 mb-4">The order you're looking for doesn't exist</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="text-pink-500 hover:underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Back button */}
      <button
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-6"
      >
        <BiArrowBack /> Back to orders
      </button>

      {/* Order Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <p className="text-gray-400 text-sm">Order ID: {order.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          {order.status}
        </span>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BiUser /> Customer Information
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> {order.customer.name}</p>
            <p><span className="text-gray-500">Phone:</span> {order.customer.phone}</p>
            <p className="flex items-start gap-2">
              <BiMap className="text-gray-400 mt-1" />
              <span>{order.customer.address}</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BiCreditCard /> Payment Information
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Method:</span>{' '}
              <span className="capitalize">{order.paymentMethod}</span>
            </p>
            <p>
              <span className="text-gray-500">Status:</span>{' '}
              <span className={order.isPaid ? 'text-green-600' : 'text-yellow-600'}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Date:</span> {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <BiPackage /> Order Items
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.size}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4 font-semibold">
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan="4" className="text-right py-4 px-4">Total:</td>
                <td className="py-4 px-4 text-pink-500">${order.amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;