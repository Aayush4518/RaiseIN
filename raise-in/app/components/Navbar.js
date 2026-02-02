"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`w-screen h-16 z-50 flex items-center justify-between px-6 text-neutral-100 fixed top-0 left-0 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md" 
        : "bg-transparent"
    }`}>
      
      <div className="flex items-center gap-3">
        {/* Hamburger md device only*/}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <img
            className="w-6"
            src="https://img.icons8.com/?size=100&id=w3-HRY0z8wQY&format=png&color=ffffff"
            alt="menu"
          />
        </button>

        <span className="text-lg font-semibold">RaiseIN</span>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/home" className={`transition-all ${isScrolled ? "hover:text-white" : "hover:text-gray-300"}`}>Home</Link>
        <Link href="/about" className={`transition-all ${isScrolled ? "hover:text-white" : "hover:text-gray-300"}`}>About</Link>
        <Link href="/services" className={`transition-all ${isScrolled ? "hover:text-white" : "hover:text-gray-300"}`}>Services</Link>
        <Link href="/contact" className={`transition-all ${isScrolled ? "hover:text-white" : "hover:text-gray-300"}`}>Contact</Link>
        
        {isScrolled && (
          <>
            <button className="px-4 py-2 border border-black rounded-full bg-transparent text-black hover:bg-black hover:text-white transition-all">
              Login
            </button>
            <button className="px-4 py-2 border border-black rounded-full bg-black text-white hover:bg-white hover:text-black transition-all">
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* MOBILE VIEW */}
      {open && (
        <div className={`absolute top-16 left-0 w-full md:hidden transition-all duration-300 ${
          isScrolled 
            ? "bg-white/10 backdrop-blur-md border-t border-white/20" 
            : "bg-neutral-900/95 backdrop-blur-md border-t border-white/10"
        }`}>
          <div className="flex flex-col items-start gap-4 px-6 py-4 text-left">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            {isScrolled ? (
              <>
                <button className="px-4 py-2 border border-black rounded-full bg-transparent text-black hover:bg-black hover:text-white transition-all w-full">
                  Login
                </button>
                <button className="px-4 py-2 border border-black rounded-full bg-black text-white hover:bg-white hover:text-black transition-all w-full">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button>Login</button>
                <button>Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
