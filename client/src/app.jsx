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

    const renderSearchView = (props) => {
      return (
        <SearchView
          value={term}
          // {...props}
        />
      );
    }
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
