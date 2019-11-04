import React from "react"
import {Table} from 'antd'

import  MakePlan from './makePlan'
import "./checkPlan.css"

class TTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }


        this.handleDelete=this.handleDelete.bind(this)

    }

    handleDelete = (id) => {
        // axios({
        //     url:`${this.url.department.department}/${id}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.url.Authorization
        //     },
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.fetch({
        //         pageSize:this.state.pagination.pageSize,
        //         pageNumber:this.state.pagination.current,
        //     })
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
    }
    render(){
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'8%',
        },{ title: '部门名称',
            dataIndex: 'departName' ,
            key: 'departName',
            width: '23%',
            align:'left',
            editable: false
        }, {
            title: '设备编号',
            dataIndex: 'fixedassetsCode',
            key:  'fixedassetsCode',
            width: '23%',
            align:'left',
            editable: true
        },{
            title: '设备名称',
            dataIndex: 'deviceName',
            key: 'deviceName',
            width: '23%',
            align:'left',
            editable: true
        }, {
            title: '操作&状态',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                // console.log(record)
                return (
                    <span>
                    <MakePlan parentCode={this.props.parentCode} flag={record.flag} url={this.props.url} record={record} deptId={this.props.deptId} deviceName={this.props.deviceName}
                     fetch={this.props.fetch} fresh={this.props.fresh}/>
                    </span>
                );
            }
        }]
        return(

            <div className="changeTable">
                <Table
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    size="default"
                    bordered
                    scroll={{ y: 400 }}
                    rowKey={record => record.code}
                />
            </div>
        )
    }
}
export default TTable