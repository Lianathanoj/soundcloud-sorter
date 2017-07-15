import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import SongContainer from './SongContainer';
var SC = require('soundcloud');

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          numSongs: 0,
          sortType: "default",
          searchText: ""
      };
      this.initializeSoundCloud();
  }

  initializeSoundCloud() {
      SC.initialize({
          client_id: 'kMY1mdglCWG4Y1hgWMc5P7T60bK5pKT9',
          redirect_uri: ''
      });
  }

  handleSearchBarChange = (text) => {
      this.setState({ searchText: text });
  }

  handleSearchBarSubmit = () => {
      this.testLoadWidgets();
      this.setState({ searchText: "" });
  }

  testLoadWidgets = () => {
      SC.resolve("https://soundcloud.com/" + this.state.searchText + "/tracks").then(function(tracks) {
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
        <SearchBar handleChange={this.handleSearchBarChange} handleSubmit={this.handleSearchBarSubmit} searchText={this.state.searchText}/>
        <CategorySelector />
        <SongContainer />
        <button onClick={this.testLoadWidgets}>testing</button>
      </div>
    );
  }
}

export default App;
