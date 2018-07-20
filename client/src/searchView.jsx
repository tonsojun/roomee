import React from 'react';
import SearchResultView from './searchResultView.jsx';

const SearchView = ({term}) => (
  <div className="search-div">
    <h4>
    Search results here
    </h4>
    <input className="input-bar" type="text" value={term} style={{ textAlign: 'center' }} placeholder="Zip Code" />
    <button style={{ textAlign: 'center' }} className="search-button" type="submit">
      Search
    </button>
    <SearchResultView />
  </div>
);


export default SearchView;
