"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();
  const [myFundings, setMyFundings] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      const allFundings = JSON.parse(localStorage.getItem("fundings") || "[]");
      const userFundings = allFundings.filter(
        (f) => f.creator?.email === session.user.email
      );
      setMyFundings(userFundings);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-400 mb-6">Please login to access your dashboard</p>
          <Link href="/login" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Background Grid */}
      <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10">
        <div className="px-4 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome, {session?.user?.name || session?.user?.email}
              </h1>
              <p className="text-gray-400">Manage your funding campaigns</p>
            </div>

            {/* My Fundings Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">My Campaigns</h2>
                  <p className="text-gray-400 text-sm mt-1">{myFundings.length} total campaign{myFundings.length !== 1 ? "s" : ""}</p>
                </div>
                <Link href="/home" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                  Create New
                </Link>
              </div>

              {myFundings.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-12 text-center border border-gray-700">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No campaigns yet</h3>
                  <p className="text-gray-500 mb-6">Start your first funding campaign to help your cause</p>
                  <Link href="/home" className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                    Create Campaign
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myFundings.map((funding) => {
                    const progress = getProgressPercentage(funding.currentAmount, funding.goalAmount);
                    return (
                      <Link key={funding.id} href={`/funding/${funding.slug}`}>
                        <div className="group cursor-pointer h-full">
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-40 overflow-hidden bg-gray-900">
                              {funding.image ? (
                                <img
                                  src={funding.image}
                                  alt={funding.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                              <div className="absolute top-3 right-3">
                                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                                  {funding.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {funding.title}
                              </h3>

                              {/* Progress */}
                              <div className="mb-4 flex-grow">
                                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                                  <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs font-semibold text-blue-400">{formatCurrency(funding.currentAmount)}</span>
                                  <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                                </div>
                              </div>

                              <p className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                                Goal: <span className="text-green-400">{formatCurrency(funding.goalAmount)}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
