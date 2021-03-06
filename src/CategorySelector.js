import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class CategorySelector extends Component {
    handleChange = (event, index, value) => {
        this.props.handleChange(value);
    }

    render() {
        return (
            <div>
                <SelectField
                    value={this.props.currentSelection}
                    onChange={this.handleChange}
                    selectedMenuItemStyle={{color: '#E84C06'}}
                >
                    <MenuItem value={"favorites"} primaryText="Sort by most favorites"/>
                    <MenuItem value={"playbacks"} primaryText="Sort by most playbacks"/>
                </SelectField>
            </div>
        );
    }
}

export default CategorySelector;