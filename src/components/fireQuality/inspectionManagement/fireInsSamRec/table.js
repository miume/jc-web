import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
// import AddModal from "./add/addModal";
import axios from "axios";
// import DetailModal from "./detailModal"
import DetailModal from "../fireInsRegister/detailModal";
import PrintModal from "../fireInsSamRec/printModal"
import Refuse from "../fireInsSamRec/refuse";
class SamRecTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };

        this.columns = [{
            title:'序号',
            key:'col1',
            dataIndex:'col1',
            width: '5%'
        },{
            title:'批号',
            key:'col2',
            dataIndex:'col2',
            width: '15%'
        },{
            title:'检测项目',
            key:'col3',
            dataIndex:'col3',
            width: '15%',
            render:((text,record) => {
                var value = "";
                if (text.length > 20){
                    value = text.substring(0,20)
                }else{
                    value = text;
                }
                return(
                    <span title={text}>{value + " ..."}</span>
                )
            })
        },{
            title:'送检部门',
            key:'col4',
            dataIndex:'col4',
            width: '8%'
        },{
            title:'送检人',
            key:'col5',
            dataIndex:'col5',
            width: '7%'
        },{
            title:'登记时间',
            key:'col6',
            dataIndex:'col6',
            width: '15%'
        },{
            title:'确认时间',
            key:'col7',
            dataIndex:'col7',
            width: '15%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '20%',
            render: ((text,record) => {
                return (
                    <span>
                        <DetailModal url={this.props.url} flag={1} record={record}/>
                        <Divider type={'vertical'}/>
                        <PrintModal />
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定接受吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleAccept(record.code)}>
                            <span  className={'blue'}>接受</span>
                        </Popconfirm>
                        <Divider type={'vertical'}/>
                        <Refuse record={record} url={this.props.url} getTableParams={this.props.getTableParams}/>
                        {/*<Popconfirm title={'确定拒绝吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleRefuse(record.code)}>*/}
                            {/*<span className={'blue'}>拒绝</span>*/}
                        {/*</Popconfirm>*/}
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            })
        }]
    }

    render() {
        let {dataSource,selectedRowKeys,onSelectChange,handleTableChange} = this.props,
            rowSelection = {
                selectedRowKeys,
                onChange: onSelectChange,
            };
        return (
            <Table rowKey={record => record.code} rowSelection={rowSelection} columns={this.columns}
                   dataSource={dataSource} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }
    handleAccept = (code) => {
        console.log(code)
        axios({
            url:`${this.props.url.fireInsSamRec.sampleReceive}`,
            method:'put',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id: code,
                flag: 1
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableParams(); //删除后重置信息
        }).catch(()=>{
            message.info('接受失败，请联系管理员！');
        });
    }
    // handleRefuse = (code) => {
    //     console.log(code)
    //     axios({
    //         url:`${this.props.url.fireInsSamRec.sampleReceive}`,
    //         method:'put',
    //         headers:{
    //             'Authorization':this.props.url.Authorization
    //         },
    //         params:{
    //             id: code,
    //             flag: 2
    //         }
    //     }).then((data)=>{
    //         message.info(data.data.message);
    //         this.props.getTableParams(); //删除后重置信息
    //     }).catch(()=>{
    //         message.info('拒绝失败，请联系管理员！');
    //     });
    // }

    handleDelete = (code) => {
        console.log(code)
        axios({
            url:`${this.props.url.fireInsSamRec.sampleReceive}/${code}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableParams(); //删除后重置信息
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
}

export default SamRecTable;
