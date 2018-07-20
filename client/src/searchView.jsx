import React from 'react';
import SearchResultView from './searchResultView.jsx';

const SearchView = ({term, listings}) => (
  <div>
    <div className="search-div">
    <input className="input-bar" type="text" value={term} style={{ textAlign: 'center' }} placeholder="Zip Code" />
    <button style={{ textAlign: 'center' }} className="search-button" type="submit">
      Search
    </button>
    </div>
    <div>
      {listings.map((item) =>
        <SearchResultView listing={item} key={item.id} />
       )}
    </div>
  </div>
);


export default SearchView;

