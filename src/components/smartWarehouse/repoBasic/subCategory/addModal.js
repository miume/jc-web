import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Input, Modal, message, Select} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
const {Option} = Select;

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            allTypeData: []
        };
        this.getAllType = this.getAllType.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,subTypeName,subTypeCode,plantCode,allTypeData} = this.state, {title,flag} = this.props;
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
                        <div>&nbsp;代码(车间号)：</div>
                        <Input placeholder={'请输入代码(车间号)'} name={'subTypeCode'} value={subTypeCode} style={{width:200}} onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <div>物料小类名称：</div>
                        <Input placeholder={'请输入物料小类名称'} name={'subTypeName'} value={subTypeName} style={{width:200}} onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <div style={{width:98,textAlign: 'right'}}>所属大类：</div>
                        <Select placeholder={'请选择所属大类'} name={'plantCode'} value={plantCode} style={{width:200}} onChange={this.selectChange}>
                            {
                                allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id}>{e.typeName}</Option>) : null
                            }
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
            let {subTypeCode,subTypeName,plantCode,code} = record;
            this.setState({
                subTypeCode,
                subTypeName,
                plantCode,
                code
            });
        }
        this.setState({
            visible: true
        });
        this.getAllType();
    }

    /**获取所有物料大类*/
    getAllType() {
        let data = [{
            id: 1,
            typeName: '物料名称'
        }]
        this.setState({
            allTypeData: data
        })
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    selectChange(value) {
        this.setState({
            typeCode: value
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
                message.info(data.data.message);
                this.props.getTableParams();
            })
        }
    }

    saveDataProcessing() {
        let {subTypeName,code,subTypeCode,plantCode} = this.state,
            data = {
                code,
                subTypeName,
                subTypeCode,
                plantCode
            }, method = 'post', url = this.props.url.checkSite.add;
        if(!subTypeCode || !subTypeName || !plantCode) {
            message.info('请将新增信息填写完整！');
            return false
        }
        if(code) {
            method = 'put';
            url = this.props.url.checkSite.update;
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
