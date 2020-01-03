import React from 'react';
import {Button, Select, Switch} from "antd";
import NewButton from "../../../BlockQuote/newButton";
const {Option} = Select;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTypeData: []
        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getAllSubType = this.getAllSubType.bind(this);
        this.checkedChange = this.checkedChange.bind(this);
        this.getAllMaterialName = this.getAllMaterialName.bind(this);
    }

    render() {
        let {allTypeData,typeName,subTypeName,supplier,materialName} = this.state;
        return (
            <div className={'stock-out-flex'}>
                <div>
                    <span>物料大类: </span>
                    <Select placeholder={'请选择物料大类'} value={typeName} style={{width:150}} onChange={this.selectChange}>
                        {
                            allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id} name={'typeName'}>{e.name}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>物料小类: </span>
                    <Select placeholder={'请选择物料小类'} style={{width:150}} value={subTypeName} onChange={this.selectChange}>
                        {
                            allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id} name={'subTypeName'}>{e.name}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>物料名称: </span>
                    <Select placeholder={'请选择物料名称'} style={{width:150}} value={materialName} onChange={this.selectChange}>
                        {
                            allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id} name={'materialName'}>{e.name}</Option>) : null
                        }
                    </Select>
                </div>

                <div>
                    <span>供货单位: </span>
                    <Select placeholder={'请选择供货单位'} style={{width:150}} value={supplier} onChange={this.selectChange}>
                        {
                            allTypeData.length ? allTypeData.map(e => <Option key={e.id} value={e.id} name={'supplier'}>{e.name}</Option>) : null
                        }
                    </Select>
                </div>

                <div style={{lineHeight: '35px'}}>
                    组单出库：
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked onChange={this.checkedChange}/>
                </div>
                <div>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 清空</Button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllType();
    }

    /**获取所有物料大类*/
    getAllType() {
        let data = [{
            id: 1,
            name: '物料大类'
        }];
        this.setState({
            allTypeData: data
        })
    }

    /**获取所有物料小类*/
    getAllSubType() {

    }

    /**获取所有物料名称*/
    getAllMaterialName() {

    }

    /**监控select变化*/
    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    checkedChange(checked) {
        this.setState({
            checked
        })
    }

    /**搜索事件*/
    search() {
        let {typeName,subTypeName,materialName,supplier} = this.state,
            params = {
                typeName,
                supplier,
                subTypeName,
                materialName
            };
        this.props.search(params);
    }

    reset() {
        this.setState({
            typeName: undefined,
            supplier: undefined,
            subTypeName: undefined,
            materialName: undefined
        });
        this.props.reset();
    }

}

export default Search;
