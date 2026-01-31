import React from 'react'

const Footer = () => {
  return (
    <footer className=" py-6 mb-2 bg-neutral-900
  border-t border-white/10
  text-neutral-300 mt-[-100px">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} RaiseIN. All rights reserved.</p>
      </div>
      </footer>
  )
}

export default Footer
