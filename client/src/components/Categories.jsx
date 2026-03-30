import React, { useContext } from 'react'
import Title from './Title'
import { categories } from '../assets/data.js'
import { ShopContext } from '../context/ShopContext'

const Categories = () => {

    const { navigate } = useContext(ShopContext)

    return (
        <section className="max-padd-container pt-16 text-center">

            <Title
                title1="Category"
                title2="List"
                titleStyles="pb-12"
                paraStyles="hidden"
            />

            {/* RESPONSIVE: Mobile xuống dòng, desktop cuộn ngang */}
            <div className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:flex
                md:flex-nowrap
                md:overflow-x-auto
                justify-items-center
                gap-x-8
                gap-y-10
                max-w-[1100px]
                mx-auto
                md:pb-4
                md:no-scrollbar
            ">

                {categories.map((cat) => (

                    <div
                        key={cat.name}
                        onClick={() => navigate(`/collection/${cat.name.toLowerCase()}`)}
                        className="
                            flexCenter flex-col
                            cursor-pointer
                            group
                            w-[140px]
                            sm:w-[160px]
                            md:w-[180px]
                            md:flex-shrink-0
                            hover:scale-105
                            transition
                        "
                    >

                        {/* IMAGE */}
                        <div className="
                            relative
                            w-[140px] h-[140px]
                            sm:w-[160px] sm:h-[160px]
                            md:w-[180px] md:h-[180px]
                            flexCenter
                            rounded-full
                            bg-gray-100
                            shadow-sm
                            group-hover:shadow-xl
                            transition-all duration-300
                            overflow-hidden
                        ">

                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="
                                    w-[70%]
                                    object-contain
                                    transition duration-300
                                    group-hover:scale-110
                                "
                            />

                            <div className="
                                absolute inset-0
                                bg-black/0
                                group-hover:bg-black/5
                                transition
                            " />

                        </div>

                        {/* TEXT */}
                        <h5 className="
                            mt-4
                            text-[12px]
                            sm:text-[14px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-gray-600
                            group-hover:text-black
                            group-hover:tracking-wider
                            transition-all duration-300
                        ">
                            {cat.name}
                        </h5>

                    </div>

                ))}

            </div>

        </section>
    )
}

export default Categories