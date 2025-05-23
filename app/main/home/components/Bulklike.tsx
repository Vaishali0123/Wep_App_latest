// components/BulkLike.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";

type BulkLikeProps = {
  userId: string;
  postIds: string[];
  API: string;
  onComplete: () => void;
};

const BulkLike: React.FC<BulkLikeProps> = ({
  userId,
  postIds,
  API,
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleBulkLike = async () => {
    if (postIds.length === 0) {
      alert("No posts selected for liking.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        postIds.map((postId) =>
          axios.post(`${API}/updatelike/${userId}/${postId}`)
        )
      );
      alert("Bulk like operation completed!");
      onComplete(); // Trigger a callback to refresh parent data
    } catch (error) {
      console.error("Error in bulk like operation:", error);
      alert("An error occurred during the bulk like operation.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBulkLike}
        disabled={loading}
        className={`p-2 bg-blue-500 text-white rounded-xl ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {loading ? "Liking..." : "Like All Posts"}
      </button>
    </div>
  );
};

export default BulkLike;
