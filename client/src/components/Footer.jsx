import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='pt-16 pb-6 mt-16 border-t border-white'> {/* Thêm border-t border-white/20 */}
      <div className='max-padd-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
        
        {/* Column 1 - Logo & Description */}
        <div className='space-y-4'>
          <Link to='/' className='bold-22 uppercase font-pacifico text-black inline-block'>
            SHOP<span className='text-secondary'>.</span>
          </Link>
          <p className='text-gray-30 text-sm leading-6 max-w-[300px]'>
            Discover stylish clothing and shoes online, crafted for comfort and quality. Shop fashion-forward designs that elevate your look and fit every lifestyle.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className='space-y-4'>
          <h4 className='font-bold text-lg'>
            Quick Links
          </h4>
          <ul className='space-y-3'>
            <li><Link to='/' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Home</Link></li>
            <li><Link to='/collection' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Best Sellers</Link></li>
            <li><Link to='/offers' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Offers & Deals</Link></li>
            <li><Link to='/contact' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3 - Need Help */}
        <div className='space-y-4'>
          <h4 className='font-bold text-lg'>
            Need Help?
          </h4>
          <ul className='space-y-3'>
            <li><Link to='/delivery' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Delivery Information</Link></li>
            <li><Link to='/returns' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Return & Refund Policy</Link></li>
            <li><Link to='/payment' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Payment Methods</Link></li>
            <li><Link to='/track-order' className='text-gray-30 hover:text-black transition-colors text-sm flex items-center gap-2'><span className='w-1 h-1 bg-secondary rounded-full'></span>Track your Order</Link></li>
          </ul>
        </div>

        {/* Column 4 - Follow Us */}
        <div className='space-y-4'>
          <h4 className='font-bold text-lg'>
            Follow Us
          </h4>
          <div className='flex gap-3 mt-4'>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' 
               className='bg-white p-3 rounded-full text-gray-30 hover:text-black hover:bg-gray-100 transition-all shadow-sm hover:shadow-md'>
              <FaInstagram size={18} />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'
               className='bg-white p-3 rounded-full text-gray-30 hover:text-black hover:bg-gray-100 transition-all shadow-sm hover:shadow-md'>
              <FaTwitter size={18} />
            </a>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'
               className='bg-white p-3 rounded-full text-gray-30 hover:text-black hover:bg-gray-100 transition-all shadow-sm hover:shadow-md'>
              <FaFacebookF size={18} />
            </a>
            <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'
               className='bg-white p-3 rounded-full text-gray-30 hover:text-black hover:bg-gray-100 transition-all shadow-sm hover:shadow-md'>
              <FaYoutube size={18} />
            </a>
          </div>
          <p className='text-gray-30 text-sm mt-4'>
            Follow us on social media for latest updates and offers
          </p>
        </div>
      </div>

      
      {/* Bottom Bar */}
        <div className='max-padd-container mt-12 pt-6 border-t border-gray-200'>
          <p className='text-center text-gray-30 text-sm'>
           © {new Date().getFullYear()} SHOP. All rights reserved.
         </p>
      </div>
    </footer>
  )
}

export default Footer