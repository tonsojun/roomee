import React from 'react';
import SearchResultView from './searchResultView.jsx';

const SearchView = ({term, listings, onInput, onSearch, onTitleClick}) => (
  <div>
    <div className="search-div">
      <input className="input-bar" type="text" value={term} onChange={onInput} style={{ textAlign: 'center' }} placeholder="Zip Code" />
      <button style={{ textAlign: 'center' }} className="search-button" type="submit" onClick={onSearch} >
        Search
      </button>
    </div>
    <div>
      {listings.map((item) =>
        <SearchResultView
          onTitleClick={onTitleClick}
          listing={item}
          key={item.id}
        />
      )}
    </div>

  </div>
);

export default SearchView;
