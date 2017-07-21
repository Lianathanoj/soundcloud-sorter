import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.png';
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
          numSongsToLoad: "5 Songs",
          sortType: MOST_FAVORITES,
          searchText: "",
          widgetsMap: {},
          widgetsExist: false
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

  handleNumberInputFocus = (event) => {
      if (event.includes(" Songs")) {
          this.setState({ numSongsToLoad: event.slice(0, event.length - 6)});
      }
  }

  handleNumberInputBlur = () => {
      if (!this.state.numSongsToLoad.includes(" Songs")) {
          this.setState({ numSongsToLoad: this.state.numSongsToLoad.replace(/\D/g, "") + " Songs"} );
      }
  }

  handleNumberInputSubmit = (number) => {
      if (this.state.searchText.length !== 0) {
          if (this.state.tracks == null) {
              this.getTracks();
          } else {
              this.createWidgets();
          }
      }
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
      let numSongsAfterLoad = ~~this.state.numSongs + ~~this.state.numSongsToLoad.replace(/\D/g, "").trim();
      for (let i = this.state.numSongs; i < numSongsAfterLoad; i++) {
          SC.oEmbed(this.state.tracks[i].permalink_url, {maxheight: 200}).then(widget => {
              let widgetsMap = this.state.widgetsMap;
              widgetsMap[i] = widget;
              this.setState({ widgetsMap: widgetsMap });
          });
      }
      this.setState({ numSongs: numSongsAfterLoad });
      this.setState({ widgetsExist: true });
  }

  sortFavorites = (x, y) => y.favoritings_count - x.favoritings_count;

  sortPlaybacks = (x, y) => y.playback_count - x.playback_count;

  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <link href="https://fonts.googleapis.com/css?family=Roboto:400" rel="stylesheet"/>
              <img src={logo} className="logo" alt="logo" />
              <h2>SoundCloud Song Sorter</h2>
            </div>
            <div>
                <SearchBar handleChange={this.handleSearchBarChange} handleSubmit={this.handleSearchBarSubmit} searchText={this.state.searchText}/>
                <NumberInput handleChange={this.handleNumberInputChange} onBlur={this.handleNumberInputBlur} onFocus={this.handleNumberInputFocus} handleSubmit={this.handleNumberInputSubmit} numSongsToLoad={this.state.numSongsToLoad}/>
                <CategorySelector handleChange={this.handleCategorySelectorChange} currentSelection={this.state.sortType}/>
                <WidgetContainer widgetsExist={this.state.widgetsExist} numSongs={this.state.numSongs} widgetsMap={this.state.widgetsMap} tracks={this.state.tracks} sortType={this.state.sortType}/>
            </div>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
