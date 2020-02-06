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
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.getAllSubType=this.getAllSubType.bind(this);
        this.getAllType=this.getAllType.bind(this);
    }

    render() {
        let {visible,materialTypeId,subTypeId,typeData,subTypeData,deadline} = this.state, {title,flag} = this.props;
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
                        <Select placeholder={'请选择所属物料大类'} value={materialTypeId} style={{width:360}} onChange={this.selectChange}>
                            {
                                typeData&&typeData.length ? typeData.map(e => <Option key={e.id} value={e.id} name={'materialTypeId'}>{e.typeName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div className={'check-item'}>
                        <Select placeholder={'请选择所属物料小类'} value={subTypeId} style={{width:360}} onChange={this.selectChange}>
                            {
                                subTypeData&&subTypeData.length ? subTypeData.map(e => <Option key={e.id} value={e.id} name={'subTypeId'}>{e.typeName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'请输入呆滞期限(天)'} name={'deadline'} value={deadline}  onChange={this.inputChange}/>
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
    /**获取所有物料大类*/
    getAllType(){
        axios({
            url: `${this.props.url.material.material}/getAll`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    typeData: res
                })
            }
        })
    }
      /**获取所有物料小类*/
      getAllSubType(){
        axios({
            url: `${this.props.url.subMaterial.subMaterial}/getAll`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    subTypeData: res
                })
            }
        })
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {deadline,materialTypeId,subTypeId,id} = record;
            this.setState({
                deadline,
                materialTypeId:materialTypeId.toString(),
                subTypeId:subTypeId.toString(),
                id
            });
        }
        this.setState({
            visible: true
        });
        this.getAllSubType()
        this.getAllType()
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false,
            subTypeId:undefined,
            materialTypeId:undefined,
            deadline:undefined
        });
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
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
                   message.info(data.data.data)
               }
            })
        }
    }

    saveDataProcessing() {
        let {deadline,materialTypeId,subTypeId,id} = this.state,
            data = {
                id,
                deadline,
                materialTypeId,
                subTypeId
            }, method = 'post', url = `${this.props.url.swmsBasicInactionStockDeadline}/add`;
        if(!deadline||!materialTypeId||!subTypeId) {
            message.info('请将信息填写完整！');
            return false
        }
        if(id) {
            method = 'put';
            url = `${this.props.url.swmsBasicInactionStockDeadline}/${id}`;
        }
        return {data,method,url};
    }
}

export default AddModal;
