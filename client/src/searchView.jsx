import React from 'react';
import SearchResultView from './searchResultView.jsx';

const SearchView = ({term, listings, onInput, onSearch, onTitleClick}) => (
  <div >
    <div class="columns is-multiline is-mobile is-centered control">
      <input class="column is-one-quarter input is-small" style={{ textAlign: 'center' }}
      type="text" value={term} onChange={onInput} placeholder="Zip Code" />
      <button className="button is-small" style={{ textAlign: 'center' }}
      type="submit" onClick={onSearch} >
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
//column is-half is-offset-one-quarter level-item heading input
//column level-item has-text-centered heading button
//column is-one-fifth is-narrow
