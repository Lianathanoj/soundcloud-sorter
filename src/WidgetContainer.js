import React, { Component } from 'react';
import './App.css';
import SongWidget from './SongWidget';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const MOST_FAVORITES = "favorites";
const MOST_PLAYBACKS = "playbacks";
var columnStyle = {
    textAlign: 'center'
};

class WidgetContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false
        };
    }

    render() {
        let widgets = [];
        for (let i = 0; i < this.props.numSongs; i++) {
            widgets.push(this.props.widgetsMap[i]);
        }
        return (
            <div>
                <Table>
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableHeaderColumn style={columnStyle}>Song</TableHeaderColumn>
                            <TableHeaderColumn style={columnStyle}>
                                {this.props.sortType === MOST_FAVORITES
                                    ? "Favoritings Count"
                                    : "Playback Count"}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={columnStyle}>Widget</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                    >
                        {widgets.map((widget, index) =>  {
                            return (
                                <TableRow>
                                    <TableRowColumn style={columnStyle}>
                                        {widget.title}
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        {this.props.sortType === MOST_FAVORITES
                                        ? this.props.tracks[index].favoritings_count
                                        : this.props.tracks[index].playback_count}
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        <SongWidget widget={widget}/>
                                    </TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default WidgetContainer;
