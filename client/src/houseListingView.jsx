import React from 'react';

const HouseListingView = ({currentHouseView}) => (
  <div id="house-listing-view" className="section columns">
    <div className="column has-text-left is-half">
      <div>
        <h4 className="heading">Title</h4>
        <p className="content">{currentHouseView.title}</p>
      </div>
      <div>
        <h4 className="heading">Address</h4>
        <p className="content">
          {currentHouseView.address + ' '}
          {currentHouseView.city + ', '}
          {currentHouseView.stateAbbr + ' '}
          {currentHouseView.zipCode}
        </p>
      </div>
      <div>
        <h4 className="heading">Price</h4>
        <p className="content">{'$' +currentHouseView.price}</p>
      </div>
      <div>
        <h6 className="heading">Description</h6>
        <p className="content">
        {currentHouseView.description}</p>
        </div>
      <div>
        <h4 className="heading">Contact</h4>
      </div>
    </div>
    <div className="column">
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
