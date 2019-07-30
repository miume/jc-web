import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import MaintenanceModal from '../modal/maintenanceModal';

class Maintenance extends React.Component {
    url=JSON.parse(localStorage.getItem('url'));
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        }
        this.handleMaintenance = this.handleMaintenance.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleMaintenance}>保养</span>
                <Modal
                    title="数据详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="95%"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <MaintenanceModal
                        data={this.state.data}
                    />
                </Modal>
            </span>
        )

    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleMaintenance = () => {
        const param=this.props.record.plancode;
        // TODO 获取数据
        axios({
            url:this.url.eqMaintenanceQuery.recordDetail,
            method:"get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                id:param,
            }
        }).then((data)=>{
            const result=data.data.data;
            console.log(result)
        })
        const data = [{
            index: 1,
            plancode: 120,
            deviceName: '气炉',
            deptCode: '制造部',
            maintPeople: '李小红',
            planDate: '2018年12月12日',
            receiveDate: '2018年12月12日',
            finishiDate: '2018年12月12日',
        }, {
            index: 1,
            plancode: 120,
            deviceName: '气炉',
            deptCode: '制造部',
            maintPeople: '李小红',
            planDate: '2018年12月12日',
            receiveDate: '2018年12月12日',
            finishiDate: '2018年12月12日',
        }];
        this.setState({
            visible: true,
            data: data
        })
    }
}

export default Maintenance