import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500} from 'material-ui/styles/colors';

const styles = {
    underlineStyle: {
        borderColor: orange500
    }
};

class NumberInput extends Component {
    handleChange = (e) => {
        let input = e.target.value;
        input == null ? this.props.handleChange(0) : this.props.handleChange(input);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit();
    }

    onFocus = (e) => {
        this.props.onFocus(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    placeholder="# Songs"
                    value={this.props.numSongsToLoad}
                    onChange={this.handleChange}
                    onFocus={this.onFocus}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineStyle}
                />
                <RaisedButton type="submit" label="Add" />
            </form>
        );
    }
}

export default NumberInput;