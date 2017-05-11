import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './CategorySelector';
import './SearchBar';
import './SongContainer';

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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SoundCloud Specific Song Sorter</h2>
        </div>
        <p>
          Put songs here
        </p>
      </div>
    );
  }
}

export default App;
