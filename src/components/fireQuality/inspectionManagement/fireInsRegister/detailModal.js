import React, {Component} from 'react'
import {Modal, message, Divider, Checkbox, Col} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";

import axios from "axios";

class DetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
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
        return (
            <span>
                <span className={'blue'} onClick={this.getDetail}>详情</span>
                <Modal
                    title={'详情'}
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={700}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}
                >
                    <div className="detailModal_scala">
                        <div className="detailModal_top">
                            <span className="detailModal_top_maxSpan">{`样品编号：${this.state.batchNumber}`}</span>
                            <span className="detailModal_top_minSpan">{`送检部门：${this.state.deptName}`}</span>
                            <span className="detailModal_top_minSpan">{`送检人：${this.state.username}`}</span>
                        </div>
                        <Divider/>
                        <div>检测项目：</div>
                        <div className="detailModal_down">
                            <Checkbox.Group style={{width:"100%"}} value={this.state.checkedList}>
                                {
                                    this.state.plainOptions ? this.state.plainOptions.map(p =>
                                        <Col key={p.code} span={8}>
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
        var url = "";
        if (this.props.flag===1){
            url = `${this.props.url.fireInsSamRec.detail}`
        } else{
            url = `${this.props.url.fireInsRegister.detail}`
        }
        // 获取详情数据
        axios({
            url:url,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params: {
                id:this.props.record.code
            }
        }).then((data)=>{
            const res = data.data.data;

            const items = res.items;
            var plainOptions = []
            var checkedList = []
            for (var i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.flag){
                    plainOptions.push({
                        code:item.code,
                        name:item.name
                    })
                    checkedList.push(item.code)
                }

            }


            this.setState({
                plainOptions: plainOptions,
                checkedList: checkedList,
                batchNumber: res.batch,
                deptName: res.deptName,
                username: res.checkPeople,
                visible: true
            })
            // message.info(data.data.message)

        }).catch(()=>{
            message.info('查询失败，请联系管理员！');
        });
    }

    cancel = () => {
        this.setState({
            visible: false,
            plainOptions: [],
            checkedList: [],
            batchNumber: "",
            deptName: "",
            username: "",
        })

    }
}

export default DetailModal