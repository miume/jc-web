import React from "react"
import {Table} from 'antd'
import Detail from "./detail"
import SearchCell from "../../../BlockQuote/newSearchSell";

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
            width: '24%'
        }, {
            title: '设备名称',
            dataIndex: 'deviceName',
            key:  'deviceName',
            width: '24%'
        },{
            title: '所属车间',
            dataIndex: 'workshop',
            key: 'workshop',
            width: '24%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                     <Detail fixedassetsCode={record.fixedassetsCode} deviceName={record.deviceName}    url={this.props.url} code={record.code}/>
                     );
                }
            }]

        return(
            <div>
                <SearchCell
s                   placeholder="设备编号/设备名称"
                    searchEvent={this.props.searchEvent}
                    reset={this.props.reset}
                    flag={true}
                />
                <div className="clear"></div>
            <Table
                   columns={this.columns}
                   dataSource={this.props.rightTableData}
                   onChange={this.props.handleTableChange}
                   pagination={this.props.pagination}
                   rowKey={record => record.code}
                   size="small"
                   bordered
            />
            </div>
        )
    }
}
export default CheckTable
