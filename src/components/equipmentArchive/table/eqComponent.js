import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import EARightBottom from '../right/eARightBottom'

class EqComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tableData: [],
        }
        this.handleData = this.handleData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {visible} = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleData}>部件</span>
                <Modal
                    className="modal-xlg"

                    title="数据详情"
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <div style={{height:"550px"}}>
                        <EARightBottom
                            comFlag = {true}
                            data={this.state.tableData}
                        />
                    </div>
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleData = () => {
        // TODO 获取数据
        const tableData = [{
            code: 4,
            fixedassetsCode: '10222222',
            deviceName: '反应弧233',
            specification: 'ABC-2232',
            startdate: '2019/6/14',
            statusCode: 0
        }, {
            code: 5,
            fixedassetsCode: '10222222',
            deviceName: '反应弧2322',
            specification: 'ABC-3333',
            startdate: '2019/6/14',
            statusCode: 1
        }];


        this.setState({
            visible: true,
            tableData: tableData
        })
    }
}

export default EqComponent