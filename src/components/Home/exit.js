import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import TopIcon from './topIcon';
import Auth from '../auth/Auth';

class Exit extends Component {
    constructor(props) {
        super(props);
        this.exitEvent = this.exitEvent.bind(this);
        this.state = {
            content : <TopIcon exitEvent={this.exitEvent}  />
        }
    }
    exitEvent() {
        localStorage.clear();
        let newState = {...this.state, content : <Auth/>}
        this.setState(newState)
    }
    render() {
        return (
            <div>
                {this.state.content}
            </div>
        );
    }
}
export default withRouter(Exit);