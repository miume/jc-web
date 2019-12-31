import React from 'react';
import { Table} from "antd";
import DetailModal from "./detailModal"
class RegisterTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title:'序号',
            key:'col1',
            dataIndex:'col1',
            width: '5%'
        },{
            title:'批号',
            key:'col2',
            dataIndex:'col2',
            width: '20%'
        },{
            title:'检测项目',
            key:'col3',
            dataIndex:'col3',
            width: '27%',
            render:((text,record) => {
                var value = "";
                if (text.length > 30){
                    value = text.substring(0,30)
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
            render:((text,record) => {
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
            render:((text,record) => {
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
            width: '10%',
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
        let {dataSource,handleTableChange} = this.props
        return (
            <Table rowKey={record => record.code} columns={this.columns}
                   dataSource={dataSource} pagination={this.props.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }
}

export default RegisterTable;
