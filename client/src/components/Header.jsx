import React, { useState, useContext, useEffect } from 'react'  // Thêm useEffect
import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { FaSearch, FaShoppingBasket } from "react-icons/fa"
import { FaBars, FaBarsStaggered } from "react-icons/fa6"
import { RiUserLine } from "react-icons/ri"
import userImg from '../assets/user.png'
import { ShopContext } from '../context/ShopContext'

const Header = () => {
    const { user, setUser, navigate, searchQuery, setSearchQuery, setShowUserLogin , getCartCount} = useContext(ShopContext)
    const location = useLocation()
    const [menuOpened, setMenuOpened] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    
    const isHomepage = location.pathname === "/"
    const isCollectionPage = location.pathname.includes('/collection')  // Thêm dòng này

    const toggleMenu = () => setMenuOpened((prev) => !prev)

    useEffect(() => {
        if (searchQuery?.length > 0 && !isCollectionPage) {  // Thêm optional chaining
            navigate('/collection');
        }
    }, [searchQuery, isCollectionPage, navigate]);

    return (
        <>
            {/* Background riêng - full width */}
            {!isHomepage && (
                <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-primary via-white to-primary h-[72px] z-40" />
            )}
            
            {/* Header content - có padding nhưng background trong suốt */}
            <header className="absolute top-0 left-0 w-full z-50">
                <div className="max-padd-container flexBetween py-2">
                    {/* Logo */}
                    <Link to="/" className="bold-22 uppercase font-pacifico">
                        Shop <span className="text-secondary bold-28">.</span>
                    </Link>

                    {/* Navbar */}
                    <Navbar 
                        setMenuOpened={setMenuOpened} 
                        containerStyles={menuOpened ? 
                            "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-6 bg-white shadow-xl w-56 ring-1 ring-slate-900/10 z-50 rounded-lg" : 
                            "hidden lg:flex items-center justify-center flex-1 gap-x-12 xl:gap-x-16"
                        } 
                    />

                    {/* Icons & Search */}
                    <div className="flex gap-8 items-center">
                        {/* Search Bar - Desktop */}
                        <div className="relative hidden xl:flex">
                            <div className={`${showSearch ? 'flex rounded-full bg-white w-[333px] p-3.5 pl-6' : 'hidden'} ${!isHomepage ? 'bg-primary' : ''} items-center gap-3`}>
                                <input 
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery || ''}  // Thêm value để kiểm soát input
                                    type="text" 
                                    placeholder="Type here..." 
                                    className="bg-transparent w-full outline-none text-[14px]" 
                                />
                                <FaSearch className="text-xl cursor-pointer" onClick={() => setShowSearch(false)} />
                            </div>
                            <div onClick={() => setShowSearch((prev) => !prev)} 
                                className={`cursor-pointer bg-tertiary text-white rounded-full p-2.5 text-sm m-1 ${showSearch ? 'absolute top-0 right-0' : ''}`}>
                                <FaSearch className="text-xl" />
                            </div>
                        </div>

                        {/* Cart Icon */}
                        <div onClick={() => navigate('/cart')} className="flex gap-2 items-center cursor-pointer p-2 rounded-full bg-white relative">
                            <FaShoppingBasket size={27} />
                            <label className="absolute bottom-8 -right-2 text-xs font-bold bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center">{getCartCount}</label>
                        </div>

                        {/* User Profile */}
                        <div className="group relative">
                            {user ? (
                                <div className="flex gap-2 items-center cursor-pointer rounded-full bg-white">
                                    <img src={userImg} alt="user" height={44} width={44} className="rounded-full" />
                                </div>
                            ) : (
                                <button onClick={() => setShowUserLogin(true)} className="btn-dark flexCenter gap-x-2 rounded-full">
                                    Login
                                    <RiUserLine className="text-xl" />
                                </button>
                            )}
                            
                            {/* Dropdown Menu */}
                            {user && (
                                <ul className="bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
                                    <li onClick={() => navigate('/my-orders')} className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer">
                                        Orders
                                    </li>
                                    <li onClick={() => setUser(null)} className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer">
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden">
                            {menuOpened ? (
                                <FaBarsStaggered onClick={toggleMenu} className="cursor-pointer text-xl" />
                            ) : (
                                <FaBars onClick={toggleMenu} className="cursor-pointer text-xl" />
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header