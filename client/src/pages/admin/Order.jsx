import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiPackage, BiCalendar } from "react-icons/bi";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const Orders = () => {
  const navigate = useNavigate();
  const { axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log("📢 Fetching orders...");
      
      const { data } = await axios.post("/api/order/list", {}, {
        withCredentials: true
      });
      
      console.log("📦 API Response:", data);
      
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(search.toLowerCase()) ||
                         order.userId?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "text-green-600 bg-green-100";
      case "Processing": return "text-yellow-600 bg-yellow-100";
      case "Shipped": return "text-blue-600 bg-blue-100";
      case "Order Placed": return "text-purple-600 bg-purple-100";
      case "Cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-400 text-sm">Manage customer orders</p>
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg outline-none focus:border-pink-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="relative">
            <BiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order..."
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-pink-400"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="py-3">Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium flex items-center gap-2">
                  <BiPackage className="text-gray-500" />
                  <span className="font-mono text-sm">{order._id?.slice(-8) || 'N/A'}</span>
                </td>
                <td>{order.userId?.name || 'N/A'}</td>
                <td className="flex items-center gap-1">
                  <BiCalendar className="text-gray-400" />
                  {formatDate(order.createdAt)}
                </td>
                <td className="font-semibold">${order.amount?.toFixed(2) || '0.00'}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No orders found
        </div>
      )}
    </div>
  );
};

export default Orders;