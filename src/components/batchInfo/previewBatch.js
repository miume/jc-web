import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {Button, Icon, Input, Modal, Select, message, DatePicker, Table,} from 'antd';
import "../batchSearch/batchSearch.css"
import "./batchinfo.css"
import AddButton from "../BlockQuote/newButton";
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import {datas, searchcolums} from "./colums";
const { Option } = Select;
const data1=[{name:"合成",code:'1'},{name:"合成2",code:'2'}]
export default class PreviewBatch extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,          //是否可见
        }
        this.pagination={
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
    }
    showModal=()=>{
        this.setState({visible:true})
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
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <SaveButton key="define" handleSave={this.handleCreate}/>,
                       ]}>
                       <div>
                           <Table
                               className="batchSearch_table"
                               columns={searchcolums}
                               size={"small"}
                               bordered={true}
                               dataSource={datas}
                               scroll={{y:200}}
                               pagination={this.pagination}
                           />
                       </div>
                </Modal>
            </span>
        );
    }
}