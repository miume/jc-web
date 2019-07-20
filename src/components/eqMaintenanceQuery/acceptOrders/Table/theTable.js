import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import Details from "./detail";
import '../acceptOrders.css'

//用于编写表格的显示样式

class TheTable extends React.Component {
    constructor(props) {
        super(props)
    }
   columns = [
        {
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            width: '5px',
            align:'center',
        },
        {
            title: '保养单号',
            dataIndex: 'list',
            key: 'list',
            width: '10px',
            align:'center',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.index - b.index,
            width: '10px',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'depart',
            key: 'depart',
            width: '10px',
            align:'center',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'date',
            key: 'date',
            width: '10px',
            align:'center',
        },
        {
            title: '接单时间',
            dataIndex: 'time',
            key: 'time',
            width: '10px',
            align:'center',
        },
        {
            title: '保养人',
            dataIndex: 'person',
            key: 'person',
            width: '5px',
            align:'center',
        },
        {
            title: '操作',
            dataIndex: 'move',
            key: 'move',
            width: '5px',
            align:'center',
            render: (text, record) => {
                return (
                    <span>
                        <Details/>
                    </span>
                )
            }
        },
    ];

    render() {
        const dataSource = [];
        for ( let i=0;i<100;i++){
            dataSource.push({
                key:i,
                num: i,
                list: 32,
                name: '？？？',
                depart: '项目部',
                date: '2019.7.17',
                time: '2019.7.17 10:00',
                person: '王大锤',
            })
        }
        return (
            <div>
                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    size="small"
                    bordered
                />
            </div>);
    }

    fetch = (params ,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios({
            url: `${this.url.department.byNameLikeByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };

}


export default TheTable