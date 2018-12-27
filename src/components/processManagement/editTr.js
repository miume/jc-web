import React from "react";
import axios from "axios";
import "./difference.css";
import { Select } from 'antd';

const Option = Select.Option;


class EditTr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            approvalProcess:[],
            loading : false,
        }
        this.server = localStorage.getItem("remote")
    }
    getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: `${this.server}/jc/common/authUser/getAll`,
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
    };
    onChange = (value)=>{
        
    }

    render(){
        const children = this.state.approvalProcess.map(p => 
            <option id={p.id} key={p.id} value={p.id}>{p.name}</option>
        )
        return(
            this.props.detail.map((m,i)=>{
                return (
            <tr className='tbody' key={i}>
                <td style={{width:"170px"}}><select style={{border:"none"}} defaultValue={m.userId} id="sleID" name="sleID" className="sleID" placeholder="请选择负责人">{children}</select></td>
                <td style={{width:"155px"}}><input name="input" onChange={this.onChange} style={{border:"none"}} className="proinputName" value={m.responsibility} placeholder="请输入职责"/></td>
                <td style={{width:"146px"}}><span style={{width:'100%'}} className="blue" onClick={()=>this.props.deleteRow(m.id)} value={m.id}>删除</span></td>
            </tr>
        )})
        )
    }
}

export default EditTr