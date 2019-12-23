import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
// import AddModal from "./add/addModal";
import axios from "axios";
import DetailModal from "./detailModal"
class RegisterTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
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
            width: '20%'
        },{
            title:'检测项目',
            key:'col3',
            dataIndex:'col3',
            width: '15%',
            render:((text,record) => {
                var value = "";
                if (text.length > 20){
                    value = text.substring(0,20)
                }else{
                    value = text;
                }
                return(
                    <span title={text}>{value + " ..."}</span>
                )
            })
        },{
            title:'送检部门',
            key:'col4',
            dataIndex:'col4',
            width: '10%'
        },{
            title:'送检人',
            key:'col5',
            dataIndex:'col5',
            width: '10%'
        },{
            title:'登记时间',
            key:'col6',
            dataIndex:'col6',
            width: '15%'
        },{
            title:'确认时间',
            key:'col7',
            dataIndex:'col7',
            width: '15%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '10%',
            render: ((text,record) => {
                return (
                    <span>
                        <DetailModal />
                    </span>
                )
            })
        }]
    }

    render() {
        let {dataSource,selectedRowKeys,onSelectChange,handleTableChange} = this.props,
            rowSelection = {
                selectedRowKeys,
                onChange: onSelectChange,
            };
        return (
            <Table rowKey={record => record.code} rowSelection={rowSelection} columns={this.columns}
                   dataSource={dataSource} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }

    handleDelete(code) {
        console.log(code)
        // axios({
        //     url:`${this.props.url.eqMaintenanceQuery.recordDelete}/${id}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     }
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.props.getTableData(); //删除后重置信息
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
    }
}

export default RegisterTable;
