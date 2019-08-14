import React from 'react';
import 'moment/locale/zh-cn';
import {Button, Modal, Select, message, Table,} from 'antd';
import "../batchSearch/batchSearch.css"
import "./batchinfo.css"
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import {datas, searchcolums} from "./colums";
export default class PreviewBatch extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,          //是否可见
            dataSource:[],
        }
        this.pagination={
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
    }
    showModal=()=>{
        if(this.props.ifClick==='1'){
            this.setState({
                visible:true,
                dataSource:datas,
            })
        }
        else{
            message.info(this.props.ifClick)
        }
    }
    handleCancel=()=>{
        this.setState({visible:false})
    }
    handleCreate=()=>{
        this.setState({visible:false})
    }
    render(){
        return(
            <span>
                <Button onClick={this.showModal}  type="primary" className={"previewBatch_button"}>批次追溯预览</Button>
                <Modal title="新增" visible={this.state.visible}
                       destroyOnClose={true}
                       width="1000px"
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                       ]}>
                       <div>
                           <Table
                               className="batchSearch_table"
                               columns={searchcolums}
                               size={"small"}
                               bordered={true}
                               dataSource={this.state.dataSource}
                               scroll={{y:200}}
                               pagination={this.pagination}
                               rowKey={record => record.index}
                           />
                       </div>
                </Modal>
            </span>
        );
    }
}