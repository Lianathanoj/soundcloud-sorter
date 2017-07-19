import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
                <TextField
                    placeholder="Input an artist's profile URL."
                    value={this.props.searchText}
                    onChange={this.handleChange}
                />
                <RaisedButton type="submit" label="submit"/>
            </form>
        );
    }
}

export default SearchBar;