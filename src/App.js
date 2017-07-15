import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import WidgetContainer from './WidgetContainer';
var SC = require('soundcloud');

const DEFAULT = "default";
const MOST_FAVORITES = "favorites";
const MOST_PLAYBACKS = "playbacks";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          numSongs: 0,
          numSongsToLoad: 5,
          sortType: DEFAULT,
          searchText: "",
          widgets: []
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
      this.getTracks();
      this.setState({ searchText: "" });
  }

  handleCategorySelectorChange = (category) => {
      this.setState({ sortType: category });
      this.sortTracks();
      this.createWidgets();
  }

  sortTracks = () => {
      if (this.state.sortType === MOST_FAVORITES) {
          this.state.tracks.sort(this.sortFavorites);
      } else if (this.state.sortType === MOST_PLAYBACKS) {
          this.state.tracks.sort(this.sortPlaybacks);
      }
  }

  getTracks = () => {
      SC.resolve("https://soundcloud.com/" + this.state.searchText + "/tracks").then(returnedTracks => {
          this.setState({ tracks: returnedTracks });
          this.sortTracks();
          this.createWidgets();
      });
  }

  createWidgets = () => {
      for (var i = this.state.numSongs; i < i + this.state.numSongsToLoad; i++) {
          SC.oEmbed(this.state.tracks[i].permalink_url, {maxheight: 200}).then(widget => {
              this.setState({ widgets: [...this.state.widgets, widget] });
          });
      }
      this.setState({ numSongs: this.state.numSongs + this.state.numSongsToLoad });
  }

  sortFavorites = (x, y) => y.favoritings_count - x.favoritings_count;

  sortPlaybacks = (x, y) => y.playback_count - x.playback_count;

  render() {
    return (
      <div className="App">
          <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SoundCloud Specific Song Sorter</h2>
        </div>
        <SearchBar handleChange={this.handleSearchBarChange} handleSubmit={this.handleSearchBarSubmit} searchText={this.state.searchText}/>
        <CategorySelector handleChange={this.handleCategorySelectorChange} currentSelection={this.state.sortType}/>
        <WidgetContainer widgets={this.state.widgets}/>
      </div>
    );
  }
}

export default App;
