import React from "react";

const Tag = ({ label, onClick }) => {
    return (
      <div
        className="font-orbit bg-green-600 text-white text-sm px-3 py-1 cursor-pointer"
        onClick={onClick}
      >
        {label}
      </div>
    );
  };
  
  export default Tag;