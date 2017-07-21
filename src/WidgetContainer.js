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
        if (this.props.widgetsExist) {
            return (
                <div>
                    <Table>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn style={{width: '30%', textAlign: 'center'}}>Song</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '10%', textAlign: 'center'}}>
                                    {this.props.sortType === MOST_FAVORITES
                                        ? "Favoritings Count"
                                        : "Playback Count"}
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    style={{width: '50%', textAlign: 'center'}}>Widget</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                        >
                            {widgets.map((widget, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableRowColumn style={{width: '30%', textAlign: 'center'}}>
                                            {widget.title}
                                        </TableRowColumn>
                                        <TableRowColumn style={{width: '10%', textAlign: 'center'}}>
                                            {this.props.sortType === MOST_FAVORITES
                                                ? this.props.tracks[index].favoritings_count
                                                : this.props.tracks[index].playback_count}
                                        </TableRowColumn>
                                        <TableRowColumn style={{width: '50%', textAlign: 'center'}}>
                                            <SongWidget widget={widget}/>
                                        </TableRowColumn>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default WidgetContainer;
