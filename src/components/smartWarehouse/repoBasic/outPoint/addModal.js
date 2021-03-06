import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Input, Modal, message,Select} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,deliveryAddressName,type} = this.state, {title,flag} = this.props;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={400}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Input placeholder={'请输入出库点'} name={'deliveryAddressName'} value={deliveryAddressName}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <Select placeholder='请选择类型' onChange={this.selectChange} style={{width: '100%'}} value={type}>
                            <Select.Option value='1'>南</Select.Option>
                            <Select.Option value='0'>北</Select.Option>
                        </Select>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {deliveryAddressName,id,type} = record;
            this.setState({
                deliveryAddressName,
                id,
                type: type ? '1' : '0'
            });
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false,
            deliveryAddressName:undefined,
            type: undefined
        });
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    selectChange(value) {
        this.setState({
            type: value
        })
    }

    handleSave() {
        let params = this.saveDataProcessing();
        if(params) {
            let {data,method,url} = params;
            axios({
                url: url,
                method: method,
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data
            }).then((data) => {
                this.handleCancel();
                if(data.data.code==='000000'){
                    message.info(data.data.mesg);
                    this.props.getTableParams();
                }
               else{
                message.info(data.data.data);
               }
            })
        }
    }

    saveDataProcessing() {
        let {deliveryAddressName,id,type} = this.state,
            data = {
                id,
                deliveryAddressName,
                type: type ? true : false
            }, method = 'post', url = `${this.props.url.swmsBasicDeliveryAddressInfo}/add`;
        if(!deliveryAddressName && type !== undefined) {
            message.info('请将新增信息填写完整！');
            return false
        }
        if(id) {
            method = 'put';
            url = `${this.props.url.swmsBasicDeliveryAddressInfo}/${id}`;
        }
        return {data,method,url};
    }
}

export default AddModal;
