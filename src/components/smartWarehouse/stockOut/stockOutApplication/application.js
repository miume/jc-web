import React from 'react';
import Search from "./seach";
import Left from "./left";
import Right from "./right";
const data = [{
    id: 1,
    materialName: '物料名称',
    RealWeight: '实际库存',
    UsefulWeight: '可用库存'
}],
    data1 = [];
for(let i = 0; i < 20; i++) {
    data1.push({
        id: i,
        index: i,
        materialName: `物料名称${i}`,
        batch: `批号${i}`,
        weight: `重量${i}`
    })
}

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
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }


    render() {
        let {url} = this.props, {data,data1,selectedRows,selectedRowKeys} = this.state,
            rowSelection = {
                selectedRowKeys,
                onChange: this.selectChange
            };
        return (
            <div className={'stock-out'}>
                <Search url={url} search={this.search} reset={this.reset}/>
                <div className={'stock-out-flex'}>
                    <Left url={url} data={data} data1={data1} rowSelection={rowSelection}/>
                    <div style={{width: '2%'}}></div>
                    <Right url={url} data={selectedRows} delete={this.delete}/>
                </div>
            </div>
        )
    }

    search(params) {
        console.log(params)
        this.setState({
            data,
            data1
        })
    }

    selectChange(selectedRowKeys,selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    delete(id) {
        let {selectedRowKeys,selectedRows} = this.state,index = selectedRowKeys.indexOf(id);
        selectedRowKeys.splice(index,1);
        selectedRows.splice(index,1);
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
