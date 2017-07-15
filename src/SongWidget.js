import React, { Component } from 'react';
var SC = require('soundcloud');

class SongWidget extends Component {
    constructor(props) {
        super(props);
    }

    createMarkup = () => {
        return {__html: this.props.widget.html }
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={this.createMarkup()}/>
        );
    }
}

export default SongWidget;
