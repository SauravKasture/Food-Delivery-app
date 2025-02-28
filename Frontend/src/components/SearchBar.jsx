// components/SearchBar.jsx
import React from "react";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;