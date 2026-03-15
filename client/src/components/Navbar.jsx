import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, setMenuOpened }) => {

const navLinks = [
{ path: "/", title: "Home" },
{ path: "/collection", title: "Collection" },
{ path: "/wishlist", title: "Wishlist" },
{ path: "/testimonial", title: "Testimonial" },
{ path: "/contact", title: "Contact" },
]

return (

<nav className={containerStyles}>

{navLinks.map((link) => (

<NavLink
key={link.title}
to={link.path}
onClick={() => setMenuOpened(false)}

className={({ isActive }) =>
`group relative text-sm font-semibold uppercase tracking-wider transition
${isActive ? "text-black" : "text-gray-500 hover:text-black"}`
}

>

{({ isActive }) => (
<>

{link.title}

<span
className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300
${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
></span>

</>
)}

</NavLink>

))}

</nav>

)

}

export default Navbar