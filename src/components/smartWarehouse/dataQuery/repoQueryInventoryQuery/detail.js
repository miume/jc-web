import React from 'react';
import axios from 'axios';
import {Button, Input, message, Modal, Table} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        col1:i+1,
        col2: `物料${i}`,
        col3: `batch2019${i}`,
        col4: (i+1)%5*100,
    });
}

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            dataSource:[]
        };
        this.columns = [{
            title: '序号',
            key: 'col1',
            dataIndex: 'col1',
            width: '10%'
        },{
            title: '物料名称',
            key: 'col2',
            dataIndex: 'col2',
            width: '25%'
        },{
            title: '批号',
            key: 'col3',
            dataIndex: 'col3',
            width: '40%'
        },{
            title: '重量',
            key: 'col4',
            dataIndex: 'col4',
            width: '25%'
        }];

    }
    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title="库存详情"
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.cancel}/>
                    ]}
                >
                    <div>
                        <Table
                            rowKey={record => record.col1}
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            pagination={false}
                            size="small"
                            bordered
                            scroll={{y:400}}
                        />
                    </div>

                </Modal>
            </span>
        )
    }

    cancel = () => {
        this.setState({
            visible:false
        })
    }
    /**通过id查询备注信息 */
    handleDetail = () => {
        this.setState({
            visible:true,
            dataSource:data
        })
    }


}

export default Detail;
