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
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,name,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8} = this.state, {title,flag} = this.props;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={500}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Input placeholder={'请输入产品型号'} name={'name'} value={name}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'请输入1#窑炉'} name={'lossrate1'} value={lossrate1}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入2#窑炉'} name={'lossrate2'} value={lossrate2}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入3#窑炉'} name={'lossrate3'} value={lossrate3}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入4#窑炉'} name={'lossrate4'} value={lossrate4}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入5#窑炉'} name={'lossrate5'} value={lossrate5}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入6#窑炉'} name={'lossrate6'} value={lossrate6}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入7#窑炉'} name={'lossrate7'} value={lossrate7}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入8#窑炉'} name={'lossrate8'} value={lossrate8}  onChange={this.inputChange}/>
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
            let {name,code,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8} = record;
            this.setState({
                name,code,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8
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
            name: undefined,
            lossrate1: undefined,
            lossrate2: undefined,
            lossrate3: undefined,
            lossrate4: undefined,
            lossrate5: undefined,
            lossrate6: undefined,
            lossrate7: undefined,
            lossrate8: undefined
        });
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
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

    /**需要修改url */
    saveDataProcessing() {
        let {name,code,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8} = this.state,
            data = {
                name,
                lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8
            }, method = 'post', url = `${this.props.url.swmsBasicDeliveryAddressInfo}/add`, flag;
        for(let i in data) {
            if (!data[i]) {
                flag = true
                break
            }
        }
        if(flag) {
            message.info('请填写完整！');
            return
        }
        if(code) {
            data['code'] = code;
            method = 'put';
            url = `${this.props.url.swmsBasicDeliveryAddressInfo}/${code}`;
        }
        return {data,method,url};
    }
}

export default AddModal;
