import React from 'react';
const Search = ({ updateSearchText, executeSearch, query }) => {
  const handleChange = (e) => {
    updateSearchText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={onSubmit}>
        <div className="search-inner-container">
          <i className="fa fa-search"></i>
          <label htmlFor="search">
            <input className="search-input" type="text" name="search" value={query} onChange={handleChange} />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;
