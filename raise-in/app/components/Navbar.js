"use client"
import Link from "next/link"


import { useState } from "react"

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full h-16 z-50 shadow-md flex items-center justify-between px-6 bg-neutral-900/70 backdrop-blur-md border-b border-white/10 text-neutral-100 relative">
      
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
      <div className="hidden md:flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* MOBILE VIEW */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-neutral-900/95 backdrop-blur-md border-t border-white/10 md:hidden">
          <div className="flex flex-col items-start gap-4 px-6 py-4 text-left">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
