import React from 'react';
import MagGlass from '../../images/search.jpg';

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
          <img style={{ width: '35px' }} src={MagGlass} alt="Magnifying Glass" />
          <input className="search-input" type="text" value={query} onChange={handleChange} />
          {/* <button className="search-button" type="submit"> */}
          {/* Search
        </button> */}
        </div>
      </form>
    </div>
  );
};

export default Search;
