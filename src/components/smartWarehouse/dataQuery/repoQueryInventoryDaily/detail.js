import React from 'react';
import axios from 'axios';
import {Button, Input, message, Modal, Table} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import './repoQueryInventoryDaily.css'


class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            inputValue:""
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
            width: '15%'
        },{
            title: '供应商',
            key: 'col3',
            dataIndex: 'col3',
            width: '15%'
        },{
            title: '计量单位',
            key: 'col4',
            dataIndex: 'col4',
            width: '12%'
        },{
            title: '前日库存',
            key: 'col5',
            dataIndex: 'col5',
            width: '12%'
        },{
            title: '当日入库',
            key: 'col6',
            dataIndex: 'col6',
            width: '12%'
        },{
            title: '当日出库',
            key: 'col7',
            dataIndex: 'col7',
            width: '12%'
        },{
            title: '现存量',
            key: 'col8',
            dataIndex: 'col8',
            width: '12%'
        }];

    }
    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title="详情"
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="700px"
                    footer={[
                        <CancleButton flag={1} key='back' handleCancel={this.cancel}/>,
                    ]}
                >
                    <div>
                        <Table
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            size={'small'}
                            bordered
                            rowKey={record => record.code}
                            pagination={false}
                            scroll={{y: 450}}
                        />
                    </div>

                </Modal>
            </span>
        )
    }


    inputChange = (e) => {
        this.setState({
            inputValue:e.target.value
        })
    }
    handleDetail = () => {
        axios({
            url: `${this.props.url.repoQueryInventoryDaily.detail}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                id:this.props.record.code,
            }
        }).then(data => {
            // message.info(data.data.mesg)
            let res = data.data.data;
            if (res) {
                var dataSource = [];
                for (let i = 0; i < res.length; i++) {
                    dataSource.push({
                        code: res[i].id,
                        col1: i + 1,
                        col2: res[i].materialName,
                        col4: res[i].measureUnit,
                        col5: res[i].lastWeight,
                        col6: res[i].currentInRecord,
                        col7: res[i].currentOutRecord,
                        col8: res[i].weight
                    })
                }
                this.setState({
                    visible:true,
                    dataSource: dataSource
                })
            }
        })

    }
    cancel = () => {
        this.setState({
            visible:false
        })
    }


}

export default Detail;
