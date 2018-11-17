import React from 'react';
import {Select,Input,Popover,Button,Checkbox,Row,Col} from 'antd';

const Option = Select.Option;
const approvalProcess = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
}]

const children = approvalProcess.map(p => 
    <Option key={p.id}>{p.name}</Option>
)

class Tr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            hovered: false,
        }
        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
    }
    hide(){
        this.setState({
            clicked:false
        })
    }
    handleClickChange(){
        this.setState({clicked:true})
    }
    render(){
        return(
            <tr className='tbody' id={this.props.value}>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Input /></td>
                <td><a href='#' onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</a></td>
            </tr>
        )
    }
}

export default Tr;