import React,{Component} from 'react';
import {message, Modal, Divider, Table, Popconfirm} from 'antd';
import axios from 'axios';
import './block.css';
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from "../../BlockQuote/newButton";
import Edit from "./edit"
class Operator extends Component{

    constructor(props){
        super(props);
        this.state={
            visible: false,
            dataSource: [],
            editingKey: ''
        }
        this.columns = [{
            title:'序号',
            key:'col1',
            dataIndex:'col1',
            width: '20%'
        },{
            title:`${this.props.titleName}`,
            key:'col2',
            dataIndex:'col2',
            width: '50%',
            editable: true,
        },{
            title:'操作',
            key:'id',
            dataIndex:'id',
            width: '30%',
            render: (text,record) => {
                return (
                    <span>
                        <Edit
                            handleClick={this.handleClick}
                            url={this.props.url}
                            record={record}
                            flag={this.props.flag}
                        />
                        <Divider type="vertical" />
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'}
                                    onConfirm={() => this.handleDelete(record.id)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]

    }

    render() {
        return (
            <span style={this.props.flag===1?{paddingLeft:"540px"}:{paddingLeft:"560px"}}>
                <NewButton name='操作' className='fa fa-align-justify' handleClick={this.handleClick}/>
                <Modal
                    visible={this.state.visible}
                    title="操作"
                    closable={false} maskClosable={false} centered={true}
                    width='500px'
                    footer={[
                        <CancleButton flag={true} key='cancel' handleCancel={this.handleCancel}/>,
                    ]}
                >
                    <Table
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        bordered
                        size={'small'}
                        scroll={{y:400}}
                    />
                </Modal>
            </span>
        );
    }

    handleDelete = (code) => {
        var url = "";
        if (this.props.flag === 0) {
            url = `${this.props.url.rawStandard.deleteRaw}?materialId=${code}`;
        } else {
            url = `${this.props.url.rawStandard.deleteManufacturer}?manufacturerId=${code}`;
        }
        axios({
            url: url,
            method: 'Delete',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            message.info(data.data.message);
            this.handleClick(); //删除后重置信息
        }).catch(() => {
            message.info('删除失败，请联系管理员！');
        });
    }


    handleCancel = () => {
        this.props.fetch();
        this.setState({
            visible: false
        });

    }

    handleClick = () => {
        var url = "";
        if (this.props.flag === 0) {
            url = `${this.props.url.rawStandard.getRaw}`;
        } else {
            url = `${this.props.url.rawStandard.manufacturerByRawId}?rawMaterialId=${this.props.rawMaterialId}`;
        }
        axios({
            url: url,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data;
            if (res) {
                var dataSource = [];
                for (var i = 0; i < res.length; i++) {
                    const e = res[i];
                    dataSource.push({
                        id: e.id,
                        col1: i+1,
                        col2: e.name
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    visible: true
                });
            } else {
                message.info("原材料为空")
            }
        }).catch(()=>{
            message.info('查询失败，请联系管理员！')
        });
    }
}
export default Operator;
