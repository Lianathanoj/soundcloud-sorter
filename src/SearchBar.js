import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Input an artist's profile URL."
        }
    }

    render() {
        return (
            <form>
                <input value={this.state.text}></input>
            </form>
        );
    }
}

export default SearchBar;