import React from 'react';
import MagGlass from '../../images/Mag.png';

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
          {/* <img style={{ width: '25px', backgroundColor: 'white' }} src={MagGlass} alt="Magnifying Glass" /> */}
          <i className="fa fa-search"></i>
          <input className="search-input" type="text" value={query} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default Search;
