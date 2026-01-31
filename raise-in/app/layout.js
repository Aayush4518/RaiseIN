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
      <body className={raleway.className}>
        <Navbar/>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="min-h-[87vh]">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  )
}
