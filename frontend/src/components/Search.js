import React, { useState } from 'react';
import "./Search.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="search">
        <input
          type="text"
          placeholder="Search!"
          name="search"
          className="searchbar"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="button" className="search_button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Search;
