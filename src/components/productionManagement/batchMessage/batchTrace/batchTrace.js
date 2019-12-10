import React from "react";
// import Blockquote from "../../BlockQuote/blockquote";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import {Table, message, Spin, Divider,Modal,Button} from "antd";
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
            dataSource: [],
            selectedRowKeys: [],
            loading: false,
            searchContent:'',
            searchText: '',
            visible:false,
            batchId:undefined
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
            width: '5%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            width: '11%',
        },{
            title: '批次生成时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '11%',
        },{
            title: '生成人',
            dataIndex: 'createName',
            key: 'createName',
            width: '8%',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '11%',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '11%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '7%',
            render:(text,record)=>{
                return(
                    <span>
                        <Detail batchId={this.state.batchId} url={this.url}/>
                    </span>
                )
            }
        }]
        this.handleCancel=this.handleCancel.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
    }
    componentDidMount(){
        this.props.onRef(this)//ref使得父组件可以使用子组件的方法
    }

    handleCreate(){
        this.setState({
            loading:true
        })
        let userName=JSON.parse(localStorage.getItem('menuList')).name,
            {batchData}=this.props,
             params={
            creater:userName,
            batch:batchData[0].batch
        }
        axios({
            url:this.url. productionBatchInfo.preview,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then(data=>{
            if(data.data.code===0){
                let res=[data.data.data],
                     batchId=data.data.data.code
                for(let i=0;i<res.length;i++){
                    res[i]['index']=i+1
                }
                this.setState({
                    batchId:batchId,
                    dataSource:res,
                    loading:false
                })
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.setState({
            visible:false
        })
    }
   
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return(
            <span>
                <Button type='primary' onClick={this.props.showModal} disabled={!this.props.selectedRowKeys.length>0}>批次追溯预览</Button>
                <Spin spinning={this.state.loading}>
                    <Modal
                    title='批次追溯预览'
                    visible={this.props.visiable}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width='850px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.props.handleBack} flag={true}/>                
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
                </Spin>
            </span>
        )
    }
}

export default BatchInfoTrace
