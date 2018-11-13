import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import InterTable from '../intermediateProductTest/intermediateTable';
import axios from "axios";

const data = [{
    id: '1',
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i'
}];
class InterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
        };
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            }
        };
    }
    render() {
        const rowSelection = {
            onChange: this.onSelectChange,
            onSelect() {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll() {
                // console.log(selected, selectedRows, changeRows);
            },
        };
        return(
            <div>
                <BlockQuote name="中间品料检测报告发布"></BlockQuote>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <InterTable data={this.state.dataSource} rowSelection={rowSelection} pagination={this.pagination} />
            </div>
        )
    }
    /**获取所有数据功能 */
    // handleTableChange = (pagination) => {
    //     // const pager = { ...this.state.pagination };
    //     // console.log(pagination)
    //     // pager.current = pagination.current;
    //     // this.setState({
    //     //   pagination: pager,
    //     // });
    //     this.fetch({
    //         size: pagination.pageSize,
    //         page: pagination.current,
    //         sortField: 'id',
    //         sortOrder: 'desc',
    //
    //     });
    // };
    // fetch = (params = {}) => {
    //     console.log('params:', params);
    //     this.setState({ loading: true });
    //     axios({
    //         url: 'http://218.77.105.241:40080/jc/role/getRolesByPage',
    //         method: 'get',
    //         headers:{
    //             'Authorization': Authorization
    //         },
    //         data: {
    //             // size: 10,
    //             ...params,
    //         },
    //         type: 'json',
    //     }).then((data) => {
    //         const res = data.data.data.list;
    //         this.setState({
    //             loading: false,
    //             dataSource: res,
    //         });
    //     });
    // };
    /**---------------------- */
    /**实现修改state功能 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    /**---------------------- */
    /**实现全选功能 */
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default InterProduct;