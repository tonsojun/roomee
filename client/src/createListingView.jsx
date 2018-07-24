import React from 'react';
import Dropzone from 'react-dropzone';

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
      photos: []
    };
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);

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
    // will currenty accept more than five photos, refactor after mvp
    this.setState({
      photos: this.state.photos
    });
  }

  render () {
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
                this.state.photos.map((f) => {
                  console.log(f.name);
                  // this is very odd, the line above correctly display the file name, but
                  <li key={f[0].name}>
                    {f[0].name} - {f[0].size} bytes
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
            this.onSubmit(this.state);
          }}
        >
          Create Listing
        </button>
      </div>
    );
  }
}

export default CreateListingView;
