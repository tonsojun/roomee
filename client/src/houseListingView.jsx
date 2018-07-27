import React from 'react';

const HouseListingView = ({currentHouseView}) => (
  <div id="house-listing-view">
    <h4>Title: {currentHouseView.title}</h4>
    <h5>Address: {currentHouseView.address}, {currentHouseView.city} {currentHouseView.zipCode}</h5>
    <h5>Price: {currentHouseView.price} </h5>
    <p>Description: {currentHouseView.description}</p>
    <h6>Contact</h6>
    <div>
        {currentHouseView.photos.map((photo,ind) => {
            const arr = photo.url.split('upload/');
            const uploadWidth = 'upload/w_412,c_scale/';
            const resizedPhotoUrl = arr.join(uploadWidth);
            return (<img src={resizedPhotoUrl} alt="picture of room for rent" key={ind}></img>)
          })
        }
      </div>
  </div>
);

export default HouseListingView;
