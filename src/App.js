import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import SongContainer from './SongContainer';
var SC = require('soundcloud');
var axios = require('axios');

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          numSongs: 0,
          sortType: "default",
      };
      this.initializeSoundCloud();
  }

  initializeSoundCloud() {
      SC.initialize({
          client_id: 'kMY1mdglCWG4Y1hgWMc5P7T60bK5pKT9',
          redirect_uri: ''
      });
  }

  testLoadWidgets = () => {
      axios.get("https://api-v2.soundcloud.com/search/queries?q=test&client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=10&offset=0&linked_partitioning=1&app_version=1500036064").then(response => console.log(response));
      SC.resolve("https://soundcloud.com/oshi/tracks").then(function(tracks) {
          console.log(tracks);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SoundCloud Specific Song Sorter</h2>
        </div>
        <p>
          <SearchBar />
          <CategorySelector />
          <SongContainer />
        </p>
        <button onClick={this.testLoadWidgets}>testing</button>
      </div>
    );
  }
}

export default App;
