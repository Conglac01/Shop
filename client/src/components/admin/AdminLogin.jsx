import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";

import toast from "react-hot-toast";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin, navigate, axios } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        const { data } = await axios.post(
  "http://localhost:4000/api/admin/login",
  { email, password },
  { withCredentials: true }
);
        if (data.success) {
            setIsAdmin(true);
            navigate('/admin');
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  };

  // nếu đã login -> chuyển trang admin
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  if (isAdmin) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center text-sm text-gray-600 bg-black/50">
      <form
        onSubmit={onSubmitHandler}  // ✅ SỬA: handleSubmit → onSubmitHandler
        className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h3 className="text-2xl font-bold text-center mb-3">
          <span className="text-secondary">Admin</span>{" "}
          {state === "login" ? "Login" : "Register"}
        </h3>

        {state === "register" && (
          <div>
            <p className="text-sm">Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
              required
            />
          </div>
        )}

        <div>
          <p className="text-sm">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>

        <div>
          <p className="text-sm">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type here..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>

        {state === "login" ? (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-secondary cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-secondary cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        )}

        <button type="submit" className="btn-secondary w-full rounded py-2.5">
          {state === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;