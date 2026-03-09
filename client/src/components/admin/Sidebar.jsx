import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { BiPlus, BiListUl, BiShoppingBag, BiLogOut } from "react-icons/bi";
import { NavLink, Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  const { navigate, setIsAdmin } = useContext(ShopContext);

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  const navItems = [
    {
      path: "/admin",
      label: "Add Item",
      icon: <BiPlus size={20} />,
    },
    {
      path: "/admin/list",
      label: "List",
      icon: <BiListUl size={20} />,
    },
    {
      path: "/admin/orders",
      label: "Orders",
      icon: <BiShoppingBag size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          {/* LOGO */}
          <Link
            to="/admin"
            className="text-2xl font-bold uppercase font-pacifico"
          >
            SHOP<span className="text-secondary text-3xl">.</span>
          </Link>

          {/* MENU */}
          <div className="mt-8 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
        >
          <BiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;