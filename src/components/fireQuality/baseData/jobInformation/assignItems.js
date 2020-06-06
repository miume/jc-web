import React from 'react';
import axios from 'axios';
import {Transfer, Modal, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AssignItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            targetKeys: [],
            mockData: []
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getAllItems = this.getAllItems.bind(this);
        this.getItemsById = this.getItemsById.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterOption = (inputValue, option) => option.name.indexOf(inputValue) > -1;
    }

    render() {
        let {visible,mockData,targetKeys} = this.state;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>分配项目</span>
                <Modal title={'分配项目'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={600}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Transfer
                            rowKey={record => record.code}
                            dataSource={mockData}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={targetKeys}
                            onChange={this.handleChange}
                            render={item => item.name}
                            titles={['未被分配项目','已被分配项目']}
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
            this.getItemsById(id);
        }
        this.setState({
            visible: true
        });
    }

    getAllItems(targetKeys) {
        axios({
            url: `${this.props.url.fireMageTestItems}/getAll`,
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

    getItemsById(positionId) {
        axios({
            url: `${this.props.url.firePosition}/itemDetail?positionId=${positionId}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, targetKeys = [];
            for(let i = 0; i < res.length; i++) {
                targetKeys.push(res[i]['itemCode'])
            }
            this.setState({ targetKeys });
            this.getAllItems(targetKeys);
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
        let {targetKeys} = this.state,itemIds = '';
        if (!targetKeys.length) {
            message.info('请选择已被分配项目！');
            return
        }
        for( let i = 0; i < targetKeys.length; i++ ) {
            itemIds += `&itemIds=${targetKeys[i]}`
        }
        axios({
            url: `${this.props.url.firePosition}/assignItems?positionId=${this.props.id}${itemIds}`,
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

export default AssignItems;
