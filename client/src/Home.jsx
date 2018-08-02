import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import ListItemRoom from './ListItemRoom.jsx';
import DetailsRoom from './DetailsRoom.jsx';

var mostRate = {
    background:'#eee',
    textAlign:'center',
    fontSize: '3em'
}

class Home extends React.Component  {
    constructor (props) {
      super(props);
      this.state = {
        listRoom : [],
        detRoom : {}
      }
      this.load();
    }

    load () {
        // get request fetches the zipcode of the user's IP address and calls onEnterSite
          $.ajax({
            url: 'http://127.0.0.1:3000/searchListing',
            success: (data) => {
              this.setState({
                listRoom : data
              })
            },
            error: (err) => {
             // console.log('mon error c', err);
            }
        });
    }
    handleClickitem(room) {
        console.log("The funcking room 's ",room)
        this.setState({
          detRoom: room,
          showDetailsComponent:true
        });
      }

    render(){
        console.log("See my",this.state.listRoom);
    return (
        <div>
            <section className="hero is-medium is-primary">
                <div className="hero-body">
                <h1 className="title is-1">
                Welcome to Roomee
                </h1>
                    <h2 className="subtitle is-2">
                        We're not craigslist.
                    </h2>
                </div>
           
            </section>
            <div> 
            {
                this.state.showDetailsComponent === true  ? <DetailsRoom listing = {this.state.detRoom} />: null
            }
            </div>
            
            <nav >
                <div style={mostRate}> The most rate  </div>
                {
                    this.state.listRoom.map(room =>
                    < ListItemRoom room = {room}
                        key = {room.id} 
                        handleClickitem={this.handleClickitem.bind(this)}
                    />
                    )
                }
            </nav>
        </div>
     )
    }
}

export default Home;