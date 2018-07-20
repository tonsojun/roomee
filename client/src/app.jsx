import React from 'react';
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import SearchView from './searchView.jsx';
import LoginView from './loginView.jsx';
import CreateListingView from './createListingView.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // set state here for entire app
      // we need to look into redux
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
    return (
      <Router>
        <div className="app">
          <h1>
          Roomie
          </h1>
          <Link to="/createListing">
            <h4>
            New Listing
            </h4>
          </Link>
          <LoginView />
          <div className="search">
            <input type="text" value="" />
            <Link to="/search">
              <button type="submit">
              Search
              </button>
            </Link>
          </div>
          <Route path="/search" component={SearchView} />
          <Route path="/createListing" component={CreateListingView} />
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
