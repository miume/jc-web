import React from 'react';
import {Button, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";
const {Option} = Select;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.getAllSubType = this.getAllSubType.bind(this);
        this.getAllMaterialName = this.getAllMaterialName.bind(this);
    }

    render() {
        return (
            <div className={'stock-out-flex'}>
                <div>
                    <span>物料大类: </span>
                    <Select placeholder={'请选择物料大类'} style={{width:200}}></Select>
                </div>

                <div>
                    <span>物料小类: </span>
                    <Select placeholder={'请选择物料小类'} style={{width:200}}></Select>
                </div>

                <div>
                    <span>供货单位: </span>
                    <Select placeholder={'请选择供货单位'} style={{width:200}}></Select>
                </div>

                <div>
                    <span>物料名称: </span>
                    <Select placeholder={'请选择物料名称'} style={{width:200}}></Select>
                </div>

                <div>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllType();
    }

    /**获取所有物料大类*/
    getAllType() {

    }

    /**获取所有物料小类*/
    getAllSubType() {

    }

    /**获取所有物料名称*/
    getAllMaterialName() {

    }

    /**搜索事件*/
    search() {

    }

    reset() {

    }

}

export default Search;
