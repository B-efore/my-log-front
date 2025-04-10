import React from "react";
import "./Tag.css";

const Tag = ({ label, onClick }) => {
    return (
      <div
        className="tag"
        onClick={onClick}
      >
        {label}
      </div>
    );
  };
  
  export default Tag;