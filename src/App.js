import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import WidgetContainer from './WidgetContainer';
import NumberInput from './NumberInput';
var SC = require('soundcloud');

const MOST_FAVORITES = "favorites";
const MOST_PLAYBACKS = "playbacks";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          numSongs: 0,
          numSongsToLoad: 5,
          sortType: MOST_FAVORITES,
          searchText: "",
          widgetsMap: {}
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
  }

  handleNumberInputChange = (number) => {
      this.setState({ numSongsToLoad: number });
  }

  handleCategorySelectorChange = (category) => {
      this.setState({ sortType: category, widgetsMap: {}, numSongs: 0 },
          () => {
              if (this.state.tracks == null) {
                  this.getTracks();
              } else {
                  this.sortTracks();
                  this.createWidgets();
              }
      });
  }

  sortTracks = () => {
      if (this.state.sortType === MOST_FAVORITES) {
          this.state.tracks.sort(this.sortFavorites);
      } else if (this.state.sortType === MOST_PLAYBACKS) {
          this.state.tracks.sort(this.sortPlaybacks);
      }
  }

  getTracks = () => {
      SC.resolve("https://soundcloud.com/" + this.state.searchText + "/tracks")
          .then(returnedTracks => this.setState({ tracks: returnedTracks }))
          .then(() => this.sortTracks())
          .then(() => this.createWidgets());
  }

  createWidgets = () => {
      let numSongsAfterLoad = ~~this.state.numSongs + ~~this.state.numSongsToLoad;
      for (let i = this.state.numSongs; i < numSongsAfterLoad; i++) {
          SC.oEmbed(this.state.tracks[i].permalink_url, {maxheight: 200}).then(widget => {
              let widgetsMap = this.state.widgetsMap;
              widgetsMap[i] = widget;
              this.setState({ widgetsMap: widgetsMap });
          });
      }
      this.setState({ numSongs: numSongsAfterLoad });
  }

  sortFavorites = (x, y) => y.favoritings_count - x.favoritings_count;

  sortPlaybacks = (x, y) => y.playback_count - x.playback_count;

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SoundCloud Specific Song Sorter</h2>
        </div>
        <SearchBar handleChange={this.handleSearchBarChange} handleSubmit={this.handleSearchBarSubmit} searchText={this.state.searchText}/>
        <CategorySelector handleChange={this.handleCategorySelectorChange} currentSelection={this.state.sortType}/>
        <NumberInput handleChange={this.handleNumberInputChange} numSongsToLoad={this.state.numSongsToLoad}/>
        <WidgetContainer numSongs={this.state.numSongs} widgetsMap={this.state.widgetsMap}/>
      </div>
    );
  }
}

export default App;
