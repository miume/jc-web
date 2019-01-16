import React from 'react';
import axios from 'axios';
import {Input,Upload,Button,Icon} from 'antd';

class Tr extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <tr>
                <td><Input style={{border:'none'}} placeholder='每日点检内容' value="内容1"/></td>
                <td><Input style={{border:'none'}} placeholder='检查标准' value="标准1"/></td>
                <td><Input style={{border:'none'}} placeholder='频次' value="频次"/></td>
                <td></td>
                <td style={{textAlign:"center"}}><span style={{width:'100%'}} href='#' className="blue" onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        )
    }
}

export default Tr;