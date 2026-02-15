"use client";
import { useSession } from "next-auth/react";
import { MinimalProfessionalCard } from "@/app/components/analytics-dashboard";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-white">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="text-white">Not logged in</p>;
  }

  return (
    <div>
      <h1 className="text-2xl text-white font-bold">
        Welcome to Dashboard
      </h1>
      <p className="text-white mb-8">
        Hello, {session?.user?.name || session?.user?.email}!
      </p>
      <MinimalProfessionalCard />
    </div>
  );
}
