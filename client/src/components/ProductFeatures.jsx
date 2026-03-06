import React from 'react'
import { TbArrowBackUp, TbTruckDelivery } from 'react-icons/tb'
import { RiSecurePaymentLine } from "react-icons/ri"

const ProductFeatures = () => {
  return (
    <div className='mt-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Easy Return */}
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-4xl mb-4'>
            <TbArrowBackUp className='text-red-500' />
          </div>
          <h4 className='h4 capitalize font-bold mb-3'>Easy Return</h4>
          <p className='text-gray-600 text-sm leading-relaxed'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.
          </p>
        </div>

        {/* Fast Delivery */}
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-4xl mb-4'>
            <TbTruckDelivery className='text-yellow-500' />
          </div>
          <h4 className='h4 capitalize font-bold mb-3'>Fast Delivery</h4>
          <p className='text-gray-600 text-sm leading-relaxed'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.
          </p>
        </div>

        {/* Secure Payment */}
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-4xl mb-4'>
            <RiSecurePaymentLine className='text-blue-500' />
          </div>
          <h4 className='h4 capitalize font-bold mb-3'>Secure Payment</h4>
          <p className='text-gray-600 text-sm leading-relaxed'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductFeatures