import React, { Component } from 'react';

class CategorySelector extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.handleChange(e.target.value);
    }

    render() {
        return (
            <select value={this.props.currentSelection} onChange={this.handleChange}>
                <option value="favorites">Sort by most favorites</option>
                <option value="playbacks">Sort by most playbacks</option>
            </select>
        );
    }
}

export default CategorySelector;