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
                <td style={{width:'24%'}}><Input style={{border:'none'}} placeholder='每日点检内容'/></td>
                <td style={{width:'24%'}}><Input style={{border:'none'}} placeholder='检查标准'/></td>
                <td style={{width:'18.5%'}}><Input style={{border:'none'}} placeholder='频次'/></td>
                <td style={{width:'19%'}}></td>
                <td style={{textAlign:"center"}}><span style={{width:'100%'}} href='#' className="blue" onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        )
    }
}

export default Tr;