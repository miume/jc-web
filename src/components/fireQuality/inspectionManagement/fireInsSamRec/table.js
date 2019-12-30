import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
import axios from "axios";
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
            width: '22%',
            render:((text) => {
                var value = "";
                if (text.length > 25){
                    value = text.substring(0,25)
                    return(
                        <span title={text}>{value + " ..."}</span>
                    )
                }else{
                    value = text;
                    return(
                        <span>{value}</span>
                    )
                }
            })
        },{
            title:'送检部门',
            key:'col4',
            dataIndex:'col4',
            width: '8%'
        },{
            title:'登记时间',
            key:'col6',
            dataIndex:'col6',
            width: '10%',
            render:((text) => {
                if (text){
                    return(
                        <span title={text}>{text.split(" ")[0] + " ..."}</span>
                    )
                }else{
                    return(
                        <span>{text}</span>
                    )
                }
            })
        },{
            title:'确认时间',
            key:'col7',
            dataIndex:'col7',
            width: '10%',
            render:((text) => {
                if (text){
                    return(
                        <span title={text}>{text.split(" ")[0] + " ..."}</span>
                    )
                }else{
                    return(
                        <span>{text}</span>
                    )
                }
            })
        },{
            title:'拒绝原因',
            key:'col8',
            dataIndex:'col8',
            width: '10%',
            render: ((text) => {
                var value = "";
                if (text && text.length > 10){
                    value = text.substring(0,10)
                    return(
                        <span title={text}>{value + " ..."}</span>
                    )
                }else{
                    value = text;
                    return(
                        <span>{value}</span>
                    )
                }
            })
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
                        <PrintModal url={this.props.url} record={record}/>
                        <Divider type={'vertical'}/>
                        {record.flag===0?(
                            <Popconfirm title={'确定接收吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleAccept(record.code)}>
                                <span  className={'blue'}>接收</span>
                            </Popconfirm>
                        ):(
                            <span className="notClick">接收</span>
                        )}
                        <Divider type={'vertical'}/>
                        {record.flag===0?(
                            <Refuse record={record} url={this.props.url} getTableParams={this.props.getTableParams}/>
                        ):(
                            <span className="notClick">拒绝</span>
                        )}
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
        let {dataSource,selectedRowKeys,onSelectChange,handleTableChange,total} = this.props,
            rowSelection = {
                selectedRowKeys,
                onChange: onSelectChange,
            };
        this.pagination.total = total ? total : 0;
        return (
            <Table rowKey={record => record.code} rowSelection={rowSelection} columns={this.columns}
                   dataSource={dataSource} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }
    handleAccept = (code) => {
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
            message.info('接收失败，请联系管理员！');
        });
    }

    handleDelete = (code) => {
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
