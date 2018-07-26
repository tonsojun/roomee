import React from 'react';

const HouseListingView = ({currentHouseView}) => (
  <div id="house-listing-view">
    <h4>Title: {currentHouseView.title}</h4>
    <h5>Address: {currentHouseView.address}, {currentHouseView.city} {currentHouseView.zipCode}</h5>
    <h5>Price: {currentHouseView.price} </h5>
    <p>Description: {currentHouseView.description}</p>
    <h6>Contact</h6>
  </div>
);

export default HouseListingView;
