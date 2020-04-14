import React, { useState } from 'react';

const Search = ({ updateSearchText, executeSearch, query }) => {
  const handleChange = (e) => {
    updateSearchText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
