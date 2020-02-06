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
            allTypeData: [],
            subTypeFlag:false
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
        this.getAllMaterialName=this.getAllMaterialName.bind(this)
    }

    render() {
        let {visible,plantCode,typeData,subTypeData,nameData,materialName,materialId,materialTypeId,subTypeId,safetyStockValue,subTypeFlag} = this.state, {title,flag} = this.props;
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
                    <div className={'basis-data-flex'}>
                        <Select placeholder={'请选择所属物料大类'}  value={materialTypeId} style={{width:200}} onChange={this.selectChange}>
                            {
                               typeData &&typeData.length ? typeData.map(e => <Option key={e.id} value={e.id} name={'materialTypeId'}>{e.typeName}</Option>) : null
                            }
                        </Select>

                        <Select placeholder={'请选择所属物料小类'}  value={subTypeId} style={{width:200}} onChange={this.selectChange} disabled={!subTypeFlag}>
                            {
                                subTypeData&&subTypeData.length ? subTypeData.map(e => <Option key={e.id} value={e.id} name={'subTypeId'}>{e.subTypeName}</Option>) : null
                            }
                        </Select>
                    </div>

                    <div className={'basis-data-flex'}>
                        <Select placeholder={'请选择物料名称'} value={materialId} style={{width:200}} onChange={this.selectChange}>
                            {
                                nameData&&nameData.length ? nameData.map(e => <Option key={e.id} value={e.id}  name={'materialId'}>{e.materialName}</Option>) : null
                            }
                        </Select>
                        <Input placeholder={'请输入安全库存值'} name={'safetyStockValue'} value={safetyStockValue} style={{width:200}} onChange={this.inputChange}/>
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

    /**点击新增，编辑事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {subTypeId,materialId,materialTypeId,safetyStockValue,id} = record;
            this.setState({
                subTypeId:subTypeId.toString(),
                materialId:materialId.toString(),
                materialTypeId:materialTypeId.toString(),
                safetyStockValue,
                id
            });
            this.getAllSubType(materialId.toString())
        }
        this.setState({
            visible: true
        });
        this.getAllType()
        this.getAllMaterialName()
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false,
            materialId:undefined,
            subTypeId:undefined,
            materialTypeId:undefined,
            safetyStockValue:undefined
        });
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
      /**根据所选物料大类获取所有物料小类*/
      getAllSubType(type){
        axios({
            url: `${this.props.url.subMaterial.subMaterial}/getByType`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                type:type
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    subTypeData: res
                })
            }
        })
    }
    /**获取所有物料名称*/
    getAllMaterialName(){
        axios({
            url: `${this.props.url.materialInfoSto.materialInfo}/getAll`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    nameData: res
                })
            }
        })
    }
    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }
    selectChange(value,name){
        name=name.props.name
        if(name==='materialTypeId'){
            this.getAllSubType(value)
            this.setState({
                subTypeFlag:true,
                subTypeId:undefined
            })
        }
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
                    message.info(data.data.data);
                }
            })
        }
    }

    saveDataProcessing() {
        let {materialId,subTypeId,materialTypeId,safetyStockValue,id} = this.state,
            data = {
                id,
                materialId,
                subTypeId,
                materialTypeId,
                safetyStockValue
            }, method = 'post', url = `${this.props.url.swmsBasicSafetyStock}/add`;
        if(!materialId||!subTypeId||!materialTypeId||!safetyStockValue) {
            message.info('请将信息填写完整！');
            return false
        }
        if(id) {
            method = 'put';
            url =` ${this.props.url.swmsBasicSafetyStock}/${id}`;
        }
        return {data,method,url};
    }
}

export default AddModal;
