import React, { Component } from 'react';
import SongWidget from './SongWidget';

class WidgetContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.widgetsMap);
        // console.log('numSongs: ' + this.props.numSongs);
        let widgets = [];
        for (let i = 0; i < this.props.numSongs; i++) {
            widgets.push(this.props.widgetsMap[i]);
        }
        return (
            <div>
                {widgets.map(widget => <SongWidget widget={widget}/>)}
            </div>
        );
    }
}

export default WidgetContainer;
