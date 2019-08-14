import React from 'react';
import {Button, Icon, Input, Modal, Table} from 'antd';
import "../batchSearch/batchSearch.css"
import AddButton from "../BlockQuote/newButton";
import CancleButton from "../BlockQuote/cancleButton";

export default class AddPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
    }
    showModal=()=>{
        this.setState({visible:true})
    }
    handleCancel=()=>{
        this.setState({visible:false})
    }
    render(){
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus'/>
                <Modal title="新增" visible={this.state.visible}
                       width="720px"
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                       ]}>
                    <div>
                        <div>
                            <span>
                                <span className={"firstLine"}>工序:&nbsp;</span>
                                <span className={"secondLine"}>开始时间:&nbsp;</span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>年份:&nbsp;</span>
                                <span className={"secondLine"}>产品类型:&nbsp; </span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>月份:&nbsp;</span>
                                <span className={"secondLine"}>流水号:&nbsp;</span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>产品型号:&nbsp;</span>
                                <span className={"secondLine"}>生产线:&nbsp;</span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>原材料类型:&nbsp;</span>
                                <span className={"secondLine"}>槽次:&nbsp;</span>
                            </span ><br/>
                            <span >
                                <span className={"firstLine"}>槽号:&nbsp;</span>
                                <span className={"secondLine"}>时间点:&nbsp;</span>
                            </span>
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
}

