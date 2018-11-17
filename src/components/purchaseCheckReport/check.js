import React from 'react';
import {Divider, Table,Button,Input} from 'antd';
import '../Home/page.css';
import WhiteSpace from "../BlockQuote/whiteSpace";
import CheckTable from './checkTable';

const data = [{
    index:'1',
    id: '32',
    a: '周小伟',
    b: '启动',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: '无',
    h: '无',
    i: '审核中',
    j: 'j',
    k: 'k',
    l: 'l'
},{
    index:'2',
    id: '33',
    a: '周小伟',
    b: '启动',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: '无',
    h: '无',
    i: '不通过',
    j: 'j',
    k: 'k',
    l: 'l'
},{
    index:'3',
    id: '34',
    a: '周小伟',
    b: '启动',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: '无',
    h: '无',
    i: '已通过',
    j: 'j',
    k: 'k',
    l: 'l'
}];

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
        };
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const Search = Input.Search;
        return(
            <div>
                <div className="fl">
                    <Button>删除</Button>
                </div>
                <div style={{float:'right'}}>
                    <Search
                        placeholder="请输入搜索内容"
                        onSearch={value => console.log(value)}
                        enterButton
                        style={{ width: 200 }}
                    />
                    <Button  type="primary" style={{marginLeft:10}}>重置</Button>
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <CheckTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
}

export default Check;