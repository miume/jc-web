import React, {Component} from 'react'
import {Modal, Input, message, Divider, Checkbox, Col} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";

import axios from "axios";

class DetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            changeFlag: false,//监听渲染初始值还是已改变的值
            batchNumber: "",
            deptName: "",
            username: "",
            plainOptions: [],
            checkedList: []

        }
        this.getDetail = this.getDetail.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render() {
        let {visible, changeFlag} = this.state, {editflag, record} = this.props
        return (
            <span>
                <span className={'blue'} onClick={this.getDetail}>详情</span>
                <Modal
                    title={'详情'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={600}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}
                >
                    <div className="detailModal_scala">
                        <div className="detailModal_top">
                            <span>{`样品编号：${this.state.batchNumber}`}</span>
                            <span>{`送检部门：${this.state.deptName}`}</span>
                            <span>{`送检人：${this.state.username}`}</span>
                        </div>
                        <Divider/>
                        <div>检测项目：</div>
                        <div className="detailModal_down">
                            <Checkbox.Group value={this.state.checkedList}>
                                {
                                    this.state.plainOptions ? this.state.plainOptions.map(p =>
                                        <Col key={p.code} span={4}>
                                            <Checkbox value={p.code}>{p.name}</Checkbox>
                                        </Col>
                                    ) : null
                                }
                            </Checkbox.Group>
                        </div>
                    </div>

                </Modal>
            </span>
        )
    }

    getDetail = () => {
        var plainOptions = [];
        for (var i = 0; i < 300; i++) {
            plainOptions.push({
                code: i,
                name: `Ca${i + 1}`
            })
        }
        this.setState({
            plainOptions: plainOptions,
        })
        var checkedList = [1,3,5,6,7,14];


        this.setState({
            plainOptions:plainOptions,
            checkedList:checkedList,
            visible: true
        })
    }

    cancel = () => {
        this.setState({
            visible: false
        })

    }
}

export default DetailModal