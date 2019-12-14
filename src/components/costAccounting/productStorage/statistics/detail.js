import React from 'react';
import {Modal, Table, Divider} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            dataDetails: []
        };
        this.getFooter = this.getFooter.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '5%'
        }, {
            title: '批次',
            key: 'batch',
            dataIndex: 'batch',
            width: '19.5%'
        },  {
            title: '入库时间',
            key: 'storageTime',
            dataIndex: 'storageTime',
            width: '19.5%'
        },{
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '8%'
        }, {
            title: 'Ni(%)',
            key: 'niConcentration',
            dataIndex: 'niConcentration',
            width: '8%'
        }, {
            title: 'Co(%)',
            key: 'coConcentration',
            dataIndex: 'coConcentration',
            width: '8%'
        }, {
            title: 'Mn(%)',
            key: 'mnConcentration',
            dataIndex: 'mnConcentration',
            width: '8%'
        }, {
            title: 'Ni(T)',
            key: 'niMetallicity',
            dataIndex: 'niMetallicity',
            width: '8%'
        }, {
            title: 'Co(T)',
            key: 'coMetallicity',
            dataIndex: 'coMetallicity',
            width: '8%'
        }, {
            title: 'Mn(T)',
            key: 'mnMetallicity',
            dataIndex: 'mnMetallicity',
            width: '8%'
        }]
    }
    render() {
        let {head,dataDetails} = this.state;
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'950px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className='excipient-statistics-detail-display'>
                        <div><b>成品名称：</b>{head ? head.productionTypeName : ''}</div>
                        <div><b>产品型号：</b>{head ? head.productionTypeCode : ''}</div>
                        <div><b>周期：</b>{head ? head.periodName : ''}</div>
                    </div>
                    <div className='excipient-statistics-detail-display'>
                        <div><b>开始时间：</b>{head ? head.startTime : ''}</div>
                        <div><b>结束时间：</b>{head ? head.endTime : ''}</div>
                        <div><b>期数：</b>{head ? head.lineName : ''}</div>
                    </div>
                    <Divider />
                    <div style={{height: 400}}>
                        <Table rowKey={record => record.code} dataSource={dataDetails} columns={this.columns}
                               size={"small"} bordered pagination={false} footer={this.getFooter} scroll={{y:300}}/>
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
    handleClick() {
        let {code} = this.props;
        this.getDetail(code);
        this.setState({
            visible: true
        });
    }

    getDetail(code) {
        axios({
            url: `${this.props.url.productStorage.detail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                let {head,dataDetails,list,totals} = res;
                head['periodName'] = res['periodName'];
                head['productionTypeName'] = list['productionTypeName'];
                head['productionTypeCode'] = list['productionTypeCode'];
                for(let i = 0; i < dataDetails.length; i++) {
                    dataDetails[i]['index'] = i + 1;
                }
                this.setState({
                    head,
                    totals,
                    dataDetails
                })
            }
        })
    }

    getFooter() {
        let {totals,dataDetails} = this.state;
        return (
            dataDetails && dataDetails.length ?
                <div className='excipient-statistics-detail-footer'>
                    <div>小计</div>
                    <div>{`重量：${totals['totals']}T`}</div>
                    <div>{`Ni：${totals['niValue']}T`}</div>
                    <div>{`Co：${totals['coValue']}T`}</div>
                    <div>{`Mn：${totals['mnValue']}T`}</div>
                </div> : null
        )
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Detail
