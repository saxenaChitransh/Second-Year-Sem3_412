import React from 'react';

function SearchStudent({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        placeholder="Search by Student ID or Name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchStudent;
