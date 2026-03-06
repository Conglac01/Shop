import React from 'react'
import { FaEnvelope, FaHeadphones, FaLocationDot, FaPhone } from 'react-icons/fa6'

const Contact = () => {
    return (
        <div className="max-padd-container py-20">
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Form Section - Bên trái */}
                <div className="flex-1">
                    <h2 className="h2 font-bold mb-3">Get in Touch</h2>
                    <p className="text-gray-30 text-sm mb-10 max-w-md leading-relaxed">
                        Have questions or need help? Send us a message, and we'll get back to you as soon as possible.
                    </p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full py-3 px-4 border border-gray-200 rounded-sm regular-14 bg-white focus:outline-none focus:border-secondary"
                            />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full py-3 px-4 border border-gray-200 rounded-sm regular-14 bg-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <textarea
                            rows="5"
                            placeholder="Write your message here"
                            className="w-full py-3 px-4 border border-gray-200 rounded-sm regular-14 bg-white focus:outline-none focus:border-secondary resize-none"
                        />
                        <button
                            type="submit"
                            className="btn-dark px-8 py-3 rounded-sm"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Details Section - Bên phải */}
                <div className="flex-1">
                    <h3 className="h3 font-bold mb-3">Contact Details</h3>
                    <p className="text-gray-30 text-sm mb-10 max-w-md leading-relaxed">
                        We are always here to assist you! Feel free to reach out to us through any of the following methods
                    </p>
                    
                    <div className="space-y-8">
                        <div>
                            <h5 className="font-semibold mb-2">Location:</h5>
                            <p className="text-gray-30 text-sm flex items-start gap-2">
                                <FaLocationDot className="text-secondary mt-1 flex-shrink-0" />
                                <span>Khương Trung-Thanh Xuân-Hà Nội</span>
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-2">Email:</h5>
                            <p className="text-gray-30 text-sm flex items-center gap-2">
                                <FaEnvelope className="text-secondary" />
                                <span>Habeoshop@gmail.com</span>
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-2">Phone:</h5>
                            <p className="text-gray-30 text-sm flex items-center gap-2">
                                <FaPhone className="text-secondary" />
                                <span>0123456789</span>
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-2">Support:</h5>
                            <p className="text-gray-30 text-sm flex items-center gap-2">
                                <FaHeadphones className="text-secondary" />
                                <span>24/7 Support is open</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact