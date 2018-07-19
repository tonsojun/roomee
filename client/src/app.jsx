import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchView from './searchView.jsx';
import LoginView from './loginView.jsx';
//import as needed: createListingView and houseListingView



export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      //set state here for entire app
      //we need to look into redux
    }


  }
/********* Ajax Requests **********/

  //ajax here?

/********* Ajax Requests **********/



/********* Helpers **********/

  //helper functions/ event functions here?

/********* Helpers **********/



/********* Render **********/

  render () {
    return (
      <div className="app">
        <h1>Roomie</h1>
        <LoginView/>
        <SearchView/>
      </div>
      )
  }

/********* Render **********/



}