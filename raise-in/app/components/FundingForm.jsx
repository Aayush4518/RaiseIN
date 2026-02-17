"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function FundingForm({ onFundingAdded }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    purpose: "",
    goalAmount: "",
    currentAmount: "",
    category: "education",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = ["education", "medical", "business", "emergency", "community", "other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    const newFunding = {
      id: Date.now().toString(),
      slug,
      ...formData,
      currentAmount: parseFloat(formData.currentAmount),
      goalAmount: parseFloat(formData.goalAmount),
      createdAt: new Date().toISOString(),
      creator: {
        name: session?.user?.name || "Anonymous",
        email: session?.user?.email,
      },
    };

    // Get existing fundings from localStorage
    const existingFundings = JSON.parse(localStorage.getItem("fundings") || "[]");
    const updatedFundings = [newFunding, ...existingFundings];

    // Save to localStorage
    localStorage.setItem("fundings", JSON.stringify(updatedFundings));

    // Reset form
    setFormData({
      title: "",
      description: "",
      purpose: "",
      goalAmount: "",
      currentAmount: "",
      category: "education",
      image: "",
    });
    setLoading(false);
    setIsOpen(false);

    // Trigger refresh
    onFundingAdded?.();
  };

  return (
    <>
      {/* Floating Action Button - Only show if authenticated */}
      {session && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
        >
          <svg className="w-8 h-8 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Start Your Funding Journey
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Funding Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Help John's Medical Treatment"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell your story..."
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  required
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Purpose</label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="How will the funds be used?"
                  rows="2"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  required
                />
              </div>

              {/* Goal Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Goal Amount (₹)</label>
                  <input
                    type="number"
                    name="goalAmount"
                    value={formData.goalAmount}
                    onChange={handleChange}
                    placeholder="100000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>

                {/* Current Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Amount (₹)</label>
                  <input
                    type="number"
                    name="currentAmount"
                    value={formData.currentAmount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <span className="text-gray-400 text-sm">Choose image...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "Creating..." : "Create Funding"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
