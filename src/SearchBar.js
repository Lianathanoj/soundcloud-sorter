import React, { Component } from 'react';
var axios = require('axios');

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.searchText.length !== 0) {
            this.props.handleSubmit();
        }
    }

    handleChange = (e) => {
        this.props.handleChange(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Input an artist's profile URL." value={this.props.searchText} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SearchBar;