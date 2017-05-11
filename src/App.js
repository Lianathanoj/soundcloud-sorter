import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import SongContainer from './SongContainer';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          numSongs: 0,
          sortType: "default",
      };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SoundCloud Specific Song Sorter</h2>
        </div>
        <p>
          <SearchBar />
          <CategorySelector />
          <SongContainer />
        </p>
      </div>
    );
  }
}

export default App;
