import React from "react"
import {Table} from 'antd'
class ThirdTable extends React.Component{
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
        },{ title: '项目名称',
            dataIndex: 'spotcheckItems' ,
            key: 'spotcheckItems',
            width: '19%',
            align:'left',
            editable: false
        }, {
            title: '点检标准',
            dataIndex: 'spotcheckContent',
            key:  'spotcheckContent',
            width: '13%',
            align:'left',
            editable: true
        },{
            title: '点检结果',
            dataIndex: 'mainValues',
            key: 'mainValues',
            width: '19%',
            align:'left',
            editable: true
        }, {
            title: "不合格备注",
            dataIndex: 'mainContent',
            key: 'mainContent',
            width: 'left',
            align: 'left',
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
                rowKey={record => record.index}
            />
        )
    }
}
export default ThirdTable