import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia"
import { MdCurrencyExchange } from "react-icons/md"
import { BiSupport } from "react-icons/bi"
import { TbPackageImport } from "react-icons/tb"

const Features = () => {

  const features = [
    {
      icon: <LiaShippingFastSolid />,
      title: "Free Shipping",
      desc: "On above $100 order"
    },
    {
      icon: <MdCurrencyExchange />,
      title: "Member Discount",
      desc: "Discount for elite Members"
    },
    {
      icon: <BiSupport />,
      title: "24/7 Support",
      desc: "Customer support anytime"
    },
    {
      icon: <TbPackageImport />,
      title: "Secure Payment",
      desc: "100% secure payment"
    }
  ]

  return (

    <section className="max-padd-container py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {features.map((item, index) => (

          <div
            key={index}
            className="
            flex flex-col items-center text-center
            bg-white
            rounded-xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition
            duration-300
            "
          >

            <div className="
            bg-primary
            p-4
            rounded-full
            mb-4
            text-3xl
            text-tertiary
            group-hover:scale-110
            transition
            ">
              {item.icon}
            </div>

            <h5 className="bold-18 mb-2">
              {item.title}
            </h5>

            <p className="text-gray-30 text-sm">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Features