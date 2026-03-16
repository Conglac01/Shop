import React, { useState } from "react";
import { FaEnvelope, FaHeadphones, FaLocationDot, FaPhone } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Please enter your name");
    }

    if (!form.email.includes("@")) {
      return toast.error("Invalid email address");
    }

    if (form.message.length < 10) {
      return toast.error("Message must be at least 10 characters");
    }

    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: ""
      });

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-padd-container py-20">

      <div className="flex flex-col lg:flex-row gap-20">

        {/* FORM */}
        <div className="flex-1">

          <h2 className="text-3xl font-bold mb-3">
            Get in Touch
          </h2>

          <p className="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
            Have questions or need help? Send us a message and we will reply as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-black transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-black transition"
              />

            </div>

            <textarea
              rows="5"
              name="message"
              placeholder="Write your message here"
              value={form.message}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-black resize-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

        {/* CONTACT INFO */}
        <div className="flex-1">

          <h3 className="text-2xl font-bold mb-3">
            Contact Details
          </h3>

          <p className="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
            Feel free to contact us through any method below.
          </p>

          <div className="space-y-6">

            {/* LOCATION */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Khương+Trung+Thanh+Xuân+Hà+Nội"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition"
            >

              <FaLocationDot className="text-xl text-secondary mt-1" />

              <div>
                <h5 className="font-semibold">Location</h5>
                <p className="text-gray-500 text-sm">
                  Khương Trung - Thanh Xuân - Hà Nội
                </p>
              </div>

            </a>

            {/* EMAIL */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Habeoshop@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition"
            >

              <FaEnvelope className="text-xl text-secondary mt-1" />

              <div>
                <h5 className="font-semibold">Email</h5>
                <p className="text-gray-500 text-sm">
                  Habeoshop@gmail.com
                </p>
              </div>

            </a>

            {/* PHONE */}
            <a
              href="tel:0123456789"
              className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition"
            >

              <FaPhone className="text-xl text-secondary mt-1" />

              <div>
                <h5 className="font-semibold">Phone</h5>
                <p className="text-gray-500 text-sm">
                  0123 456 789
                </p>
              </div>

            </a>

            {/* SUPPORT */}
            <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition">

              <FaHeadphones className="text-xl text-secondary mt-1" />

              <div>
                <h5 className="font-semibold">Support</h5>
                <p className="text-gray-500 text-sm">
                  24/7 Customer Support
                </p>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-4">

              <a
                href="https://zalo.me/0988439116"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-500 text-white rounded-full hover:scale-110 transition"
              >
                <SiZalo size={20} />
              </a>

              <a
                href="https://m.me/yourfacebookid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-purple-500 text-white rounded-full hover:scale-110 transition"
              >
                <FaFacebookMessenger size={20} />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* GOOGLE MAP */}
      <div className="mt-20">

        <h3 className="text-2xl font-bold mb-6">
          Our Location
        </h3>

        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">

          <iframe
            src="https://maps.google.com/maps?q=Khương%20Trung%20Thanh%20Xuân%20Hà%20Nội&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </div>
  );
};

export default Contact;