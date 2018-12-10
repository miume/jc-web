import React from "react";
import axios from "axios";
import {Select} from "antd"

const Option = Select.Option

class EditTr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            approvalProcess:[],
            loading : false,
        }
        this.server = localStorage.getItem('remote');
    }
    getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: `${this.server}/jc/common/authUser/getAll`,
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

    render(){
        const children = this.state.approvalProcess.map(p => 
            <option id={p.id} key={p.id} value={p.id}>{p.name}</option>
        )
        return(
            this.props.detail.map((m,i)=>{
                return (
            <tr className='tbody' key={i}>
                <td><select style={{width:'100%',border:"none"}} defaultValue={m.userId} id="sleID" className="sleID" placeholder="请选择负责人">{children}</select></td>
                <td><input name="input" style={{width:'100%',border:"none"}} defaultValue={m.responsibility} className="inputName" placeholder="请输入职责"/></td>
                <td><span className="blue" onClick={()=>this.props.deleteRow(m.id)} value={m.id}>删除</span></td>
            </tr>
        )})
        )
    }
}

export default EditTr