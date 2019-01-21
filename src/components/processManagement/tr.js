import React from 'react';
import axios from 'axios';
import "./difference.css";
import { Select } from 'antd';

const Option = Select.Option;

class Tr extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            approvalProcess:[],
            loading : false,
            // searchContent : []
        }
        this.server = localStorage.getItem("remote")
        // this.searchContentChange=this.searchContentChange.bind(this)
    }
    getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: `${this.url.authUser.getAll}`,
            method:'get',
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    approvalProcess : res,
                    loading: false,
                })
            }
        })
    };
    componentDidMount() {
        this.getAllUser();
    }
    // /**获取查询时菜单名称的实时变化 */
    // searchContentChange(e){
    //     const value = e.target.value;
    //     this.setState({searchContent:value});
    // }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const children = this.state.approvalProcess.map(p => 
            <option className="option" id={p.id} key={p.id} value={p.id}>{p.name}</option>
        )
        return(
            <tr>
                <td><select style={{border:"none"}} className="proselect" name="select" placeholder="请选择负责人">{children}</select></td>
                <td><input name="input" id="input" className="proinput" style={{border:"none"}} placeholder="请输入职责"/></td>
                <td><span style={{width:'100%'}} href='#' className="blue" onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        )
    }
}

export default Tr;