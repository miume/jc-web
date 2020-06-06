import React from 'react';
import axios from 'axios';
import {Transfer, Modal, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AssignUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getUsersById = this.getUsersById.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterOption = (inputValue, option) => option.name.indexOf(inputValue) > -1;
    }

    render() {
        let {visible,mockData,targetKeys} = this.state;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>分配用户</span>
                <Modal title={'分配用户'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={600}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Transfer
                            rowKey={record => record.id}
                            dataSource={mockData}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={targetKeys}
                            onChange={this.handleChange}
                            render={item => item.name}
                            titles={['未被分配用户','已被分配用户']}
                            locale={{
                                itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'
                            }}
                            listStyle={{
                                width: '250px',
                                height: '350px'
                            }}
                        />
                    </div>
                </Modal>
            </span>
        );
    }

    /**点击新增事件*/
    handleClick() {
        let {id} = this.props;
        if(id) {
            this.getUsersById(id)
        }
        this.setState({
            visible: true
        });
    }

    getAllUsers(targetKeys) {
        axios({
            url: this.props.url.authUser.getAll,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            for(let i = 0; i < res.length; i++) {
                if (res[i]['code'] in targetKeys) {
                    res[i]['chosen'] = false;
                }
            }
            this.setState({
                mockData: res
            })
        })
    }

    getUsersById(positionId) {
        axios({
            url: `${this.props.url.firePosition}/userDetail?positionId=${positionId}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, targetKeys = [];
            for(let i = 0; i < res.length; i++) {
                targetKeys.push(res[i]['userCode'])
            }
            this.setState({ targetKeys });
            this.getAllUsers(targetKeys);
        })
    }

    handleChange(targetKeys) {
        this.setState({ targetKeys });
    };

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleSave() {
        let {targetKeys} = this.state,userIds = '';
        if (!targetKeys.length) {
            message.info('请选择已被分配项目！');
            return
        }
        for( let i = 0; i < targetKeys.length; i++ ) {
            userIds += `&userIds=${targetKeys[i]}`
        }
        axios({
            url: `${this.props.url.firePosition}/assign?positionId=${this.props.id}${userIds}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            this.handleCancel();
            message.info(data.data.message);
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AssignUsers;
