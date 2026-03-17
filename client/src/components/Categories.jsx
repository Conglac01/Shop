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

            <div className="
                flex
                flex-wrap
                justify-center
                gap-x-14
                gap-y-12
                max-w-[1100px]
                mx-auto
            ">

                {categories.map((cat) => (

                    <div
                        key={cat.name}
                        onClick={() => navigate(`/collection/${cat.name.toLowerCase()}`)}
                        className="
                            flexCenter flex-col
                            cursor-pointer
                            group
                            w-[180px]
                            hover:scale-105
                            transition
                        "
                    >

                        {/* IMAGE */}
                        <div className="
                            relative
                            w-[180px] h-[180px]
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
                            mt-5
                            text-[14px]
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