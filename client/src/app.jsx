import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import SearchView from './searchView.jsx';
import LoginView from './loginView.jsx';
import SignUpView from './signUpView.jsx';
import CreateListingView from './createListingView.jsx';
import HouseListingView from './houseListingView.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      listings: [],
      currentHouseView: {},
      justRegistered: false
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }
  /*  ******** axios Requests **********/
  componentDidMount() {
    axios.get('http://ip-api.com/json')
      .then(response => {
        this.setState({
          term: response.data.zip
          // console.log('User\'s Location Data is ', response);
          // console.log('User\'s zip code', response.data.zip);
      });
    })
      .catch(err => console.log(err));
      this.currentZip()
    }

    currentZip() {
    const { term } = this.state;
    axios.get('/searchListing', { params: {zip : term} })
      .then((res) => {
        this.setState({
          listings : res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSearch (event) {
    event.preventDefault();
    const { term } = this.state;
    axios.get('/searchListing', { params: {zip : term} })
      .then((res) => {
         // console.log(`-------> Folowing data returned from server GET -> ${res}`);
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
    //to populate the /house view
    //may want to refactor into two separate handlers
    this.setState({
      currentHouseView: newListingData
    })

    //post request to server
    axios.post('/listing', newListingData)
      .then((res) => {
        // console.log(`-------> Folowing data returned from server POST -> ${res}`)
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }

  /*  ******** axios Requests **********/

  /* ******** Helpers and Events **********/

  onInput (e) {
    this.setState({
      term: e.target.value
    });
    // setTimeout(() => {
    //   console.log(this.state.term, 'term from app');
    // }, 1000);
  }

  onTitleClick (item) {
    this.setState({
      currentHouseView: item
    })
    setTimeout(() => {
      console.log(this.state.currentHouseView, 'currentHouseView from app');
    }, 1000);
  }

  onSignUp (e) {
    //give user a human way to know they have registered
    this.setState({
      justRegistered: true
    });
  }

  /* ******** Helpers and Events **********/

  /* ******** Render **********/

  render () {
    //passing props to views with routes
    const renderHouseListingView = (props) => {
      return (
        <HouseListingView
        currentHouseView={this.state.currentHouseView}
        />
        )
    }

    const renderSignUpView = (props) => {
      return (
        <SignUpView
        onSignUp={this.onSignUp.bind(this)}
        />
        )
    }

    const renderLoginView = (props) => {
      return (
        <LoginView
        registered={this.state.justRegistered}
        />
        )
    }

    const renderSearchView = (props) => {
      return (
        <SearchView
          onInput={this.onInput.bind(this)}
          value={this.state.term}
          listings={this.state.listings}
          onSearch={this.onSearch.bind(this)}
          onTitleClick={this.onTitleClick.bind(this)}
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

    const renderHome = (props) => {
      return (
        <section className="hero is-medium is-primary">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                Welcome to Roomee
                </h1>
                <h2 className="subtitle">
                we're not craigstlist
                </h2>
              </div>
            </div>
          </section>
      );
    };

    return (
      <Router>
        <div className="hero">
          <h1 className="level-item title has-text-centered is-medium">
          Roomee
          </h1>
          <nav className="level container">
            <Link to="/" style={{ textDecoration: 'none', color: '#888' }}>
              <h4 className="level-item has-text-centered heading">
              Home
              </h4>
            </Link>


            <Link to="/search" style={{ textDecoration: 'none', color: '#888' }}>
              <h4 className="level-item has-text-centered heading">
              Search
              </h4>
            </Link>
            <Link to="/createListing" style={{ textDecoration: 'none', color: '#888' }}>
              <h4 className="level-item has-text-centered heading">
              New Listing
              </h4>
            </Link>

            <Link to="/loginView" style={{ textDecoration: 'none', color: '#888' }}>
              <h4 className="level-item has-text-centered heading">
              Login
              </h4>
            </Link>

            <Link to="/signUpView" style={{ textDecoration: 'none', color: '#888' }}>
              <h4 className="level-item has-text-centered heading">
              Sign Up
              </h4>
            </Link>
          </nav>




          <Route exact path="/" render={renderHome} />
          <Route path="/search" render={renderSearchView} />
          <Route path="/createListing" render={renderCreateListingView} />
          <Route path="/loginView" render={renderLoginView} />
          <Route path="/signUpView" render={renderSignUpView} />
          <Route path="/house" render={renderHouseListingView} />

          <footer className="footer">
            <div class="content has-text-centered">
              <h6 className="title">by the roomee project</h6>
            </div>
          </footer>
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
