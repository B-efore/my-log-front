import React from "react";

const Tag = ({ label, onClick }) => {
    return (
      <div
        className="btn-primary text-sm px-3 py-1 cursor-pointer"
        onClick={onClick}
      >
        {label}
      </div>
    );
  };
  
  export default Tag;