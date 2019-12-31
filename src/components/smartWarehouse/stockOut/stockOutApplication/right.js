import React from 'react';
import {Icon, Table} from "antd";

class Right extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.delete = this.delete.bind(this);

        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '15%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '50%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '15%',
            render: (text) => {
                return <Icon type="close" onClick={() => this.delete(text)}/>
            }
        }]
    }

    render() {
        return (
            <div style={{width: '48%'}}>
                <Table columns={this.columns} pagination={false}
                       bordered size={'small'} rowKey={record => record.id}/>
            </div>
        )
    }

    delete(id) {

    }
}

export default Right;
