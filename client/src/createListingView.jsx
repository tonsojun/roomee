import React from 'react';
import Dropzone from 'react-dropzone';
import { Redirect } from 'react-router-dom';

class CreateListingView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      address: '',
      city: '',
      zipCode: '',
      price: '',
      descriptionTextbox: '',
      photos: [],
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.setRedirect = this.setRedirect.bind(this);

    const {
      title, state, address, city, zipCode, price, descriptionTextbox, photos
    } = this.state;
  }

  onChange (event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  onDrop (file) {
    this.state.photos.push(file);
    const photos = this.state.photos.slice(-5);
    // will currenty accept more than five photos, refactor after mvp
    this.setState({
      photo1: photos[0],
      photo2: photos[1],
      photo3: photos[2],
      photo4: photos[3],
      photo5: photos[4]
    });
  }

  setRedirect () {
    this.setState({
      redirect: true
    })
  }

  render () {
    const { redirect } = this.state;
    if (redirect) {
      return (<Redirect to='/' />);
    }
    return (
      <div id="create-listing">
        <h4>
        Create Your Listing:
        </h4>
        Title:
        <input id="title" value={this.title} onChange={this.onChange} />
        Address:
        <input id="address" value={this.address} onChange={this.onChange} />
        City:
        <input id="city" value={this.city} onChange={this.onChange} />
        ZipCode:
        <input id="zipCode" size="5" value={this.zipCode} onChange={this.onChange} />
        Price:
        <input id="price" size="4" value={this.price} onChange={this.onChange} />
        Description:
        <input id="descriptionTextbox" value={this.description} onChange={this.onChange} />

        <section>
          <div className="dropzone">
            <Dropzone
              onDrop={this.onDrop}
              accept="image/jpeg, image/png"
              maxSize={5242880}
            >
              <p>
              Add up to 5 images
              </p>
            </Dropzone>
          </div>
          <aside>
            <h2>
            Dropped files
            </h2>
            <ul>
              {
                this.state.photos.map((f, i) => {
                  // this is very odd, the line above correctly displays the file name, but
                  <li key={f[0].name}>
                   File {i}
                  </li>
                  // the line above is not rendering ANYTHING
                  // the photos are being saved  however, so come back to this post-MVP
                })
              }
            </ul>
          </aside>
        </section>

        <button
          type="submit"
          onClick={() => {
            this.props.onSubmit(this.state);
            this.setRedirect()
          }}
        >
          Create Listing
        </button>
      </div>
    );
  }
}

export default CreateListingView;
