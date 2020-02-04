import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Input, Modal, message, Select, Checkbox} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
const {Option} = Select, CheckboxGroup = Checkbox.Group;;

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            allTypeData: [],
            allSubTypeData: [],
            indeterminate: true,
            selectAllItems: [],
            selectedItems: [],
            allUnitData: []
        };
        this.getAllUnit = this.getAllUnit.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.getAllSubMaterial = this.getAllSubMaterial.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,materialName,allTypeData,allSubTypeData,allUnitData,subTypeCode,plantCode,indeterminate,checkAll,selectedItems,selectAllItems} = this.state, {title,flag} = this.props;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={600}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'basis-data-flex'}>
                        <Select placeholder={'请选择所属物料大类'} name={'plantCode'} value={plantCode} style={{width:200}} onChange={this.selectChange}>
                            {
                                allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id}>{e.typeName}</Option>) : null
                            }
                        </Select>

                        <Select placeholder={'请选择所属物料小类'} name={'plantCode'} style={{width:200}} onChange={this.selectChange}>
                            {
                                allSubTypeData.length ? allSubTypeData.map(e => <Option key={e.id} value={e.id}>{e.subTypeName}</Option>) : null
                            }
                        </Select>
                    </div>
                     <div className={'basis-data-flex'}>
                        <Select placeholder={'请选择计量单位'} name={'plantCode'} value={plantCode} style={{width:200}} onChange={this.selectChange}>
                            {
                                allUnitData.length ? allUnitData.map(e => <Option key={e.id} value={e.id}>{e.measureUnit}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div className={'basis-data-flex'}>
                        <Input placeholder={'请输入代码'} name={'subTypeCode'} value={subTypeCode} style={{width:200}} onChange={this.inputChange}/>
                        <Input placeholder={'请输入物料名称'} name={'materialName'} value={materialName} style={{width:200}} onChange={this.inputChange}/>
                    </div>

                    <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
                            全选/全不选
                    </Checkbox>

                    <div className={'basis-data-checkbox'}>
                        <CheckboxGroup
                            options={selectAllItems}
                            value={selectedItems}
                            onChange={this.checkBoxChange}
                        />
                    </div>

                    <Checkbox>
                            参与流量统计
                    </Checkbox>
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
            let {subTypeId,materialTypeId,measureUnit,materialName,materialNameCode,id} = record;
            this.setState({
                materialTypeId,
                subTypeId,
                measureUnit,
                materialName,
                materialNameCode,
                id
            });
        } else {
            this.setState({
                checkAll: true
            })
        }
        this.setState({
            visible: true
        });
        this.getAllUnit();
        this.getAllType();
        this.getAllItems();
        this.getAllSubMaterial();
    }

    /**获取所有物料大类*/
    getAllType() {
        axios({
            url: `${this.props.url.material.material}/getAll`,
            method: 'get'
        }).then(data => {
            let res = data.data.data;
            this.setState({
                allTypeData: res
            })
        })
    }

    /**获取所有单位*/
    getAllUnit() {
        axios({
            url: `${this.props.url.unit.unit}/getAll`,
            method: 'get'
        }).then(data => {
            let res = data.data.data;
            this.setState({
                allUnitData: res
            })
        })
    }

    /**获取所有元素*/
    getAllItems() {
        this.setState({
            selectAllItems: ['Ca','Si','Cu','Na','Zn','BET','nih真的单纯的 v 发 v 次大扫除','你蛤宋说上到vcdvdcd'],
            selectedItems: ['Ca','Si','Cu','Na','Zn','BET'],
        })
    }

    getAllSubMaterial() {
        axios({
            url: `${this.props.url.subMaterial.subMaterial}/getAll`,
            method: 'get'
        }).then(data => {
            let res = data.data.data;
            this.setState({
                allSubTypeData: res
            })
        })
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    /**全选或全不选*/
    onCheckAllChange(e) {
        let target = e.target;
        this.setState({
            checkAll: target.checked,
            indeterminate: false,
            selectedItems: target.checked ? this.state.selectAllItems : []
        })
    }

    checkBoxChange(value) {
        let {selectAllItems} = this.state;
        this.setState({
            selectedItems: value,
            checkAll: selectAllItems.length  === value.length,
            indeterminate: !!value.length && value.length < selectAllItems.length
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
        let {siteName,code} = this.state,
            data = {
                code,
                siteName
            }, method = 'post', url = this.props.url.checkSite.add;
        if(!siteName) {
            message.info('请将站点名称填写完整！');
            return false
        }
        if(code) {
            method = 'put';
            url = this.props.url.checkSite.update;
        }
        return {data,method,url};
    }
}

export default AddModal;
