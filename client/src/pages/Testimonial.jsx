import React from 'react'
import Title from '../components/Title'
import { FaStar } from 'react-icons/fa'
import user1 from "../assets/testimonials/user1.png"
import user2 from "../assets/testimonials/user2.png"
import user3 from "../assets/testimonials/user3.png"

const Testimonial = () => {
    const testimonials = [
        {
            name: "Hà béo",
            date: "22 Jan 2025",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            image: user1,
        },
        {
            name: "Thu Hà",
            date: "10 Mar 2025",
            message: "Fantastic experience overall. Support was helpful and the delivery time was impressive. Highly recommended.",
            image: user2,
        },
        {
            name: "Hà Trần",
            date: "14 Feb 2025",
            message: "This service completely exceeded my expectations. The process was smooth and the result outstanding!",
            image: user3,
        }
    ]

    return (
        <div className='max-padd-container py-16 pt-28 bg-primary'>
            <Title
                title1={"People"}
                title2={"Says"}
                titleStyles={"pb-10"}
                para={'Real stories from our happy customers sharing their experience, style inspiration, and trusted feedback on what they love.'}
            />
            
            <div className='flex flex-wrap gap-6 justify-center pb-12'>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='bg-white w-full max-w-[422px] space-y-4 p-5 border border-gray-300/60 text-gray-500 text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={16} className='text-[#ff532e]' />
                                ))}
                            </div>
                            <p className='text-gray-400 text-xs'>{testimonial.date}</p>
                        </div>
                        <p className='leading-6'>{testimonial.message}</p>
                        <div className='flex items-center gap-3 pt-2'>
                            <img src={testimonial.image} alt={testimonial.name} className='h-10 w-10 rounded-full object-cover' />
                            <p className='font-medium text-gray-700'>{testimonial.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial