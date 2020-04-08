import React from 'react';
import {Divider, message, Popconfirm, Table} from 'antd';
import axios from "axios";
import Details from "./details";
import Edit from "./tab1/edit";
import "./plan.css"

class InspectionTable extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props)
        this.state={
            isDelete:0,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.renderOperation = this.renderOperation.bind(this);
        this.columns=[{
            title:"序号",
            dataIndex:'index',
            key: 'devicePatrolPlanRecordHead.code',
            align:'center',
            width: '6%',
        },{
            title:"计划名称",
            dataIndex:'devicePatrolPlanRecordHead.planName',
            key: 'devicePatrolPlanRecordHead.planName',
            align:'center',
            width: '10%',
        },{
            title:"巡检模板名称",
            dataIndex:'modelName',
            key: 'modelName',
            align:'center',
            width: '20%',
        },{
            title:"检查类型",
            dataIndex:'devicePatrolPlanRecordHead.checkType',
            key: 'devicePatrolPlanRecordHead.checkType',
            align:'center',
            width: '10%',
            render:(record)=>{
                if(record===true){
                    return "电气类"
                }else{
                    return "机械类"
                }
            }
        },{
            title:"计划日期",
            dataIndex:'devicePatrolPlanRecordHead.planTime',
            key: 'devicePatrolPlanRecordHead.planTime',
            align:'center',
            width: '18%',
        },{
            title:"结束日期",
            dataIndex:'devicePatrolPlanRecordHead.tabulatedate',
            key: 'devicePatrolPlanRecordHead.tabulatedate',
            align:'center',
            width: '18%',
        },{
            title:"操作",
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                const {status,} = this.props;
                return this.renderOperation(text,record,status);
            }
        }]
    }

    render() {
        return (
            <Table
                rowKey={item => item.devicePatrolPlanRecordHead.code}
                dataSource={this.props.rightTableData}
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                columns={this.columns}
                size="small"
                bordered
            />
        )
    }

    renderOperation(text,record,status) {
        if(status === 1) {
            let {deleteFlag,updateFlag}=this.props
            return(
                <span>
                        <Edit updateFlag={updateFlag} planId={record.devicePatrolPlanRecordHead.code} getTableData={this.props.searchEvent}/>
                        {updateFlag?<Divider type='vertical' />:''}
                        <Details code={record.devicePatrolPlanRecordHead.code}/>
                        {deleteFlag?<Divider type='vertical' />:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.devicePatrolPlanRecordHead.code)} okText="确定" cancelText="取消" >
                                <span className={'blue'}>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
            )
        }
        return <Details code={record.devicePatrolPlanRecordHead.code}/>;
    }

    handleDelete(id) {
        axios({
            url:`${this.props.url.devicePatrolPlan.delete}?planId=${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.searchEvent();//删除后重置信息
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }

}

export default InspectionTable
