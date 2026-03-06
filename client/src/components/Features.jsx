import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia"
import { MdCurrencyExchange } from "react-icons/md"
import { BiSupport } from "react-icons/bi"
import { TbPackageImport } from "react-icons/tb"

const Features = () => {
  return (
    <section className="max-padd-container py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Free Shipping */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary p-4 rounded-full mb-4">
            <LiaShippingFastSolid className="text-3xl text-tertiary" />
          </div>
          <h5 className="bold-18 mb-2">Free Shipping</h5>
          <p className="text-gray-30 text-sm">On above $100 order</p>
        </div>

        {/* Member Discount */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary p-4 rounded-full mb-4">
            <MdCurrencyExchange className="text-3xl text-tertiary" />
          </div>
          <h5 className="bold-18 mb-2">Member Discount</h5>
          <p className="text-gray-30 text-sm">Discount for elite Members</p>
        </div>

        {/* 24/7 Support */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary p-4 rounded-full mb-4">
            <BiSupport className="text-3xl text-tertiary" />
          </div>
          <h5 className="bold-18 mb-2">24/7 Support</h5>
          <p className="text-gray-30 text-sm">24/7 Customer support</p>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary p-4 rounded-full mb-4">
            <TbPackageImport className="text-3xl text-tertiary" />
          </div>
          <h5 className="bold-18 mb-2">Secure Payment</h5>
          <p className="text-gray-30 text-sm">100% secure</p>
        </div>
      </div>
    </section>
  )
}

export default Features