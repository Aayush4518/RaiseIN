import { Geist, Geist_Mono, Manrope, Raleway } from "next/font/google";
import "./globals.css";
// import React from "react";
import NavbarWrapper from './components/NavbarWrapper';
import FooterWrapper from './components/FooterWrapper';
import ContentWrapper from './components/ContentWrapper';
import SessionWrapper from './components/SessionWrapper';
import Providers from "./providers";
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://raise-in.vercel.app");

export const metadata = {
  title: {
    default: "RaiseIN | Helping Hands, Changing Lives",
    template: "%s | RaiseIN",
  },
  description: "RaiseIN is a community-driven fundraising platform to start campaigns, invite donors, and track real impact.",
  keywords: ["RaiseIN", "fundraising", "crowdfunding", "charity", "social impact", "donations", "nonprofit"],
  authors: [{ name: "RaiseIN Team", url: "https://raise-in.vercel.app" }],
  applicationName: "RaiseIN",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "FwcMpT2gilEoGyHuXGI0ebPuCfzpq6Zvaq5r76-lV54",
  },
  openGraph: {
    title: "RaiseIN | Helping Hands, Changing Lives",
    description: "RaiseIN is a community-driven fundraising platform to start campaigns, invite donors, and track real impact.",
    type: "website",
    url: "https://raise-in.vercel.app",
    siteName: "RaiseIN",
    images: [
      {
        url: "https://raise-in.vercel.app/images/raiseIN-bg.png",
        width: 1200,
        height: 630,
        alt: "RaiseIN - Helping Hands, Changing Lives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaiseIN | Helping Hands, Changing Lives",
    description: "RaiseIN is a community-driven fundraising platform to start campaigns, invite donors, and track real impact.",
    creator: "@RaiseIN",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
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
