import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Input an artist's profie URL." value={this.state.text} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SearchBar;