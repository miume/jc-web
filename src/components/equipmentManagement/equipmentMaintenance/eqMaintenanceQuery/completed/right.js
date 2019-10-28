import React from "react";
import {Spin, Table} from "antd";
import "./completed.css"
import Detail from "./detailModal";
import home from "../../../../commom/fns";
import SearchCell from "./search";
// let data=[ ];
// for(var i=0;i<100;i++){
//     data.push({
//         index:i,
//         odd_number:'by12345',
//         number:'管道阀门/#1001',
//         department:'制造一部',
//         date:'2019-07-18',
//         time:'2019-07-17 10:00',
//         deadline:'2019-8-17',
//         someone:'ww',
//     })
//
// }

class Right extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    url;
    operation;

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            data:[],
            searchContent:'',
            searchText: '',
        };
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
    }
    onclick=()=>{
        this.setState({
            visible:true,
        })
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            align:'center',
        },
        {
            title: '保养单号',
            dataIndex: 'code',
            key: 'code',
            align:'center',
            width:'100',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            key: 'deviceName',
            align:'center',
            width:'100',
        },
        {
            title: '所属部门',
            align:'center',
            width: '50',
            key: 'depName',
            dataIndex: 'depName',
        },
        {
            title: '本次计划执行日期',
            key: 'planDate',
            align:'center',
            dataIndex: 'planDate',
        },
        {
            title: '接单时间',
            key: 'receiveDate',
            dataIndex: 'receiveDate',
        },
        {
            title: '保养完成日期',
            key: 'finishiDate',
            dataIndex: 'finishiDate',
            align:'center',
        },
        {
            title: '保养人',
            key: 'maintPeople',
            dataIndex: 'maintPeople',
            align:'center',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex:'action',
            align:'center',
            render:(text,record) =>{
                return (
                  <Detail
                      url={this.url}
                      code={record}
                  />
                )

            }
        },

    ];

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Table size="small"
                       rowKey={item => item.code}
                       dataSource={this.props.rightTableData}
                       columns={this.columns}
                       bordered
                       pagination={this.props.pagination}
                       onChange={this.props.handleTableChange}
                />
            </div>
        );
    }
}
export default Right
