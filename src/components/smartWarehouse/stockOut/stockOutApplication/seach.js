import React from 'react';
import {Button, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import axios from "axios";
const {Option} = Select;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materialData: [],
            allTypeData: [],
            allSubTypeData: [],
            supplierData: []
        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getAllSubType = this.getAllSubType.bind(this);
        this.checkedChange = this.checkedChange.bind(this);
        this.getAllSupplier = this.getAllSupplier.bind(this);
        this.getAllMaterialName = this.getAllMaterialName.bind(this);
    }

    render() {
        let {type,allTypeData,matId,subType,supplierId,allSubTypeData,materialData,supplierData} = this.state;
        return (
            <div className={'stock-out-flex'}>
                <div>
                    <span>物料大类: </span>
                    <Select placeholder={'请选择物料大类'} value={type} style={{width:150}} onChange={this.selectChange}>
                        {
                            allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id} name={'type'}>{e.typeName}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>物料小类: </span>
                    <Select placeholder={'请选择物料小类'} style={{width:150}} value={subType} onChange={this.selectChange}>
                        {
                            allSubTypeData.length ? allSubTypeData.map(e => <Option key={e.id} name={'subType'} value={e.id}>{e.subTypeName}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>物料名称: </span>
                    <Select placeholder={'请选择物料名称'} style={{width:150}} value={matId} onChange={this.selectChange}>
                        {
                            materialData.length ? materialData.map(e => <Option key={e.id} value={e.id} name={'matId'}>{e.materialName}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>供货单位: </span>
                    <Select placeholder={'请选择供货单位'} style={{width:150}} value={supplierId} onChange={this.selectChange} 
                            dropdownMatchSelectWidth={false} dropdownStyle={{width: 200}}>
                        {
                            supplierData.length ? supplierData.map(e => <Option key={e.id} value={e.id} name={'supplierId'}>{e.materialSupplierName}</Option>) : null
                        }
                    </Select>
                </div>

                {/*<div style={{lineHeight: '35px'}}>*/}
                    {/*组单出库：*/}
                    {/*<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked onChange={this.checkedChange}/>*/}
                {/*</div>*/}
                <div>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 清空</Button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllType();
        this.getAllSupplier();
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

    /**获取所有物料小类*/
    getAllSubType(type) {
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

    /**获取所有物料名称*/
    getAllMaterialName(type,subType) {
        axios({
            url: `${this.props.url.materialInfoSto.materialInfo}/getByTypeBySubtype?subType=${subType}&type=${type}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    materialData: res
                })
            }
        })
    }

    /**监控select变化*/
    selectChange(value,option) {
        let name = option.props.name;
        if(name === 'type') {
            this.setState({
                type: value,
                subType: undefined
            });
            this.getAllSubType(value);
        } else if(name === 'subType') {
            let {type} = this.state;
            this.setState({
                subType: value
            })
            this.getAllMaterialName(type,value)
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    /**获取所有供货商信息*/
    getAllSupplier(){
        axios({
            url: `${this.props.url.supplier.getAll}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    supplierData: res
                })
            }
        })
    }

    checkedChange(checked) {
        this.setState({
            checked
        })
    }

    /**搜索事件*/
    search() {
        let {supplierId,subType,matId,type} = this.state,
            params = {
                type,
                subType,
                supplierId,
                matId
            };
        this.props.search(params);
    }

    reset() {
        this.setState({
            type: undefined,
            subType: undefined,
            supplierId: undefined,
            matId: undefined
        });
        this.props.reset();
    }

}

export default Search;
