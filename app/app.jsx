'use strict';

//import {ipcRenderer as ipc} from 'electron';

import React from 'react';
import ReactDOM from 'react-dom';
import createHashHistory from 'history/lib/createHashHistory';

import {Router, Route, IndexRoute, NotFoundRoute, Redirect } from 'react-router';

//Helpers for debugging
window.React = React;
//window.Perf = require('react-addons-perf');

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            margin: '10cm',

            rows: [
                [
                    { a:1, b:2, c:'xxxxx'},
                    { a:1, b:2, c:'xxxxx'},
                    { a:1, b:2, c:'xxxxx'},
                    { a:1, b:2, c:'xxxxx'},
                ],
                [
                    { a:1, b:2, c:'xxxxx11'},
                    { a:1, b:2, c:'xxxxx22'},
                    { a:1, b:2, c:'xxxxx33'},
                    { a:1, b:2, c:'xxxxx44'},
                ],
                [
                    { a:1, b:2, c:'xxxxx11'},
                    { a:1, b:2, c:'xxxxx22'},
                    { a:1, b:2, c:'xxxxx33'},
                    { a:1, b:2, c:'xxxxx44'},
                ]
            ],
        }
    }
    
    print () {

        this.setState({ margin: '0cm' });
        ipc.send('print');
    }

    render () {
        let printCSS = { margin: this.state.margin };

        return <div style={printCSS}>
                <div onClick={this.print.bind(this)}>ddddd</div>
                <a href='http://localhost:3000'>dddddd</a>
                <PrintTable rows={this.state.rows}></PrintTable>
            </div>;
    }

}

class PrintTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };

    }

    render () {
        let rows = this.props.rows;

        return <div>
            {
                rows.map( (row) => {
                    return <table className="print print-section" style={{ border: '1px solid', margin: 130 }}>
                        <tbody>
                            {
                                row.map( (item) => {
                                    return <tr>
                                        <td style={{ padding: 20 }}>{item.a}</td>
                                        <td style={{ padding: 20 }}>{item.b}</td>
                                        <td style={{ padding: 20 }}>{item.c}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                })
            }
        </div>
    }

}

const routes = (
    <Route path='/' component={App}>
    </Route>
);

const history = createHashHistory({
  queryKey: false
});

ReactDOM.render(
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>{routes}</Router>,
    document.getElementById('app')
);