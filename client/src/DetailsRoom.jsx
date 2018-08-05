import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import GoogleMapReact from "google-map-react";

var modal = {
  background: "#fff",
  position: "fixed",
  width: "100%",
  height: "100%",
  overflow: "auto",
  top: "0",
  left: "0",
  rigth: "0",
  zIndex: "5"
};
var modalContent = {
	background: "#fff",
  position: "relative",
  width: "100%",	
  height: "100%",
  overflow: "auto",
}
var marginTopBottom = {
  position: "relative",
  width: "100%",	
	height: "40px",
	marginLeft:"40px"

}
const DetailsRoom = ({ listing, closeDetailRoom }) => (
  <div style={modal}>
  <div style={modalContent}>
    <div className="headModal">
      <a className="back" onClick={() => closeDetailRoom()}>
        Back
      </a>
    </div>

    <div className="container is-fluid">
      <div>
        <div className="level-item level-itemMe">
          {listing.photos.map((photo, ind) => {
            // cloundinary image sizes are manipulated by inserting arguments after the 'upload' part of the file parth
            // example: "http://res.cloudinary.com/dwysumxzw/image/upload/v1532558555/kog_r_full_shot_x2ggw7.jpg";
            // I'm not connected to the database yet and will need to test the lines below once we are
            const arr = photo.url.split("upload/");
            const uploadWidth = "upload/w_412,c_scale/";
            const resizedPhotoUrl = arr.join(uploadWidth);
            return (
              <img
                src={resizedPhotoUrl}
                alt="picture of room for rent"
                key={ind}
              />
            );
          })}
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="map">
          <div style={{ height: "90vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDsOKb1koKwlCdtfpM3bOWCUrNBaTCzeN4"
              }}
              defaultCenter={{
                lat: parseFloat(listing.lat) || 59.95,
                lng: parseFloat(listing.long) || 30.33
              }}
              defaultZoom={11}
            />
          </div>
        </div>
				<div style={marginTopBottom}>
				</div>

        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea className="textarea" placeholder="Add a comment..." />
              </p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <a className="button is-info">Submit</a>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <label className="checkbox">
                    <input type="checkbox" /> Press enter to submit
                  </label>
                </div>
              </div>
            </nav>
          </div>
        </article>

        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-reply" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-retweet" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-heart" />
                  </span>
                </a>
              </div>
            </nav>
          </div>
          <div className="media-right">
            <button className="delete" />
          </div>
        </article>
      </div>
    </footer>

    <div className="footerModal">
      <div className="left">
        <div className="tilte">
          {" "}
          <h1> {listing.title} </h1>{" "}
        </div>
        <span>
          <h4 className=" tilte">
            {listing.city}, {listing.stateAbbr} {listing.zipCode}{" "}
          </h4>
          <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={4.99}
          />
        </span>
      </div>

      <div className="rigth">
        <div className="book"> Mail me </div>
        <div className="pricing"> $ {listing.price}/Month </div>
      </div>
    </div>
  </div>
  </div>
);

export default DetailsRoom;
