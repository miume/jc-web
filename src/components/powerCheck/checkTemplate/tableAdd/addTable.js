import React from 'react';
import {Select, Table} from "antd";
const {Option} = Select;

class AddTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '20%'
        },{
            title:'地点',
            key:'place',
            dataIndex:'place',
            width: '20%'
        },{
            title:'设备名/点检项目',
            key:'item',
            dataIndex:'item',
            width: '20%'
        },{
            title:'点检内容',
            key:'content',
            dataIndex:'content',
            width: '20%'
        },{
            title:'点检结果',
            key:'result',
            dataIndex:'result',
            width: '20%',
            render: (text,record) => {
                return (
                    <Select placeholder='请选择' onChange={this.props.selectChange} style={{width: '100%'}}>
                        <Option name={record['index']} value={1}>正常</Option>
                        <Option name={record['index']} value={2}>异常</Option>
                        <Option name={record['index']} value={3}>未开机</Option>
                    </Select>
                )
            },
            className: 'check-template-table'
        }]
    }

    render() {
        let {dataSource} = this.props;
        return (
            <Table rowKey={record => record.index} columns={this.columns}
                   dataSource={dataSource} pagination={false} scroll={{y:250}}
                   bordered size={'small'}/>
        );
    }
}

export default AddTable;