import React, { Component } from 'react';

class SongWidget extends Component {createMarkup = () => {
        return {__html: this.props.widget.html }
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={this.createMarkup()}/>
        );
    }
}

export default SongWidget;
