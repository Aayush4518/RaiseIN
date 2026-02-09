  "use client"
  
  import Link from "next/link"
  import { useState, useEffect } from "react"
  import { useSession, signIn, signOut } from "next-auth/react"

  const Navbar = () => {
    const { data: session } = useSession()
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

    if (session) {
      return (
        <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm rounded-full border border-[#333] bg-[#1f1f1f57] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-0 ease-in-out`}>
          <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-white">RaiseIN</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">{session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-xs sm:text-sm rounded-full border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </header>
      )
    }

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
          
          <Link href="/about" className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-4 py-3 rounded-full"><span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span><span className="relative z-10 h-full flex items-center justify-center leading-none overflow-hidden"><span className="block text-white transition-transform duration-300 ease-out group-hover:-translate-y-full">About</span><span className="absolute text-black transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">About</span></span></Link>
          <Link href="/services" className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-4 py-3 rounded-full"><span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span><span className="relative z-10 h-full flex items-center justify-center leading-none overflow-hidden"><span className="block text-white transition-transform duration-300 ease-out group-hover:-translate-y-full">Services</span><span className="absolute text-black transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">Services</span></span></Link>
          <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-4 py-3 rounded-full"><span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span><span className="relative z-10 h-full flex items-center justify-center leading-none overflow-hidden"><span className="block text-white transition-transform duration-300 ease-out group-hover:-translate-y-full">Contact</span><span className="absolute text-black transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">Contact</span></span></Link>


          <>
            <button onClick={() => window.location.assign("/login")} className={`px-4 py-2 cursor-pointer rounded-full transition-all border ${isScrolled ? "border-black text-black hover:bg-black hover:text-white" : "border-white text-white hover:bg-white hover:text-black"}`}>
              Login
            </button>
            <button onClick={() => window.location.assign("/login")} className={`px-4 py-2 rounded-full cursor-pointer transition-all ${isScrolled ? "bg-black text-white border-black hover:bg-white hover:text-black" : "bg-black text-white border-white hover:bg-transparent hover:text-white"}`}>
              Sign Up
            </button>
          </>
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
              <>
                <button onClick={() => window.location.assign("/login")} className={`px-4 py-2 rounded-full transition-all w-full border ${isScrolled ? "border-black text-black hover:bg-black hover:text-white" : "border-white text-white hover:bg-white hover:text-black"}`}>
                  Login
                </button>
                <button onClick={() => window.location.assign("/login")} className={`px-4 py-2 rounded-full transition-all w-full ${isScrolled ? "bg-black text-white border-black hover:bg-white hover:text-black" : "bg-white text-black border-white hover:bg-transparent hover:text-white"}`}>
                  Sign Up
                </button>
              </>
            </div>
          </div>
        )}
      </nav>
    )
  }

  export default Navbar
