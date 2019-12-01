import React from "react";
// import Blockquote from "../../BlockQuote/blockquote";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import {Table, message, Spin, Divider,Modal} from "antd";
import BlockQuote from '../../../BlockQuote/blockquote';
import Detail from "./detail";
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
class BatchInfoTrace extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            dataSource: [{
                index:"1",
                batchNumber:"19M01001806TE4S",
                process:"JH",
                createTime:"2019-01-01  12:30",
                person:"张三",
                status:"进行中",
                startTime:"2019-01-01  12:30",
                endTime:"2019-01-01  12:30",
            }],
            selectedRowKeys: [],
            loading: true,
            searchContent:'',
            searchText: '',
            visible:false
        }
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '5%',
        },{
            title: '批次信息',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            align:'center',
            width: '11%',
        },{
            title: '工序',
            dataIndex: 'process',
            key: 'process',
            align:'center',
            width: '11%',
        },{
            title: '批次生成时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center',
            width: '11%',
        },{
            title: '生成人',
            dataIndex: 'person',
            key: 'person',
            align:'center',
            width: '8%',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '10%',
            render: (text, record) => {
                if (record.statusFlag === false) {
                    return (<span><span style={{color:'rgb(75,216,99)'}}><i className='fa fa-circle'></i></span>&nbsp;进行中</span>)
                } else {
                    return (<span><span  style={{color:'rgb(184,231,255)'}}><i className='fa fa-circle'></i></span>&nbsp;已完成</span>)
                }
            }
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '11%',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align:'center',
            width: '11%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '8%',
            render:(text,record)=>{
                return(
                    <span>
                        <Detail />
                    </span>
                )
            }
        }]
        this.showModal=this.showModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        let userId=JSON.parse(localStorage.getItem('menuList')).userId
        console.log(userId)
        let params={
            userId:userId,
            batch:this.props.batch
        }
        axios({
            url:this.url. productionBatchInfo.preview,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then(data=>{
            console.log(data.data.data)
        }).catch()

        this.setState({
            visible:true
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    handleCreate(){

    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        
        return(
            <span>
                <NewButton name='批次追溯预览' handleClick={this.showModal}/>
                <Modal
                title='批次追溯预览'
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                width='800px'
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={true}/>
                    
                ]}
                >
                    <Table  
                        dataSource={this.state.dataSource} 
                        columns={this.column}
                        rowKey={record=>record.index} 
                        pagination={false}
                        size="small" bordered
                    />
                </Modal>
            </span>
        )
    }
}

export default BatchInfoTrace
