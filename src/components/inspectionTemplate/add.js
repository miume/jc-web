import React from 'react'
import {message, Modal, Table} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import axios from "axios";
import Mmodal from "./mmodal";
class Add extends React.Component{
    constructor(props) {
        super(props);
        this.state={
             visible:false,
            rightTableData:[]
        }
        this.handleAdd=this.handleAdd.bind(this)
        this.onCanCel=this.onCanCel.bind(this)
    }

    handleAdd = () => {
        this.setState({visible: true
        })
        console.log(this.props.deptCode)

    }

    onCanCel = () => {
        this.setState({visible: false})
    }
    changevisible=()=>{
        this.setState({
            visible:false
        })
    }

    render(){

        return(
            <span>
            <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
             <Mmodal visible={this.state.visible} onCanCel={this.onCanCel} parentname={this.props.parentname} name={this.props.name} operation={this.props.operation} url={this.props.url}
                     deptCode={this.props.deptCode}  userName={this.props.userName} nowDate={this.props.nowDate} fetch={this.props.fetch} changevisible={this.changevisible}/>
            </span>
        )
    }

}
export  default  Add