"use client";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function Home() {
  return (
    <BeamsBackground intensity="medium">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-white">Welcome to Home</h1>
        <p className="text-gray-400 mt-4">Dashboard will be here after login/signup</p>
      </div>
    </BeamsBackground>
  );
}

