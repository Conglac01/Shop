import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyProducts } from '../assets/data.js'
import toast from "react-hot-toast"

const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
    const delivery_charges =0 
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [cartItems, setCartItems] = useState({})  // SỬA: đúng tên
    const [isAdmin, setIsAdmin] = useState(false)
    //fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // Add Product to the Cart
    const addToCart = async (itemId, size) => {
        if(!size) return toast.error("Please select a size first")
        let cartData = structuredClone(cartItems)  // SỬA: dùng cartItems
        cartData[itemId] = cartData[itemId] || {}
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
        setCartItems(cartData)  
        toast.success("Product added to Cart")
    }

    // Get Cart Count
const getCartCount = () => {
    let count = 0
    for (const itemId in cartItems) {
        for(const size in cartItems[itemId]) {
            count += cartItems[itemId][size]
        }
    }
    return count
}
    // Update Cart Quantity
const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)
    toast.success("Cart Updated")
}
// Get Cart Amount
const getCartAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
        const product = products.find((p) => p._id === itemId)
        if(!product) continue;
        for(const size in cartItems[itemId]) {
            total += product.offerPrice * cartItems[itemId][size]
        }
    }
    return total
}

    const value = {
        navigate,
        user,
        setUser,
        products,
        searchQuery,
        setSearchQuery,
        currency,
        showUserLogin,
        setShowUserLogin,
        cartItems,     
        setCartItems,  
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        isAdmin,
        setIsAdmin,
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export { ShopContext, ShopContextProvider }