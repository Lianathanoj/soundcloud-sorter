import React, { Component } from 'react';
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

class WidgetContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let widgets = [];
        for (let i = 0; i < this.props.numSongs; i++) {
            widgets.push(this.props.widgetsMap[i]);
        }
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Song</TableHeaderColumn>
                            <TableHeaderColumn>
                                {this.props.sortType === MOST_FAVORITES
                                    ? "Favoritings Count"
                                    : "Playback Count"}
                            </TableHeaderColumn>
                            <TableHeaderColumn>Widget</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {widgets.map((widget, index) =>  {
                            return (
                                <TableRow>
                                    <TableRowColumn>{widget.title}</TableRowColumn>
                                    <TableRowColumn>
                                        {this.props.sortType === MOST_FAVORITES
                                        ? this.props.tracks[index].favoritings_count
                                        : this.props.tracks[index].playback_count}
                                    </TableRowColumn>
                                    <TableRowColumn><SongWidget widget={widget}/></TableRowColumn>
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
