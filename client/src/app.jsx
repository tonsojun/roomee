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
      currentHouseView: {}
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
      .catch(err => console.log(err) );
      this.onEnterSite()
    }

    onEnterSite() {
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
  /* ******** Helpers and Events **********/

  /* ******** Render **********/

  render () {

    const renderHouseListingView = (props) => {
      return (
        <HouseListingView
        currentHouseView={this.state.currentHouseView}
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

    return (
      <Router>
        <div className="app">
          <h1 className="title">
          Roomee
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

          <Link to="/signUpView" style={{ textDecoration: 'none', color: '#888' }}>
            <h4 className="link">
            Sign Up
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
          <Route path="/signUpView" component={SignUpView} />
          <Route path="/house" render={renderHouseListingView} />
        </div>
      </Router>
    );
  }

  /* ******** Render **********/
}
