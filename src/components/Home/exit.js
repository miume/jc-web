import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Icon} from 'antd/lib';

class Exit extends Component {
    exitEvent() {
        this.props.history.push({pathname:'/'});
    }
    render() {
        return (
            <div style={{padding:'5px'}} onClick={() => { this.exitEvent() }} > <Icon type="login" theme="outlined" style={{color:"white",fontSize:"22px"}} /></div>
           
        );
    }
}
export default withRouter(Exit);