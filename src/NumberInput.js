import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class NumberInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        e.target.value == null ? this.props.handleChange(0) : this.props.handleChange(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField placeholder="Number of Songs" value={this.props.numSongsToLoad} onChange={this.handleChange} />
                <RaisedButton type="submit" label="Submit" />
            </form>
        );
    }
}

export default NumberInput;