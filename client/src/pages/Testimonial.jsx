import React from "react";
import Title from "../components/Title";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

import user1 from "../assets/testimonials/user1.png";
import user2 from "../assets/testimonials/user2.png";
import user3 from "../assets/testimonials/user3.png";

const Testimonial = () => {

  const testimonials = [
    {
      name: "Hà béo",
      job: "Web Designer",
      date: "22 Jan 2025",
      rating: 5,
      verified: true,
      message:
        "The quality of the products exceeded my expectations. Everything arrived on time and the customer service was amazing!",
      image: user1,
    },
    {
      name: "Thu Hà",
      job: "Marketing Specialist",
      date: "10 Mar 2025",
      rating: 5,
      verified: true,
      message:
        "Fantastic experience overall. The delivery was super fast and the support team answered all my questions quickly.",
      image: user2,
    },
    {
      name: "Hà Trần",
      job: "Content Creator",
      date: "14 Feb 2025",
      rating: 4,
      verified: true,
      message:
        "I love the design and the quality. Definitely one of the best shopping experiences I've had recently.",
      image: user3,
    },
  ];

  return (
    <div className="max-padd-container py-20 bg-primary">

      <Title
        title1={"People"}
        title2={"Says"}
        titleStyles={"pb-12"}
        para={
          "Real stories from our happy customers sharing their experience and trusted feedback."
        }
      />

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >

        {testimonials.map((testimonial, index) => (

          <SwiperSlide key={index}>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">

              {/* Quote */}
              <FaQuoteLeft className="text-secondary text-2xl mb-4 opacity-70" />

              {/* Rating */}
              <div className="flex justify-between items-center mb-3">

                <div className="flex gap-1">

                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-orange-500" />
                  ))}

                </div>

                <p className="text-xs text-gray-400">
                  {testimonial.date}
                </p>

              </div>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-6 mb-6">
                {testimonial.message}
              </p>

              {/* User */}
              <div className="flex items-center gap-3">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover border"
                />

                <div>

                  <div className="flex items-center gap-2">

                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>

                    {testimonial.verified && (
                      <FaCheckCircle className="text-green-500 text-sm" />
                    )}

                  </div>

                  <p className="text-xs text-gray-500">
                    {testimonial.job}
                  </p>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
};

export default Testimonial;