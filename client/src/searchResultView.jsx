import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const SearchResultView = ({listing, onTitleClick}) => (
  <div className="search-result">
    <img src="" alt="" />
    <Link to="/house" style={{ textDecoration: 'none', color: '#888' }}>
      <h4 onClick={()=>onTitleClick(listing)}>
        {listing.title}
      </h4>
    </Link>
    <div>
      <h4>{listing.city}</h4>
      <h5>{listing.price}</h5>
    </div>
  </div>
);

export default SearchResultView;
