import React from 'react';
import {Table} from "antd";

class MainIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
        },{
            title: 'Ni',
            dataIndex: 'niMax',
            key: 'niMax',
            width: '26%',
            render: (text,record) => {
                return `${text}~${record['niMin']}`
            }
        },{
            title: 'Co',
            dataIndex: 'coMax',
            key: 'coMax',
            width: '26%',
            render: (text,record) => {
                return `${text}~${record['coMin']}`
            }
        },{
            title: 'Mn',
            dataIndex: 'mnMax',
            key: 'mnMax',
            width: '26%',
            render: (text,record) => {
                return `${text}~${record['mnMin']}`
            }
        }]
    }

    render() {
        let {data,zyDetail} = this.props;
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return (
            <div>
                <Table dataSource={data} rowKey={record => record.index} columns={this.columns}
                       pagination={false} bordered size={'small'} scroll={{y: 200}}/>
                <div className='process-params-detail-text'>
                    <span>Zr(g/L)：</span>
                    <span>{`${zyDetail['zrStandard']}±${zyDetail['zrBias']}`}</span>
                </div>
            </div>
        )
    }
}

export default MainIngredient;
