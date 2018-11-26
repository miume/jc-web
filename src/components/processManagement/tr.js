import React from 'react';
import {Select,Input,Popover,Button,Checkbox,Row,Col} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class Tr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            hovered: false,
            approvalProcess:[],
            loading : false
        }
        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
    }
    getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: 'http://2p277534k9.iok.la:58718/jc/authUser/getAll',
            method:'get',
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            console.log(res)
            this.setState({
                approvalProcess : res,
                loading: false,
            })
        })
    };
    componentDidMount() {
        this.getAllUser();
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
        const children = this.state.approvalProcess.map(p => 
            <Option key={p.id}>{p.name}</Option>
        )
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