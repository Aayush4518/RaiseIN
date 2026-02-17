"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FundingForm from "../components/FundingForm";

export default function Home() {
  const [fundings, setFundings] = useState([]);
  const [filteredFundings, setFilteredFundings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "education", "medical", "business", "emergency", "community", "other"];

  // Load fundings from localStorage
  useEffect(() => {
    const loadFundings = () => {
      const stored = JSON.parse(localStorage.getItem("fundings") || "[]");
      setFundings(stored);
    };
    loadFundings();
  }, []);

  // Filter fundings
  useEffect(() => {
    let filtered = fundings;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFundings(filtered);
  }, [fundings, selectedCategory, searchQuery]);

  const handleFundingAdded = () => {
    const stored = JSON.parse(localStorage.getItem("fundings") || "[]");
    setFundings(stored);
  };

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
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Funding Hub
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Discover inspiring funding campaigns and support causes that matter to you
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 blur"></div>
                <input
                  type="text"
                  placeholder="Search funding campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Fundings Grid */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {filteredFundings.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 0120.354 15.354z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No campaigns found</h3>
                <p className="text-gray-400">
                  {searchQuery ? "Try adjusting your search terms" : "Be the first to create a funding campaign!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFundings.map((funding) => {
                  const progress = getProgressPercentage(funding.currentAmount, funding.goalAmount);
                  return (
                    <Link key={funding.id} href={`/funding/${funding.slug}`}>
                      <div className="group cursor-pointer h-full">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden bg-gray-900">
                            {funding.image ? (
                              <img
                                src={funding.image}
                                alt={funding.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            {/* Category Badge */}
                            <div className="absolute top-3 right-3">
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                                {funding.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-grow">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                              {funding.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                              {funding.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="flex justify-between mt-2">
                                <span className="text-xs font-semibold text-blue-400">
                                  {formatCurrency(funding.currentAmount)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {Math.round(progress)}%
                                </span>
                              </div>
                            </div>

                            {/* Goal */}
                            <p className="text-sm text-gray-500 border-t border-gray-700 pt-3">
                              Goal: <span className="text-green-400 font-semibold">{formatCurrency(funding.goalAmount)}</span>
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
        </section>

        {/* Stats Section */}
        {fundings.length > 0 && (
          <section className="px-4 md:px-8 py-16 bg-gray-900/50">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Campaigns</p>
                      <p className="text-3xl font-bold text-blue-400">{fundings.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0l-8-8m8 8l-8 8" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Raised</p>
                      <p className="text-3xl font-bold text-cyan-400">
                        {formatCurrency(fundings.reduce((sum, f) => sum + f.currentAmount, 0))}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Avg. Progress</p>
                      <p className="text-3xl font-bold text-green-400">
                        {Math.round(
                          fundings.reduce((sum, f) => sum + getProgressPercentage(f.currentAmount, f.goalAmount), 0) /
                            fundings.length
                        )}
                        %
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Floating Action Button Form */}
      <FundingForm onFundingAdded={handleFundingAdded} />
    </div>
  );
}

