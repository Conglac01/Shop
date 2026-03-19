import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { BiTrash, BiBlock } from "react-icons/bi";
import toast from "react-hot-toast";

const Users = () => {
  const { axios } = useContext(ShopContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/users", {
        withCredentials: true
      });
      
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || "Error loading users");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const { data } = await axios.delete(`/api/admin/user/${id}`, {
        withCredentials: true
      });
      if (data.success) {
        toast.success("User deleted");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const blockUser = async (id) => {
    try {
      const { data } = await axios.post(`/api/admin/block/${id}`, {}, {
        withCredentials: true
      });
      if (data.success) {
        toast.success(data.message);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Error blocking user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      
      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No users found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Cart Items</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    {Object.keys(user.cartData || {}).length}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.isBlocked 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-3 flex gap-2">
                    <button
                      onClick={() => blockUser(user._id)}
                      className={`p-2 rounded ${
                        user.isBlocked 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                    >
                      <BiBlock size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <BiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;