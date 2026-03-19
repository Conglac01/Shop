import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPackage, BiUser, BiMap, BiCalendar, BiCreditCard, BiPhone, BiEnvelope } from 'react-icons/bi';
import { ShopContext } from '../../context/ShopContext';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/order/${id}`, {
        withCredentials: true
      });
      
      if (data.success) {
        setOrder(data.order);
        setSelectedStatus(data.order.status);
      } else {
        toast.error('Order not found');
        navigate('/admin/orders');
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error('Failed to load order');
      navigate('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const { data } = await axios.post("/api/order/status", {
        orderId: id,
        status: newStatus
      }, {
        withCredentials: true
      });
      
      if (data.success) {
        toast.success(`Order ${newStatus === 'Cancelled' ? 'cancelled' : 'status updated'} successfully`);
        setOrder(prev => ({ ...prev, status: newStatus }));
        setSelectedStatus(newStatus);
        setShowCancelConfirm(false);
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    handleStatusUpdate('Cancelled');
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Invalid Date') {
      return 'N/A';
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        <button
          onClick={() => navigate('/admin/orders')}
          className="text-pink-500 hover:underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'Processing': return 'bg-yellow-100 text-yellow-600';
      case 'Shipped': return 'bg-blue-100 text-blue-600';
      case 'Order Placed': return 'bg-purple-100 text-purple-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <button
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-6"
      >
        <BiArrowBack /> Back to orders
      </button>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-xl font-bold mb-4">Cancel Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                disabled={updating}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {updating ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <p className="text-gray-400 text-sm">Order ID: {order._id}</p>
          <p className="text-gray-400 text-sm mt-1">Placed on: {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg outline-none focus:border-pink-400"
            disabled={updating || order.status === 'Cancelled' || order.status === 'Delivered'}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled" disabled={order.status === 'Cancelled'}>Cancelled</option>
          </select>
          {selectedStatus !== order.status && selectedStatus !== 'Cancelled' && (
            <button
              onClick={() => handleStatusUpdate(selectedStatus)}
              disabled={updating}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Status'}
            </button>
          )}
          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
            <button
              onClick={handleCancelOrder}
              disabled={updating}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BiUser /> Customer Information
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <BiUser className="text-gray-400" />
              <span className="text-gray-500">Name:</span> 
              <span className="font-medium">{order.address?.name || order.userId?.name || 'N/A'}</span>
            </p>
            <p className="flex items-center gap-2">
              <BiEnvelope className="text-gray-400" />
              <span className="text-gray-500">Email:</span> 
              <span className="font-medium">{order.userId?.email || order.customerDetails?.email || 'N/A'}</span>
            </p>
            <p className="flex items-center gap-2">
              <BiPhone className="text-gray-400" />
              <span className="text-gray-500">Phone:</span> 
              <span className="font-medium">{order.address?.phone || 'N/A'}</span>
            </p>
            <p className="flex items-start gap-2">
              <BiMap className="text-gray-400 mt-1" />
              <span>
                <span className="text-gray-500">Address:</span><br />
                <span className="font-medium">{order.address?.name || 'N/A'}</span><br />
                <span className="font-medium">{order.address?.city || 'N/A'}</span>
              </span>
            </p>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BiCreditCard /> Payment Information
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Method:</span>{' '}
              <span className="font-medium capitalize">{order.paymentMethod || 'Stripe'}</span>
            </p>
            <p>
              <span className="text-gray-500">Status:</span>{' '}
              <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.paymentStatus || 'Pending'}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Amount:</span>{' '}
              <span className="font-bold text-pink-500">${order.amount?.toFixed(2)}</span>
            </p>
            {order.sessionId && (
              <p className="text-xs text-gray-400 mt-2">
                Stripe Session: {order.sessionId}
              </p>
            )}
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
              {order.items?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50?text=Product';
                          }}
                        />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{item.size}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4 font-semibold text-pink-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan="4" className="text-right py-4 px-4">Total:</td>
                <td className="py-4 px-4 text-pink-500 text-lg">${order.amount?.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Order Timeline</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <span>•</span>
          <span>{formatDate(order.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;