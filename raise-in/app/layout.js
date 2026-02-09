import { Geist, Geist_Mono, Manrope, Raleway } from "next/font/google";
import "./globals.css";
// import React from "react";
import NavbarWrapper from './components/NavbarWrapper';
import FooterWrapper from './components/FooterWrapper';
import ContentWrapper from './components/ContentWrapper';
import SessionWrapper from './components/SessionWrapper';
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
        <SessionWrapper>
          <NavbarWrapper/>
          <ContentWrapper>
            {children}
          </ContentWrapper>
          <FooterWrapper/>
        </SessionWrapper>
      </body>
    </html>
  )
}
