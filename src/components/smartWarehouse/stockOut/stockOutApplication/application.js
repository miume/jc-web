import React from 'react';
import Search from "./seach";
import Left from "./left";
import Right from "./right";
import axios from 'axios';
import {message} from 'antd';
// const data = [{
//     id: 1,
//     materialName: '物料名称',
//     RealWeight: '实际库存',
//     UsefulWeight: '可用库存'
// }],
// const data1 = [];
// for(let i = 0; i < 20; i++) {
//     data1.push({
//         id: i + 1,
//         ledgersId: i + 1,
//         index: i + 1,
//         matId: i + 1,
//         matName: `物料名称${i}`,
//         metBatch: i % 2 ? `MC/BN180808-0-RAW-YS${i+1}-1-QDBX-60KG` : `MC/BN180808-0-RAW-TS${i + 10}-1-QDBX-60KG`,
//         weight: i + 10
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
        this.dataPacket = this.dataPacket.bind(this);
    }


    render() {
        let {url,type} = this.props, {data,selectedRows,selectedRowKeys} = this.state,
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
                    <Left url={url} type={type} data={data} rowSelection={rowSelection} updateData={this.updateData}/>
                    <div style={{width: '2%'}}></div>
                    <Right url={url} type={type} data={selectedRows} delete={this.delete} reset={this.reset}/>
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
            if(!record.metBatch.includes('TS') || !record.metBatch.includes('YS')) {
                message.info('所选数据不符合要求，批号必须含有TS(碳酸锂)、YS(前驱体)！');
                return
            }
            selectedRowKeys.push(id);
            selectedRows.push(record);
        } else {
            this.remove(selectedRowKeys,selectedRows,id);
        }
        this.dataPacket(selectedRows);
        this.setState({
            selectedRows,
            selectedRowKeys
        })
    }

    onSelectAll(selected, selectedRow, changeRows) {
        let {selectedRows,selectedRowKeys} = this.state;
        if(selected) {
            for(let i = 0; i < changeRows.length; i++) {
                if(!changeRows[i].metBatch.includes('TS') || !changeRows[i].metBatch.includes('YS')) {
                    message.info('所选数据不符合要求，批号必须含有TS(碳酸锂)、YS(前驱体)！');
                    return
                }
                selectedRows.push(changeRows[i]);
                selectedRowKeys.push(changeRows[i].id);
            }
        } else {
            changeRows.map(e => {
                this.remove(selectedRowKeys,selectedRows,e.id);
            })
        }
        this.dataPacket(selectedRows);
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

    /**数据分组处理
     * (YS)代表前驱体 (TS)代表碳酸锂 两个前驱体和一个碳酸锂组合
     * */
    dataPacket(data) {
        let i = 1, j = 1;
        data.map(e => {
            if(e.metBatch.includes('TS')) {
                e['group'] = (i++).toString();
            }
            if(e.metBatch.includes('YS')) {
                e['group'] = (parseInt(++j / 2)).toString();
            }
        });
        data.sort((a,b) => a.group - b.group);
        for(let k = 0; k < data.length; k++) {
            data[k]['index'] = k + 1;
        }
    }

    delete(id) {
        let {selectedRowKeys,selectedRows} = this.state;
        this.remove(selectedRowKeys,selectedRows,id);
        this.dataPacket(selectedRows);
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    reset() {
        this.setState({
            selectedRowKeys: [],
            selectedRows: [],
            data: []
        })
    }
}

export default Application;
