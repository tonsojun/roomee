import React from 'react';

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
    const {
      title, state, address, city, zipCode, price, descriptionTextbox, photos
    } = this.state;
  }

  onChange (event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
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
        Upload Photos:   //TODO
        <button
          type="submit"
          onClick={() => {
            this.props.onSubmit(this.state);
          }}
        >
          Create Listing
        </button>
      </div>
    );
  }
}

export default CreateListingView;