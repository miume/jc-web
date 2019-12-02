import React from 'react';
import {Modal,Tabs} from 'antd';
import WhiteSpace from '../../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import Instrument from "./instrument";
import Assay from "./assay";
import Device from "./device";

const TabPane=Tabs.TabPane;
class Detail extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            visible : false,
            data : [],
        }
    }
    callback=(key)=>{
        console.log(key);
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
    }
    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }
    render(){
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='详情'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                        <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                            <TabPane tab={<span>仪器仪表数据</span>} key='1'>
                                <Instrument type={1}/>
                            </TabPane>
                            <TabPane tab={<span>设备维修保养数据</span>} key='2'>
                                <Device type={2}/>
                            </TabPane>
                            <TabPane tab={<span>化验数据</span>} key='3'>
                                <Assay type={3}/>
                            </TabPane>
                        </Tabs>
                </Modal>
            </span>
        )
    }
}

export default Detail