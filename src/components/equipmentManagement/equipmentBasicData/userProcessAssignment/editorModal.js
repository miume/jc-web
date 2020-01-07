import React from 'react';
import CancleButton from "../../../BlockQuote/cancleButton";
import {Col, Modal, Row, Checkbox,message} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import axios from "axios";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            processData: [],
            checkedValues: []
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.getProcess = this.getProcess.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    render() {
        let {deptName,record} = this.props, userName = record ? record.user.name : '',
            {visible,processData,checkedValues} = this.state,{updateFlag}=this.props
        return (
            <span>
                <span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                <Modal
                    visible={visible}
                    title="编辑" closable={false} width='450px'
                    centered={true} maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check'/>
                    ]}
                >
                    <Row type="flex" justify="start" >
                        <Col span={5} style={{paddingTop:"10px"}}>
                            所属车间 ：
                        </Col>
                        <Col span={5} style={{paddingTop:"10px"}}>
                            {deptName}
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" >
                        <Col span={5} style={{paddingTop:"10px"}}>
                            用户名&nbsp;&nbsp;&nbsp; ：
                        </Col>
                        <Col span={5} style={{paddingTop:"10px"}}>
                            {userName}
                        </Col>
                    </Row>
                    <Row type="flex" justify="start" >
                        <Col span={5} style={{padding:"10px 0"}}>
                            工序名称：
                        </Col>
                    </Row>
                    <Checkbox.Group style={{ width: '100%',height:200,overflowY:'auto' }} value={checkedValues} onChange={this.checkboxChange}>
                            {this.renderCheckbox(processData)}
                    </Checkbox.Group>
                </Modal>
            </span>
        )
    }

    /**点击编辑*/
    showModal() {
        let {deptId,deptName,record} = this.props,
            checkedValues = [];
        record['processes'].map(e => {
            checkedValues.push(e.code)
        });
        this.setState({
            visible: true,
            deptName: deptName,
            checkedValues: checkedValues
        });
        this.getProcess(deptId);
    };

    /**根据部门id获取工序*/
    getProcess(deptId) {
        axios({
            url: `${this.props.url.deviceProcess.getAllByDept}?deptId=${deptId}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            let res = data.data.data ? data.data.data : [];
            this.setState({
                processData: res
            })
        })
    }

    checkboxChange(checkedValues) {
        this.setState({
            checkedValues: checkedValues
        })
    }

    /**点击取消弹框*/
    handleCancel() {
        this.setState({
            visible: false,
            processName: ''
        });
    };

    renderCheckbox(data) {
        if(data.length) {
            return data.map(e =>
                <Col span={8} key={e.code} style={{padding:"10px 0"}}>
                    <Checkbox value={e.code}>{e.processName}</Checkbox>
                </Col>
            )
        }
        return '无数据';
    }

    /**点击保存按钮*/
    handleOk() {
        let {checkedValues} = this.state, {record} = this.props,
            userId = record.user.id;
        axios({
            url: `${this.props.url.userProcessName.userProcess}?userId=${userId}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data:checkedValues
        }).then((data) => {
            message.info(data.data.message);
            this.props.getTableData();
        }).catch(() => {
            message.info('保存失败，请联系管理员！');
        })
        this.setState({
            visible: false
        })
    }
}

export default Editor;

