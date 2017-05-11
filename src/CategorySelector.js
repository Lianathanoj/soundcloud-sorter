import React, { Component } from 'react';

class CategorySelector extends Component {
    render() {
        return (
            <select>
                <option>Default</option>
                <option>Sort by most favorites</option>
                <option>Sort by most playbacks</option>
            </select>
        );
    }
}

export default CategorySelector;