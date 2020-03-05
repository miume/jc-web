import React from 'react';
import {Button, DatePicker, TreeSelect} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.getAllType = this.getAllType.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    render() {
        let {date,deptCode,treeData} = this.state;
        return (
            <div className={'stock-out-application'}>
                <div>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                    <Button type="primary" style={{margin: "0 10px"}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
                </div>

                <div>
                    <span>出库日期: </span>
                    <DatePicker placeholder={'请选择日期'} value={date ? moment(date) : null} onChange={this.dateChange} style={{marginRight: 10}}/>
                </div>

                <div>
                    <span>领用单位: </span>
                    <TreeSelect
                        showSearch
                        name={'plantCode'}
                        style={{ width: 175,marginRight: 10 }}
                        value={deptCode}
                        treeCheckStrictly={true}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="请选择领用单位"
                        treeDefaultExpandAll
                        onChange={this.selectChange}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllType();
    }

    /**获取所有领用单位*/
    getAllType() {
        axios.get(`${this.props.url.equipmentDept.dept}`).then(data => {
            let res = data.data.data,treeData = this.dataProcessing(res);
            this.setState({
                treeData
            })
        })
    }

    /**处理物料信息树形结构*/
    dataProcessing(res, result = []) {
        // let parentCode = [];
        for (let i = 0; i < res.length; i++) {
            let parent = res[i]['parent'],
                temp = {
                    title: parent['name'],
                    key: parent['code'],
                    value: parent['name'] + '-' + parent['code'],
                    disabled: false,
                    children: []
                }, son = res[i]['son'];
            // parentCode.push(temp['value']);
            for (let j = 0; j < son.length; j++) {
                temp['children'].push({
                    title: son[j]['name'],
                    key: son[j]['code'],
                    value: son[j]['name'] + '-' + son[j]['code'],
                });
            }
            result.push(temp)
        }
        // this.setState({
        //     parentCode: parentCode
        // });
        return result;
    }

    /**监控工序变化*/
    selectChange(value) {
        this.setState({
            deptCode: value
        });
        // let {parentCode} = this.state;
        // if(!parentCode.includes(value)) {}
    }

    dateChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }

    /**搜索事件*/
    search() {
        let {date,deptCode} = this.state,
            params = {
                date,
                deptCode: deptCode ? deptCode.split('-')[1] : ''
            };
        this.props.search(params);
    }

    reset() {
        this.setState({
            date: undefined,
            deptCode: undefined
        });
        this.props.search({
            date: '',
            deptCode: ''
        });
    }

}

export default Search;
