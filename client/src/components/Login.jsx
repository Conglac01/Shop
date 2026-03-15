import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Login = () => {

    const { setShowUserLogin, navigate, axios, setUser } = useContext(ShopContext)

    const [state, setState] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (event) => {

        event.preventDefault()
        setLoading(true)

        try {

            if (state === "register") {

                const { data } = await axios.post("/api/user/register", {
                    name,
                    email,
                    password
                })

                if (data.success) {
                    setUser(data.user)
                    setShowUserLogin(false)
                    toast.success('Registration successful!')
                    navigate("/")
                } else {
                    toast.error(data.message || 'Registration failed')
                }

            } else {

                const { data } = await axios.post("/api/user/login", {
                    email,
                    password
                })

                if (data.success) {
                    setUser(data.user)
                    setShowUserLogin(false)
                    toast.success('Login successful!')
                    navigate("/")
                } else {
                    toast.error(data.message || 'Login failed')
                }

            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }

    }

    return (
        <div 
            onClick={() => setShowUserLogin(false)}
            className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center text-sm text-gray-600 bg-black/60 backdrop-blur-sm'
        >
            <form 
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className='relative flex flex-col gap-5 m-auto items-start p-8 py-10 w-80 sm:w-[400px] rounded-2xl shadow-2xl border border-gray-100 bg-white'
            >
                
                <button 
                    type="button"
                    onClick={() => setShowUserLogin(false)}
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                >
                    <FaTimes size={20} />
                </button>

                <div className='w-full text-center mb-2'>
                    <h3 className='text-2xl font-bold'>
                        <span className='text-secondary'>User </span>
                        <span className='text-gray-800'>{state === 'login' ? 'Login' : 'Register'}</span>
                    </h3>
                    <p className='text-xs text-gray-400 mt-1'>
                        {state === 'login' ? 'Welcome back!' : 'Create your account'}
                    </p>
                </div>
                
                {state === 'register' && (
                    <div className='w-full'>
                        <label className='text-xs font-medium text-gray-500 mb-1 block'>Full Name</label>
                        <input 
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='John Doe'
                            className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none'
                            required
                        />
                    </div>
                )}
                
                <div className='w-full'>
                    <label className='text-xs font-medium text-gray-500 mb-1 block'>Email Address</label>
                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='you@example.com'
                        className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none'
                        required
                    />
                </div>
                
                <div className='w-full'>
                    <label className='text-xs font-medium text-gray-500 mb-1 block'>Password</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='••••••••'
                        className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none'
                        required
                    />
                </div>
                
                <div className='w-full text-center mt-2'>
                    {state === 'register' ? (
                        <p className='text-sm text-gray-500'>
                            Already have account?{' '}
                            <button
                                type="button"
                                onClick={() => setState('login')}
                                className='text-secondary font-medium hover:underline'
                            >
                                Sign in
                            </button>
                        </p>
                    ) : (
                        <p className='text-sm text-gray-500'>
                            New here?{' '}
                            <button
                                type="button"
                                onClick={() => setState('register')}
                                className='text-secondary font-medium hover:underline'
                            >
                                Create account
                            </button>
                        </p>
                    )}
                </div>
                
                <button 
                    type='submit'
                    disabled={loading}
                    className={`w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 mt-2 shadow-md hover:shadow-lg ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Processing...' : (state === 'register' ? 'Create Account' : 'Sign In')}
                </button>

                {state === 'login' && (
                    <button
                        type="button"
                        className='text-xs text-gray-400 hover:text-secondary transition-colors mx-auto'
                    >
                        Forgot password?
                    </button>
                )}
            </form>
        </div>
    )
}

export default Login