import React, { Component } from 'react';
import SongWidget from './SongWidget';

class WidgetContainer extends Component {
    constructor(props) {
        super(props);
    }

    testClick = (e) => {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {this.props.widgets.map(widget => <SongWidget widget={widget}/>)}
            </div>
        );
    }
}

export default WidgetContainer;
