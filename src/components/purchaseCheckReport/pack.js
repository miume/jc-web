import React from 'react';
import {Divider, Table,Button,Input} from 'antd';
import '../Home/page.css';
import WhiteSpace from "../BlockQuote/whiteSpace";
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import axios from "axios";
//
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
    i: '审核中'
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
    i: '不通过'
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
    i: '已通过'
}];

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');
const server = localStorage.getItem('remote');

class Pack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
        };
        this.fetch=this.fetch.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        }
    };
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <div className="fl">
                    <Button>生成</Button>
                    <Button>删除</Button>
                </div>
                <div className="fr">
                    <SearchCell

                    />
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <PackTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.pagination}
                    // fetch={this.fetch}
                />
            </div>
        )
    };
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',

        });
    };
    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios({
            // url: `${server}/jc/purchaseReportRecord/getAllByPage`,
            url: `http://2p277534k9.iok.la:58718/jc/purchaseReportRecord/getAllByPage`,
            method: 'get',
            headers:{
                'Authorization': Authorization
            },
            params: params,
            // type: 'json',
        }).then((data) => {
            console.log('data',data.data)
            const res = data.data.data;
            console.log('res',res);
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                loading: false,
                dataSource: res.list,
            });
        });
    };
    // componentDidMount() {
    //     this.fetch();
    // }
    /**---------------------- */
    /**实现全选功能 */

    /**---------------------- */
}

export default Pack;