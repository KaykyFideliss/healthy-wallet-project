import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-64 h-3 bg-gray-700 rounded-full">
      <div
        className="h-3 bg-yellow-400 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
