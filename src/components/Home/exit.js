import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Avatar} from 'antd/lib';

class Exit extends Component {
    exitEvent() {
        this.props.history.push({pathname:'/'});
    }
    render() {
        return (
            <div onClick={() => { this.exitEvent() }} style={{marginBottom:'5px'}} ><Avatar style={{fontSize:'18px',color:'black'}} size={40}>{this.props.name}</Avatar></div>
           
        );
    }
}
export default withRouter(Exit);