import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import OperationTable from './operationTable';
import '../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
// import DeleteModal from "./deleteModal";
import {message} from "antd";
import DeleteModal from "../operationManagement/deleteModal";

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');

class OperationManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            loading: false,
            pagination:{},
        };
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
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
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name="操作管理"></BlockQuote>
                <div className="fl">
                    <AddModal
                        fetch={this.fetch}
                    />
                    <DeleteModal
                        selectedRowKeys={this.state.selectedRowKeys}
                        start={this.start}
                        loading={loading}
                        cancel={this.cancel}
                    />
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <OperationTable
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    rowSelection={rowSelection}
                    fetch={this.fetch}
                />
            </div>
        )
    }

    /**修改父组件的数据 */
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',

        });
    }
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        axios({
            url: 'http://218.77.105.241:40080/jc/operation/getOperationsByPage',
            method: 'get',
            headers:{
                'Authorization': Authorization
            },
            params: params,
            // type: 'json',
        }).then((data) => {
            console.log(data.data.data.list);
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.pages-1)*10+i;
            }
            this.setState({
                loading: false,
                dataSource: res.list,
            });
        });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /**实现批量删除功能 */
    start = () => {
        const ids = this.state.selectedRowKeys;
        console.log(ids);
        axios({
            url:'http://218.77.105.241:40080/jc/operation/deleteByIds',
            method:'Delete',
            headers:{
                'Authorization':Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            console.log(data);
            message.info(data.data.message);
            this.fetch();
        }).catch((error)=>{
            console.log(error);
            message.info(error.data.message)
        });
        // this.setState({ loading: true });
        // // ajax request after empty completing
        // setTimeout(() => {
        //     this.setState({
        //         selectedRowKeys: [],
        //         loading: false,
        //     });
        // }, 1000);
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    /**---------------------- */
    /**实现单条数据功能 */

    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default OperationManagement;