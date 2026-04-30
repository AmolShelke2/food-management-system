import React from "react";

const SkeletonWrapper = ({ loading, children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Original Component Shape */}
      <div className={loading ? "invisible" : "visible"}>{children}</div>

      {/* Skeleton Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-200 rounded-md animate-pulse" />
      )}
    </div>
  );
};

export default SkeletonWrapper;
