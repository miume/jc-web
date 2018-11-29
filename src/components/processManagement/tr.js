import React from 'react';
import {Select,Input,Popover,Button,Checkbox,Row,Col} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class Tr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            approvalProcess:[],
            loading : false,
            searchContent : []
        }
        this.searchContentChange=this.searchContentChange.bind(this)
    }
    getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: 'http://2p277534k9.iok.la:58718/jc/authUser/getAll',
            method:'get',
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                approvalProcess : res,
                loading: false,
            })
        })
    };
    componentDidMount() {
        this.getAllUser();
    }
    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    render(){
        const children = this.state.approvalProcess.map(p => 
            <Option key={p.id} value={p.id}>{p.name}</Option>
        )
        return(
            <tr className='tbody' id={this.props.value}>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Input onChange={this.searchContentChange}/></td>
                <td><a href='#' onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</a></td>
            </tr>
        )
    }
}

export default Tr;