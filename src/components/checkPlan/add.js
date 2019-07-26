import React from 'react'
import {Modal, Table} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import TTable from "./ttable"
class Add extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        visible:false
        }
        this.handleAdd=this.handleAdd.bind(this)
        this.onCanCel=this.onCanCel.bind(this)
    }

    handleAdd = () => {
        this.setState({visible: true
        })
        // console.log(this.props.clickdeviceName)
    }
    onCanCel = () => {
        this.setState({visible: false})
    }
    render(){

        return(
            <span>
            <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                width="1000px"
                height="464"
                title="新增数据"
                footer={[
                    <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <TTable/>





            </Modal>
            </span>
        )
    }

}
export  default  Add