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
            allUnitData: [],
            allSupplierData: []
        };
        this.getAllUnit = this.getAllUnit.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.streamFlagChange = this.streamFlagChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.getAllSubMaterial = this.getAllSubMaterial.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.materialTypeChange = this.materialTypeChange.bind(this);
        this.getAllSupplierData = this.getAllSupplierData.bind(this);
    }

    render() {
        let {visible,materialName,allTypeData,allSubTypeData,allUnitData,subTypeId,measureUnit,materialNameCode,
            checkAll,selectedItems,selectAllItems,streamFlag,materialTypeId,supplierId,allSupplierData} = this.state, {title,flag} = this.props;
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
                        <Select placeholder={'请选择所属物料大类'} name={'materialTypeId'} value={materialTypeId} style={{width:200}} onChange={this.materialTypeChange}>
                            {
                                allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id}>{e.typeName}</Option>) : null
                            }
                        </Select>

                        <Select placeholder={'请选择所属物料小类'} name={'subTypeId'} style={{width:200}} value={subTypeId} onChange={this.selectChange}>
                            {
                                allSubTypeData.length ? allSubTypeData.map(e => <Option key={e.id} name={'subTypeId'} value={e.id}>{e.subTypeName}</Option>) : null
                            }
                        </Select>
                    </div>
                     <div className={'basis-data-flex'}>
                        <Select placeholder={'请选择计量单位'} name={'measureUnit'} value={measureUnit} style={{width:200}} onChange={this.selectChange}>
                            {
                                allUnitData.length ? allUnitData.map(e => <Option key={e.id} name={'measureUnit'} value={e.measureUnit}>{e.measureUnit}</Option>) : null
                            }
                        </Select>

                         <Select placeholder={'请选择供应商'} name={'supplierId'} value={supplierId} style={{width:200}} onChange={this.selectChange}>
                            {
                                allSupplierData.length ? allSupplierData.map(e => <Option key={e.id} name={'supplierId'} value={e.id}>{e.materialSupplierName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div className={'basis-data-flex'}>
                        <Input placeholder={'请输入代码'} name={'materialNameCode'} value={materialNameCode} style={{width:200}} onChange={this.inputChange}/>
                        <Input placeholder={'请输入物料名称'} name={'materialName'} value={materialName} style={{width:200}} onChange={this.inputChange}/>
                    </div>

                    <Checkbox onChange={this.onCheckAllChange} checked={checkAll}>
                            全选/全不选
                    </Checkbox>
                    <Checkbox checked={streamFlag} onChange={this.streamFlagChange}>
                            参与流量统计
                    </Checkbox>

                    <div className={'basis-data-checkbox'}>
                        <CheckboxGroup
                            options={selectAllItems}
                            value={selectedItems}
                            onChange={this.checkBoxChange}
                        />
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
            let {subTypeId,materialTypeId,measureUnit,materialName,materialNameCode,streamFlag,id,metal,supplierId} = record;
            this.setState({
                materialTypeId: materialTypeId.toString(),
                subTypeId: subTypeId.toString(),
                selectedItems: metal,
                measureUnit,
                materialName,
                materialNameCode,
                streamFlag,
                supplierId: supplierId.toString(),
                id
            });
            this.getAllSubMaterial(materialTypeId);
        } else {
            this.setState({
                checkAll: true,
                selectedItems: ['Ni','Co','Mn','NH3','Alkali']
            })
        }
        this.setState({
            visible: true
        });
        this.getAllUnit();
        this.getAllType();
        this.getAllItems();
        this.getAllSupplierData();
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

    getAllSupplierData() {
        axios({
            url: `${this.props.url.supplier.supplier}/getAll`,
            method: 'get'
        }).then(data => {
            let res = data.data.data;
            this.setState({
                allSupplierData: res
            })
        })
    }

    /**获取所有元素*/
    getAllItems() {
        this.setState({
            selectAllItems: ['Ni','Co','Mn','NH3','Alkali']
        })
    }

    getAllSubMaterial(type) {
        axios({
            url: `${this.props.url.subMaterial.subMaterial}/getByType?type=${type}`,
            method: 'get'
        }).then(data => {
            let res = data.data.data;
            this.setState({
                allSubTypeData: res
            })
        })
    }

    materialTypeChange(value) {
        this.setState({
            materialTypeId: value,
            subTypeId: undefined
        });
        this.getAllSubMaterial(value);
    }

    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
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

    streamFlagChange(e) {
        let target = e.target;
        this.setState({
            streamFlag: target.checked
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
                if(data.data.code === '000000') {
                    message.info(data.data.mesg);
                    this.props.getTableParams();
                } else {
                    message.info(data.data.data);
                }
            })
        }
    }

    saveDataProcessing() {
        let {streamFlag,id,materialTypeId,subTypeId,measureUnit,materialName,materialNameCode,selectedItems,supplierId} = this.state,
            data = {
                id,
                streamFlag,
                materialTypeId,
                subTypeId,
                measureUnit,
                materialName,
                materialNameCode,
                supplierId,
                autoFlag: true,
                niFlag: selectedItems.includes('Ni') ? true : false,
                coFlag: selectedItems.includes('Co') ? true : false,
                mnFlag: selectedItems.includes('Mn') ? true : false,
                nhFlag: selectedItems.includes('NH3') ? true : false,
                alkaliFlag: selectedItems.includes('Alkali') ? true : false,
            }, method = 'post', url = this.props.url.materialInfoSto.materialInfo + '/add';
        if(!materialTypeId && !subTypeId && !measureUnit && !materialName && !materialNameCode) {
            message.info('请将信息填写完整！');
            return false
        }
        if(id) {
            delete data['autoFlag'];
            method = 'put';
            url = this.props.url.materialInfoSto.materialInfo + `/${id}`;
        }
        return {data,method,url};
    }
}

export default AddModal;
