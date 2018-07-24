import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import SearchView from './searchView.jsx';
import LoginView from './loginView.jsx';
import CreateListingView from './createListingView.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // set state here for entire app
      // we need to look into redux
      newListing: {},
      term: '',
      listings: [{
        id: 1,
        title: 'room for rent',
        city: 'Sacramento',
        zipcode: '95762',
        address: '123 Leaf Lane',
        description: 'clean single room available',
        price: 1000
      },
      {
        id: 2,
        title: 'room for rent',
        city: 'Los Angeles',
        zipcode: '96819',
        address: '1234 Leaf Lane',
        description: 'clean single room available',
        price: 1000
      }]
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  /*  ******** axios Requests **********/

  onSearch (event) {
    event.preventDefault();
    const { term } = this.state;
    axios.get('/search', { params: {term : term} })
      .then((res) => {
        console.log( res, 'res data from onsearch client side');
        //  is res.data or res an array?
        this.setState({
          listings : res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmitPost (e) {
    const { newListing } = this.state;
    axios.post('/post', {
      newListing
    })
    .then((res) => {
      console.log('res from creating new listing post', res)
    }).catch((err) => {
      if (err) {
        throw err;
      };
    });
  }


  /*  ******** axios Requests **********/

  /* ******** Helpers and Events **********/

  onInput (e) {
    this.setState({
      term: e.target.value
    });
  }

  onSubmit (e) {
    console.log('click', e.target.listing)
    this.setState({
      newListing: e.target.listing
    }).then(() => {
      this.onSubmitPost(e);
    })
  }

  /* ******** Helpers and Events **********/

  /* ******** Render **********/

  render () {

    const renderSearchView = (props) =>{
      return (
        <SearchView
          onInput={this.onInput.bind(this)}
          value={this.state.term}
          listings={this.state.listings}
          onSearch={this.onSearch.bind(this)}
          // {...props}
        />
      );
    };

    const renderCreateListingView = (props) =>{
      return (
        <SearchView
          onInput={this.onSubmit.bind(this)}
          value={this.state.newListing}
          // {...props}
        />
      );
    };

    return (
      <Router>
        <div className="app">
          <h1 className="title">
          Roomie
          </h1>
          <Link to="/createListing" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            New Listing
            </h4>
          </Link>
          <LoginView />
          <Link to="/search" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            Search
            </h4>
          </Link>
          <Route path="/search" render={renderSearchView} />
          <Route path="/createListing" render={renderCreateListingView} />
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
