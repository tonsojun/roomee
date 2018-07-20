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
  }
  /*  ******** Ajax Requests **********/

  onSearch () {
    axios.get('/search/get', {
      data: {
        term: this.state.term
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*  ******** Ajax Requests **********/

  /* ******** Helpers and Events **********/

  onInput (e) {
    this.setState({
      term: e.target.value
    });
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
          <Route path="/createListing" component={CreateListingView} />
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
