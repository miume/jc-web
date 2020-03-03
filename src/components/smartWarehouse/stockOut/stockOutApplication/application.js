import React from 'react';
import Search from "./seach";
import Left from "./left";
import Right from "./right";
import axios from 'axios';
// const data = [{
//     id: 1,
//     materialName: '物料名称',
//     RealWeight: '实际库存',
//     UsefulWeight: '可用库存'
// }],
//     data1 = [];
// for(let i = 0; i < 20; i++) {
//     data1.push({
//         id: i,
//         index: i,
//         unit: `单位${i}`,
//         materialName: `物料名称${i}`,
//         batch: `批号${i}`,
//         weight: `重量${i}`,
//         groupNum: 0
//     })
// }

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            selectedRows: [],
            selectedRowKeys: []
        };
        this.reset = this.reset.bind(this);
        this.remove = this.remove.bind(this);
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
        this.updateData = this.updateData.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }


    render() {
        let {url,type} = this.props, {data,data1,selectedRows,selectedRowKeys} = this.state,
            rowSelection = {
                selectedRowKeys,
                // onChange: this.selectChange,
                onSelect: this.selectChange,
                onSelectAll: this.onSelectAll

            };
        return (
            <div className={'stock-out'}>
                <Search url={url} search={this.search} reset={this.reset}/>
                <div className={'stock-out-middle stock-out-flex'}>
                    <Left url={url} type={type} data={data} data1={data1} rowSelection={rowSelection} updateData={this.updateData}/>
                    <div style={{width: '2%'}}></div>
                    <Right url={url} type={type} data={selectedRows} delete={this.delete}/>
                </div>
            </div>
        )
    }

    search(params) {
        let {type} = this.props;
        axios({
            url: `${this.props.url[type]}/query`,
            method: 'get',
            params
        }).then(data => {
            let res = data.data.data ? data.data.data.ups : [];
            this.setState({
                data: res
            })
        })
    }

    updateData(preClickedIndex,index) {
        if(preClickedIndex === index) return;
        let {data} = this.state;
        if (preClickedIndex !== undefined) {
            data[preClickedIndex]['isClicked'] = false;
        }
        data[index]['isClicked'] = true;
    }

    /**用户手动选择/取消选择某行的回调*/
    selectChange(record, selected) {
        let {selectedRows,selectedRowKeys} = this.state, {id} = record;
        if(selected) {
            selectedRowKeys.push(id);
            selectedRows.push(record);
        } else {
            this.remove(selectedRowKeys,selectedRows,id);
        }
        this.setState({
            selectedRows,
            selectedRowKeys
        })
    }

    onSelectAll(selected, selectedRow, changeRows) {
        let {selectedRows,selectedRowKeys} = this.state;
        if(selected) {
            changeRows.map(e => {
                selectedRows.push(e);
                selectedRowKeys.push(e.id);
            })
        } else {
            changeRows.map(e => {
                this.remove(selectedRowKeys,selectedRows,e.id);
            })
        }
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    /**删除数组中指定元素*/
    remove(arr,arrObj,value) {
        let index = arr.indexOf(value);
        arr.splice(index,1);
        arrObj.splice(index,1);
        return {arr,arrObj}
    }

    delete(id) {
        let {selectedRowKeys,selectedRows} = this.state;
        this.remove(selectedRowKeys,selectedRows,id);
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    reset() {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        })
    }
}

export default Application;
