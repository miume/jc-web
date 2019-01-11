import React from 'react';
import {Modal,Table,Steps, Popover} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import CancleButton from "../BlockQuote/cancleButton";

const columns=[{
        title: '单位/部门',
        dataIndex: 'department' ,
        key: 'department',
        width: '14%',
        align:'center',
    },{
        title: '设备名称',
        dataIndex: 'name' ,
        key: 'name',
        width: '14%',
        align:'center',
    },{
        title: '设备编号',
        dataIndex: 'serialNum' ,
        key: 'serialNum',
        width: '14%',
        align:'center',
    },{
        title: '生产线',
        dataIndex: 'productLine' ,
        key: 'productLine',
        width: '14%',
        align:'center',
    },{
        title: '班次',
        dataIndex: 'class' ,
        key: 'class',
        width: '14%',
        align:'center',
    },{
        title: '报修人',
        dataIndex: 'person' ,
        key: 'person',
        width: '14%',
        align:'center',
    },{
        title: '联系电话',
        dataIndex: 'phone' ,
        key: 'phone',
        width: '14%',
        align:'center',
    }]

const data = [{key:1,department:'部门1',name:'设备1',serialNum:'编号1',productLine:'生产线1',class:'早班',person:'香蕉牛奶',phone:11111222}]

const Step = Steps.Step

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible : false,
            visible1 :false,
            data : [],
            data1 : []
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    handleDetail(){
        this.setState({
            visible:true,
            visible1:true
        });
    }
    handleCancel() {
        this.setState({
        visible: false,
        visible1:false
        });
    }
    render(){
        const content = (
            <div style={{width:"130px"}}>
                故障描述吧啦吧啦
                故障描述吧啦吧啦
            </div>
        )
        const customDot = (dot,{status,index})=>(
            <Popover visible={this.state.visible1} content={content}>
                {dot}
            </Popover>
        )
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title="详情" visible={this.state.visible}
                    width="800px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                    ]}>
                    <div>
                        <Table columns={columns} rowKey={record => record.key} size="small" pagination={false} bordered dataSource={data}/>
                        <WhiteSpace />
                        <div style={{width:'800px',height:'200px'}}></div>
                        <Steps current={1} progressDot={customDot}>
                            <Step title="报修" description="2012-01-01" />
                            <Step title="接单" description="2012-01-01" />
                            <Step title="完工" description="" />
                            <Step title="评价" description="" />
                        </Steps>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default Detail