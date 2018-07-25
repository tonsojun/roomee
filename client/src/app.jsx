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
      term: '',
      listings: []
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }
  /*  ******** axios Requests **********/
  componentDidMount() {
    axios.get('/searchListing')
      .then((res) => {
        console.log('componentDidMount', res.data);
        this.setState({
          listings: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSearch (event) {
    event.preventDefault();
    const { term } = this.state;
    axios.get('/searchListing', { params: {term : term} })
      .then((res) => {
        console.log(`-------> Folowing data returned from server GET -> ${res}`);
        //  is res.data or res an array?
        this.setState({
          listings : res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmitPost (newListingData) {
    axios.post('/listing', newListingData)
    .then((res) => {
      console.log(`-------> Folowing data returned from server POST -> ${res}`)
    })
    .catch((err) => {
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

  /* ******** Helpers and Events **********/

  /* ******** Render **********/

  render () {

    const renderSearchView = (props) => {
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

    const renderCreateListingView = (props) => {
      return (
        <CreateListingView
          onSubmit={this.onSubmitPost}
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

          <Link to="/" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            Home
            </h4>
          </Link>

          <Link to="/createListing" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            New Listing
            </h4>
          </Link>

          <Link to="/loginView" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            Login
            </h4>
          </Link>

          <Link to="/search" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            Search
            </h4>
          </Link>

          <Route path="/search" render={renderSearchView} />
          <Route path="/createListing" render={renderCreateListingView} />
          <Route path="/loginView" component={LoginView} />

        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
