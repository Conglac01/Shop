import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiPackage, BiCalendar, BiFilter } from "react-icons/bi";

const sampleOrders = [
  {
    id: "ORD-685b7c899d1094925488b3e",
    customer: "user one",
    amount: 50.8,
    date: "2025-06-25",
    status: "Delivered"
  },
  {
    id: "ORD-785c8d899d2095925488c4f",
    customer: "user two",
    amount: 125.5,
    date: "2025-06-26",
    status: "Processing"
  },
  {
    id: "ORD-885d9e011e3096926599d5g",
    customer: "user three",
    amount: 89.99,
    date: "2025-06-24",
    status: "Shipped"
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Processing", "Shipped", "Delivered"];

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                         order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-600 bg-green-100";
    if (status === "Processing") return "text-yellow-600 bg-yellow-100";
    if (status === "Shipped") return "text-blue-600 bg-blue-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-400 text-sm">Manage customer orders</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg outline-none focus:border-pink-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Search */}
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

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="py-3">Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium flex items-center gap-2">
                  <BiPackage className="text-gray-500" />
                  <span className="font-mono text-sm">{order.id.slice(0, 8)}...</span>
                </td>
                <td>{order.customer}</td>
                <td className="flex items-center gap-1">
                  <BiCalendar className="text-gray-400" />
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="font-semibold">${order.amount.toFixed(2)}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
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

      {/* EMPTY */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No orders found
        </div>
      )}
    </div>
  );
};

export default Orders;