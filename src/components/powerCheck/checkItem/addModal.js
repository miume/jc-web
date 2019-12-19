import React from 'react';
import NewButton from "../../BlockQuote/newButton";
import {Input, Modal, Select} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
const {Option} = Select;

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0
        };
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,type,name,place,item,content,frequency} = this.state, {title} = this.props;
        return (
            <span>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={400}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <div className={'check-item-div'}>点检站点：</div>
                        <Input placeholder={'请输入点检站点'} name='name' value={name} style={{width:200}} onChange={this.inputChange}/>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>地点：</div>
                        <Input placeholder={'请输入地点'} name={'place'} value={place} style={{width:200}} onChange={this.inputChange}/>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>设备名/点检项目：</div>
                        <Input placeholder={'请输入设备名/点检项目'} name={'item'} value={item} style={{width:200}} onChange={this.inputChange}/>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>点检内容：</div>
                        <Input placeholder={'请输入点检内容'} name={'content'} value={content} style={{width:200}} onChange={this.inputChange} />
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>输入类型：</div>
                        <Select onChange={this.selectChange} value={type} style={{width:200}}>
                            <Option value={0}>勾选</Option>
                            <Option value={1}>输入</Option>
                        </Select>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>频率：</div>
                        <Input placeholder={'请输入，例：1次/天'} name={'frequency'} value={frequency} style={{width:200}} onChange={this.inputChange} />
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
            let {name,place,item,content,type,frequency,code} = record;
            this.setState({
                name,
                place,
                item,
                content,
                type,
                frequency,
                code
            })
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    selectChange(value) {
        this.setState({
            type: value
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    handleSave() {
        let params = this.saveDataProcessing();
        // axios({
        //     url: `url`,
        //     method: 'put',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     }
        // }).then((data) => {
        //     message.info(data.data.message);
        // })
    }

    saveDataProcessing() {
        let {place,frequency} = this.state;
        console.log(this.state)
    }
}

export default AddModal;
