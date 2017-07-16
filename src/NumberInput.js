import React, { Component } from 'react';

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
                <input placeholder="Number of Songs" value={this.props.numSongsToLoad} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NumberInput;