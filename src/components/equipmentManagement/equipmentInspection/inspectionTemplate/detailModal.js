import React from 'react';
import { Modal, Table} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class DetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.cancel = this.cancel.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getTitle1 = this.getTitle1.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.column1 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检项目',
            dataIndex:'patrolItem',
            key:'patrolItem',
            width:'40%'
        },{
            title:'巡检内容',
            dataIndex:'patrolContent',
            key:'patrolContent',
            width:'40%'
        }];

        this.column2 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检位置',
            dataIndex:'locationName',
            key:'locationName',
            width:'75%'
        }]
    }

    render() {
        const {workshop,patrolName,checkType,setPeople,tabulatedate} = this.props.record;
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} width={1000} centered={true} closable={false}
                       title={'详情'} maskClosable={false}
                       footer={[
                            <CancleButton key='cancel' flag={true} handleCancel={this.cancel} />]}
                >
                    <div>
                        <div className='inspection-detail-head'>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>所属车间：</span>
                                <span>{workshop}</span>
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>巡检模块名称：</span>
                                <span>{patrolName}</span>
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>检查类型：</span>
                                <span>{checkType}</span>
                            </div>
                        </div>
                        <div className='inspection-detail-head'>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>制表人：</span>
                                <span>{setPeople}</span>
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>制表日期：</span>
                                <span>{tabulatedate}</span>
                            </div>
                            <div className='inspection-detail-div'></div>
                        </div>
                        <Table
                            title = {this.getTitle}
                            columns={this.column1}
                            rowKey={record => record.code}
                            size="small"
                            dataSource={this.state.devicePatrolModelsItemDetailsList}
                            bordered
                            scroll={{y: 150}}
                            pagination={false}
                            className={'inspection-detail-table'}
                        />
                        <Table
                            title = {this.getTitle1}
                            columns={this.column2}
                            rowKey={record => record.code}
                            size="small"
                            dataSource={this.state.devicePatrolModelsLocationDetails}
                            bordered
                            scroll={{y: 150}}
                            pagination={false}
                        />
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击详情*/
    handleClick() {
        let code = this.props.record.code;
        this.getDetailData(code);
        this.setState({
            visible: true
        })
    }

    cancel() {
        this.setState({
            visible: false
        })
    }

    getDetailData(code) {
        axios({
            url: `${this.props.url.devicePatrolModel.detail}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:code
            }
        }).then((data)=>{
            const res=data.data.data;
            let data1 = res.devicePatrolModelsItemDetailsList, data2 = res.devicePatrolModelsLocationDetails;
            for(let i = 0; i < data1.length; i++) {
                data1[i]['index'] = i + 1;
            }
            for(let j = 0; j < data2.length; j++) {
                data2[j]['index'] = j + 1;
            }
            this.setState({
                devicePatrolModelsItemDetailsList: res.devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails: res.devicePatrolModelsLocationDetails
            })
        })
    }

    getTitle() {
        return '巡检项目';
    }

    getTitle1() {
        return '巡检区域';
    }
}

export default DetailModal;
