import React from "react"
import { Table} from 'antd'

import "./checkQuery.css"
class FhTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        this.columns=[{
            title:'设备编号',
            dataIndex:'fixedassetsCode',
            key:'fixedassetsCode',
            width:'10%',
        },{ title: '设备名称',
            dataIndex: 'deviceName' ,
            key: 'deviceName',
            width: '10%',
            align:'left',
            editable: false
        }, {
            title: '点检时间',
            dataIndex: 'scanTime',
            key:  'scanTime',
            width: '10%',
            align:'left',
            editable: true
        },{
            title: '点检人',
            dataIndex: 'spotcheckPeople',
            key: 'spotcheckPeople',
            width: '10%',
            align:'left',
            editable: true
        }, {
            title: "确认时间",
            dataIndex: 'confirmTime',
            key: 'confirmTime',
            width: 'left',
            align: 'left',
        },{
            title: '确认人',
            dataIndex: 'confirmPeople',
            key: 'confirmPeople',
            width: '10%',
            align:'left',
        },{
            title: '状态',
            dataIndex: 'editFlag',
            key: 'editFlag',
            width: '10%',
            align:'left',
        }]
        return(

            <Table
                columns={this.columns}
                dataSource={this.props.dataSource}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 380 }}
                pagination={false}
                rowKey={record => record.code}
            />
        )
    }
}
export default FhTable