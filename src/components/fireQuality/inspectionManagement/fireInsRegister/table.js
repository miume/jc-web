import React from 'react';
import { Table} from "antd";
import DetailModal from "./detailModal"
class RegisterTable extends React.Component {
    constructor(props) {
        super(props);
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
            width: '24%'
        },{
            title:'检测项目',
            key:'col3',
            dataIndex:'col3',
            width: '20%',
            render:((text,record) => {
                var value = "";
                if (text.length > 20){
                    value = text.substring(0,20)
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
            width: '10%'
        },{
            title:'登记时间',
            key:'col6',
            dataIndex:'col6',
            width: '12%',
            render:((text,record) => {
                return(
                    <span title={text}>{text.split(" ")[0] + " ..."}</span>
                )
            })
        },{
            title:'确认时间',
            key:'col7',
            dataIndex:'col7',
            width: '12%'
        },{
            title:'备注',
            key:'col5',
            dataIndex:'col5',
            width: '10%',
            render:((text,record) => {
                var value = "";
                if (text.length > 20){
                    value = text.substring(0,20)
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
            width: '7%',
            render: ((text,record) => {
                return (
                    <span>
                        <DetailModal
                            url={this.props.url}
                            record={record}
                        />
                    </span>
                )
            })
        }]
    }

    render() {
        let {dataSource,handleTableChange,total} = this.props
        this.pagination.total = total ? total : 0;
        return (
            <Table rowKey={record => record.code} columns={this.columns}
                   dataSource={dataSource} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }
}

export default RegisterTable;
