import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import {Table} from "antd";


class AddTable extends React.Component{
    constructor(props){
        super(props);
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '11.11%',
        },{
            title: '成品名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '11.11%',
        },{
            title: '产品型号',
            dataIndex: 'model',
            key: 'model',
            align:'center',
            width: '11.11%',
        },{
            title: '批号',
            dataIndex: 'batch',
            key: 'batch',
            align:'center',
            width: '11.11%',
        },{
            title: '入库时间',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            width: '11.11%',
        },{
            title: '重量(T)',
            dataIndex: 'weight',
            key: 'weight',
            align:'center',
            width: '11.11%',
        },{
            title: 'Ni(%)',
            dataIndex: 'Ni',
            key: 'Ni',
            align:'center',
            width: '11.11%',
        },{
            title: 'Co(%)',
            dataIndex: 'Co',
            key: 'Co',
            align:'center',
            width: '11.11%',
        },{
            title: 'Mn(%)',
            dataIndex: 'Mn',
            key: 'Mn',
            align:'center',
            width: '11.11%',
        }]
    };

    render() {
        let {data,visible} = this.props;
        return(
            <div className={visible ? '' : 'hide'}>
                <Table pagination={this.pagination} columns={this.columns} rowKey={record => record.index}
                       dataSource={data} size="small" bordered pagination={false}/>
            </div>
        )
    }
}

export default AddTable;
