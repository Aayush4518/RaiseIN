import { Geist, Geist_Mono, Manrope, Raleway } from "next/font/google";
import "./globals.css";
// import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


export const metadata = {
  title: "RaiseIN",
  description: "Helping Hands, Changing Lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className} overflow-x-hidden`}>
        <Navbar/>
        <div className="w-full pt-16">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  )
}
