import React from 'react';
import {Modal, Input, message, Col, Row} from 'antd';
import NewButton from '../../../BlockQuote/newButton';
import CancleButton from '../../../BlockQuote/cancleButton';
import axios from 'axios';

class AddModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            deptName:'',
            deptId:'',
            processName:'',
        };
        this.renderTitle = this.renderTitle.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    //随着输入的变化而变化
    onInputChange(e) {
        let InputName=e.target.name,
            InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,})
    }
    //展示弹出窗口
    showModal() {
        let {deptId,deptName,processName} = this.props;
        this.setState({
            visible: true,
            deptId: deptId,
            deptName: deptName,
            processName: processName ? processName : ''
        });
    };

    //取消新增信息
    handleCancel = () => {
        this.setState({
            visible: false,
            processName: ''
        });
    };

    //提交新增信息
    handleOk() {
        let {deptId,processName} = this.state, {title,code} = this.props,
             method = 'post',
             data = {
                deptCode: deptId,
                processName: processName
            };
        if(!title) {
            method = 'put';
            data['code'] = code;
        }
        axios({
            url : `${this.props.url.equipmentProcessName.deptProcess}`,
            method: method,
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: data
        }).then((data) => {
            message.info(data.data.message);
            this.fetch(); // 重新调用分页函数
        }).catch(function () {
            message.info('新增失败，请联系管理员！');
        });
        this.setState({ visible: false });

    };

    fetch = () => {
        this.props.getTableData({
            deptId: this.state.deptId
        });
    };

    renderTitle(title) {
        if(title === '新增') {
            return <NewButton
                handleClick={this.showModal}
                name='新增'
                style='button'
                className='fa fa-plus' />
        }
        return <span className={'blue'} onClick={this.showModal}>编辑</span>
    }

    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                {this.renderTitle(this.props.title)}
                <Modal
                    visible={this.state.visible}
                    title="新增数据"
                    closable={false}
                    width='450px'
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            key='back'
                            handleCancel={this.handleCancel}
                        />,
                        <NewButton
                            key="submit"
                            handleClick={this.handleOk}
                            name='确定'
                            style='button'
                            className='fa fa-check'
                        />
                    ]}
                >
                    <Row type="flex" justify="start" >
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            所属部门 ：{this.props.deptName}
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingTop:"10px"}}>
                            工序名称 ：
                        </Col>
                        <Col span={10}>
                            <Input style={{width:"313px"}}
                                   key='1'
                                   name='processName'
                                   value={this.state.processName}
                                   onChange={this.onInputChange}
                                   placeholder="请输入工序名称"
                            />
                        </Col>
                    </Row>
                </Modal>
            </span>
        );
    }
}

export default AddModal;
