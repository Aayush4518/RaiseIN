"use client";
// import { BeamsBackground } from "@/components/ui/beams-background";
// import { useSession } from "next-auth/react";


export default function Home() {
  // const { data: session, status } = useSession();

  
  return (
    
      <>
        <div className="fixed top-0 left-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-4xl font-bold text-white">Welcome to Home</h1>
          <p className="text-gray-400 mt-4">Dashboard will be here after login/signup</p>
        </div>
      </>
  
  );
}

