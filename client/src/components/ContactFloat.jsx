import React, { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

const ContactFloat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

      {open && (
        <>
          {/* ZALO */}
          <a
            href="https://zalo.me/0988439116"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-lg px-4 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
            <span className="font-semibold">CHAT ZALO</span>
          </a>

          {/* MESSENGER */}
          <a
            href="https://m.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-lg px-4 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500"></div>
            <span className="font-semibold">MESSENGER</span>
          </a>

          {/* PHONE */}
          <a
            href="tel:0988439116"
            className="bg-white shadow-lg px-4 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition"
          >
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
            <span className="font-semibold">0988.439.116</span>
          </a>
        </>
      )}

      {/* BUTTON MAIN */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
};

export default ContactFloat;