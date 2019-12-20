import React from 'react';
import {Divider, Table} from "antd";
import SelectModal from "./selectModal";

class AddTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '10%'
        },{
            title:'地点',
            key:'place',
            dataIndex:'place',
            width: '10%'
        },{
            title:'设备名/点检项目',
            key:'checkItem',
            dataIndex:'checkItem',
            width: '20%'
        },{
            title:'点检内容',
            key:'checkContent',
            dataIndex:'checkContent',
            width: '15%'
        },{
            title:'输入类型',
            key:'dataType',
            dataIndex:'dataType',
            width: '10%',
            render: (text) => {
                return text ? '输入' : '勾选';
            }
        },{
            title:'频率',
            key:'frequency',
            dataIndex:'frequency',
            width: '10%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '15%',
            render: ((text,record) => {
                return (
                    <span>
                        <SelectModal title={'编辑'} record={record} data={this.props.data} addItem={this.props.addItem}/>
                        <Divider type={"vertical"}/>
                        <span className='blue' onClick={()=> this.props.handleDelete(record.index)}>删除</span>
                    </span>
                )
            })
        }]
    }

    render() {
        let {data,dataSource} = this.props;
        return (
            <div>
                <SelectModal title={'新增'} data={data} addItem={this.props.addItem}/>
                <Table rowKey={record => record.index} columns={this.columns}
                       dataSource={dataSource} pagination={false} scroll={{y:250}}
                       bordered size={'small'}/>
            </div>
        );
    }
}

export default AddTable;
