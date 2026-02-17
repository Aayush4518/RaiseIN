"use client";

import { useState } from "react";

export default function UploadPhoto({ username }) {
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useState(null)[1];

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImage(data.filePath);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Input Area */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={loading}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-700/30 transition-all duration-200 group"
        >
          <svg className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors">
            {loading ? "Uploading..." : "Click to upload or drag and drop"}
          </span>
          <span className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Image Preview */}
      {image && (
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
            <p className="text-green-400 text-sm font-medium">✓ Photo uploaded successfully</p>
          </div>
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
              <img
                src={image}
                alt="Profile"
                className="relative w-48 h-48 object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Your new profile photo is ready!</p>
          </div>
        </div>
      )}
    </div>
  );
}