import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import TopIcon from './topIcon';
import Auth from '../auth/Auth';

class Exit extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
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
    logout() {
        /**登出时，使登陆背景动图显示 */
        document.getElementById('defaultCanvas0').style.visibility='visible'; 
        var showFrame = setInterval(function() {
            var frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(20);   //恢复帧
                clearInterval(showFrame);
            }
        },100)
    }
    render() {
        return (
            <div id='exit' onClick={this.logout}>
                {this.state.content}
            </div>
        );
    }
}
export default withRouter(Exit);