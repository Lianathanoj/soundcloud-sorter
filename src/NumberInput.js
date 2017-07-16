import React, { Component } from 'react';

class NumberInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        e.target.value == null ? this.props.handleChange(0) : this.props.handleChange(e.target.value);

    }

    render() {
        return (
            <div>
                <input placeholder="Number of Songs" value={this.props.numSongsToLoad} onChange={this.handleChange} />
            </div>
        );
    }
}

export default NumberInput;