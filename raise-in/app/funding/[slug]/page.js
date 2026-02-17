"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FundingDetail() {
  const params = useParams();
  const slug = params.slug;

  const [funding, setFunding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("");
  const [showDonationForm, setShowDonationForm] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadFunding = () => {
      const allFundings = JSON.parse(localStorage.getItem("fundings") || "[]");
      const found = allFundings.find((f) => f.slug === slug);
      setFunding(found);
      setLoading(false);
    };

    loadFunding();
  }, [slug]);

  const handleDonate = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);

    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Update funding with new amount
    const allFundings = JSON.parse(localStorage.getItem("fundings") || "[]");
    const updatedFundings = allFundings.map((f) => {
      if (f.slug === slug) {
        return {
          ...f,
          currentAmount: f.currentAmount + amount,
        };
      }
      return f;
    });

    localStorage.setItem("fundings", JSON.stringify(updatedFundings));
    const updatedFunding = updatedFundings.find((f) => f.slug === slug);
    setFunding(updatedFunding);
    setDonationAmount("");
    setShowDonationForm(false);

    // Show success message
    alert(`Thank you for donating ₹${amount}!`);
  };

  const getProgressPercentage = () => {
    if (!funding) return 0;
    return Math.min((funding.currentAmount / funding.goalAmount) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysLeft = () => {
    if (!funding) return 0;
    const createdDate = new Date(funding.createdAt);
    const endDate = new Date(createdDate.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
    const now = new Date();
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return Math.max(daysLeft, 0);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (!funding) {
    return (
      <div className="w-full min-h-screen">
        <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Campaign Not Found</h1>
            <p className="text-gray-400 mb-8">The funding campaign you're looking for doesn't exist.</p>
            <Link href="/home" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = getProgressPercentage();
  const daysLeft = getDaysLeft();
  const amountNeeded = Math.max(funding.goalAmount - funding.currentAmount, 0);

  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10">
        {/* Navigation */}
        <div className="px-4 md:px-8 py-6 border-b border-gray-700">
          <div className="max-w-6xl mx-auto">
            <Link href="/home" className="inline-flex items-center text-blue-400 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Campaigns
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-4 md:px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
                {funding.image ? (
                  <img src={funding.image} alt={funding.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title and Category */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                    {funding.category}
                  </span>
                  <span className="px-4 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                    Started {new Date(funding.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{funding.title}</h1>
              </div>

              {/* Story Section */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-4">Campaign Story</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{funding.description}</p>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-4">How Funds Will Be Used</h2>
                  <p className="text-gray-300 leading-relaxed">{funding.purpose}</p>
                </div>
              </div>
            </div>

            {/* Sidebar - Donation Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-2xl">
                {/* Current Amount */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Amount Raised</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {formatCurrency(funding.currentAmount)}
                  </p>
                </div>

                {/* Goal */}
                <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm mb-1">Goal Amount</p>
                  <p className="text-xl font-semibold text-gray-300">
                    {formatCurrency(funding.goalAmount)}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-400">{Math.round(progress)}% funded</span>
                    <span className="text-sm text-gray-500">{formatCurrency(amountNeeded)} to go</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Days Left</span>
                    <span className="font-semibold text-orange-400">{daysLeft} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Supporters</span>
                    <span className="font-semibold text-green-400">N/A</span>
                  </div>
                </div>

                {/* Donation Button */}
                {!showDonationForm ? (
                  <button
                    onClick={() => setShowDonationForm(true)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    Donate Now
                  </button>
                ) : (
                  <form onSubmit={handleDonate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Amount (₹)</label>
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        required
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Confirm Donation
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDonationForm(false)}
                      className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* Share Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">Share this campaign</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
