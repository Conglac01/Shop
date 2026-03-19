import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin, navigate, axios } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post("/api/admin/login", { email, password }, {
        withCredentials: true
      });
      
      if (data.success) {
        setIsAdmin(true);
        toast.success(data.message);
        navigate('/admin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  if (isAdmin) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center text-sm text-gray-600 bg-black/50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 p-8 py-12 w-full max-w-md sm:w-[400px] md:w-[450px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h3 className="text-2xl font-bold text-center mb-3">
          <span className="text-secondary">Admin</span> Login
        </h3>

        <div>
          <p className="text-sm font-medium">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>

        <div>
          <p className="text-sm font-medium">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-secondary text-white w-full rounded py-2.5 font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;