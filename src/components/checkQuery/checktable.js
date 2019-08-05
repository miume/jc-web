import React from "react"
import {Table, Input} from 'antd'

import home from "../commom/fns";
import Detail from "./detail"
import SearchCell from "./searchCell";
import "./checkQuery.css"
const { Search } = Input;


class CheckTable extends React.Component{
    constructor(props){
        super(props)
    }


    render(){



        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'7%',
        },{ title: '设备编号',
            dataIndex: 'fixedassetsCode' ,
            key: 'fixedassetsCode',
            width: '24%',
            align:'left',
            editable: false
        }, {
            title: '设备名称',
            dataIndex: 'deviceName',
            key:  'deviceName',
            width: '24%',
            align:'left',
            editable: true
        },{
            title: '所属车间',
            dataIndex: 'workshop',
            key: 'workshop',
            width: '24%',
            align:'left',
            editable: true
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                     <Detail fixedassetsCode={record.fixedassetsCode} deviceName={record.deviceName}    url={this.props.url} code={record.code}/>
                     );
                }
            }]

        return(
            <div>



                <SearchCell
                    fetch={this.props.fetch}
s                    name="设备编号/设备名称"
                    deptId={this.props.deptId}
                    deviceName={this.props.deviceName}
                    searchEvent={this.props.searchEvent}
                    searchContentChange={this.props.searchContentChange}
                    flag={home.judgeOperation(this.props.operation, 'QUERY')}
                />
                <div className="clear"></div>
            <Table

                   columns={this.columns}
                   dataSource={this.props.rightTableData}
                   onChange={this.props.handleTableChange}
                   pagination={this.props.pagination}
                   size="small"
                   bordered
                   scroll={{ y: 380 }}

            />
            </div>
        )
    }
}
export default CheckTable