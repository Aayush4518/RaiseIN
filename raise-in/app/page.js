"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [search, setsearch] = useState([]);


  return (
    <div className="p-6 text-neutral-100">
      {/* creating a search bar */}
      <div className="flex justify-center w-full">

      <div className="relative w-full max-w-md">
        <img
          src="https://img.icons8.com/?size=100&id=Y6AAeSVIcpWt&format=png&color=ffffff"
          alt="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 pointer-events-none"
          />

        <input
          type="text"
          placeholder="Search creators or topics..."
          className="w-full p-2 pl-10 rounded-full bg-neutral-800 border border-white/10
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>
      </div>


    </div>
  );
}
