import React from "react"
import {Table, Switch, Icon, Select,Row,Col} from 'antd'
import Detail from "../checkQuery/detail";
import DeleteSpan from "./deleteSpan"
import home from '../commom/fns';
import axios from "axios";
import "./checkPlan.css"

class TTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }


        this.handleDelete=this.handleDelete.bind(this)

    }

    handleDelete = (id) => {
        console.log('删除成功')
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
            dataIndex: 'departname' ,
            key: 'departname',
            width: '23%',
            align:'left',
            editable: false
        }, {
            title: '设备编号',
            dataIndex: 'devicecode',
            key:  'devicecode',
            width: '23%',
            align:'left',
            editable: true
        },{
            title: '设备名称',
            dataIndex: 'devicename',
            key: 'devicename',
            width: '23%',
            align:'left',
            editable: true
        }, {
            title: '操作&状态',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                    <span>
                    {/*<Detail deviceNumber={record.deviceNumber} devicename={record.deviceName}/>*/}
                    {/*    <DeleteSpan*/}
                    {/*        record={record}*/}
                    {/*        pagination={this.props.pagination}*/}
                    {/*        handleDelete={this.handleDelete}*/}
                    {/*        flag={home.judgeOperation(this.props.operation,'DELETE')}*/}
                    {/*    />*/}
                    </span>
                );
            }
        }]
        return(

            <div className="changeTable">
                <Table
                    // dataSource={this.props.dataSource}
                    columns={this.columns}
                    pagination={this.props.pagination}
                    size="default"
                    bordered
                    scroll={{ y: 450 }}
                />
            </div>
        )
    }
}
export default TTable