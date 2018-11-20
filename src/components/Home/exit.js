import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Avatar} from 'antd/lib';
import Auth from '../auth/Auth';

class Exit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content : <div onClick={() => { this.exitEvent() }} style={{marginBottom:'5px'}} ><Avatar style={{fontSize:'18px',color:'black'}} size={40}>{this.props.name}</Avatar></div>
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