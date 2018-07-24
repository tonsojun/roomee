import React from 'react';

const SearchResultView = ({listing}) => (
  <div className="search-result">
    <h4>
      <img src="" alt="" />
      {listing.title}
    </h4>
    <div>
      {listing.city}
    </div>
  </div>
);

export default SearchResultView;
