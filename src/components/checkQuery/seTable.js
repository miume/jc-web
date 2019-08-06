import React from "react"
import { Table} from 'antd'

import SeDetail from './seDetail'
class SeTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'5%',
        },{ title: '点检时间',
            dataIndex: 'scanTime' ,
            key: 'scanTime',
            width: '19%',
            align:'left',
            editable: false
        }, {
            title: '点检人',
            dataIndex: 'spotcheckPeople',
            key:  'spotcheckPeople',
            width: '13%',
            align:'left',
            editable: true
        },{
            title: '确认时间',
            dataIndex: 'confirmTime',
            key: 'confirmTime',
            width: '19%',
            align:'left',
            editable: true
        }, {
            title: "确认人",
            dataIndex: 'confirmPeople',
            key: 'confirmPeople',
            width: '13%',
            align: 'left',
        },{
            title: "状态",
            dataIndex: 'editFlag',
            key: 'editFlag',
            width: '13%',
            align: 'left',
            render: (text, record) => {
                return(
                    <span>{record.name}&nbsp;&nbsp;
                        <i style={{color: `${record.color}`}} className="fa fa-circle" aria-hidden="true">

                        </i></span>
                )
            }
        },{
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'left',
                render: (text, record) => {
                    return (
                        <SeDetail deviceName={this.props.deviceName} fixedassetsCode={this.props.fixedassetsCode} scanTime={record.scanTime}
                                  spotcheckPeople={record.spotcheckPeople} confirmTime={record.confirmTime} confirmPeople={record.confirmPeople} editFlag={record.editFlag}
                        record={record} url={this.props.url}/>
                    );
                }
            }]
        return(







            <Table

                columns={this.columns}
                dataSource={this.props.dataSource}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 380 }}

            />
        )
    }
}
export default SeTable