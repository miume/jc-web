import React from 'react';
import axios from 'axios';
import NewButton from "../../BlockQuote/newButton";
import {Input, Modal, message} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";

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
        let {visible,batterypacktracecode,moduletracecode,singletracecode} = this.state, {title,flag} = this.props;

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
                        <Input placeholder={'电池包溯源码'} name={'batterypacktracecode'} value={batterypacktracecode} onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'模组溯源码'} name={'moduletracecode'} value={moduletracecode} onChange={this.inputChange}/>
                    </div>
					<div className={'check-item'}>
                        <Input placeholder={'单体溯源码'} name={'singletracecode'} value={singletracecode} onChange={this.inputChange}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        debugger
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        debugger

        let {record} = this.props;

        if(record) {
            let {batterypacktracecode,moduletracecode,singletracecode,id} = record;
            this.setState({
                batterypacktracecode,
                moduletracecode,
                singletracecode,
				id
            });
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            batterypacktracecode:null,
            moduletracecode:null,
            singletracecode:null,
            id:null,
            visible: false
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
                debugger
                if(data.data.code === 0) {
                    message.info(data.data.message);
                    this.props.getTableParams();
                } else {
                    message.info(data.data.data);
                }
            })
        }
    }

    saveDataProcessing() {
        let {batterypacktracecode,moduletracecode,singletracecode,id} = this.state, {title,flag} = this.props;
        let data,method,url;
        data = {
            "batterypacktracecode": batterypacktracecode,
            "id": id,
            "moduletracecode": moduletracecode,
            "singletracecode": singletracecode
        }
        debugger
        if(title === '新增')
        {
            method = 'post';
            url = this.props.url.TraceabilityBeforeDisassembly.add;
        }
        else
        {
            method = 'put';
            url = this.props.url.TraceabilityBeforeDisassembly.update;
        }

        if(!batterypacktracecode) {
            message.info('请将电池包溯源码填写完整！');
            return false
        }

        return {data,method,url};
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal;
