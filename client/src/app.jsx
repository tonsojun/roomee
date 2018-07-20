import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchView from './searchView.jsx';
import LoginView from './loginView.jsx';
import CreateListingView from './createListingView.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // set state here for entire app
      // we need to look into redux
      term: ''
    };
  }
  /*  ******** Ajax Requests **********/

  // ajax here?

  /*  ******** Ajax Requests **********/

  /* ******** Helpers and Events **********/

  // helper functions/ event functions here?

  /* ******** Helpers and Events **********/

  /* ******** Render **********/

  render () {
    const { term } = this.state.term;
    return (
      <Router>
        <div className="app">
          <h1 className="title">
          Roomie
          </h1>
          <Link to="/createListing" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="create-listing">
            New Listing
            </h4>
          </Link>
          <LoginView />
          <div className="search-div">
            <div className="search">
              <input className="input-bar" type="text" value={term} style={{ textAlign: 'center' }} placeholder="Location, City, Address" />
              <Link to="/search">
                <button style={{ textAlign: 'center' }} className="search-button" type="submit">
                Search
                </button>
              </Link>
            </div>
          </div>
          <Route path="/search" component={SearchView} />
          <Route path="/createListing" component={CreateListingView} />
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
