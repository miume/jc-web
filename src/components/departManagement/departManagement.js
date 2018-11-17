import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import InterTable from '../departManagement/departTable';
import '../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
import DeleteModal from "./deleteModal";
import {message} from "antd";

const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjQyMjQzN30.2vWxeEQ2wwGXyp1F8aoI8TvErYZaiuEs-v5xCyGhKr4WBZ0YgK1Jo2iYBVGba4gfYoZtiO20-5-fvNnfTPuOwQ'

class Depart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            loading: false,
        };
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
        this.fetch=this.fetch.bind(this);
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name="部门管理"></BlockQuote>
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
                <InterTable
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    rowSelection={rowSelection}
                    fetch={this.fetch}
                />
            </div>
        )
    }
    /**修改父组件的数据 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    modifyDeleteState = (data) => {
        this.setState({
            loading: false,
            dataSource: data,
        });
    }
    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        console.log(pagination);
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            sortField: 'id',
            sortOrder: 'desc',

        });
    };
    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios({
            url: 'http://218.77.105.241:40080/jc/department/getDepartmentsByPage?size=10&orderField=id&orderType=desc',
            method: 'get',
            headers:{
                'Authorization': Authorization
            },
            data: {
                // size: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const res = data.data.data.list;
            this.setState({
                loading: false,
                dataSource: res,
            });
        });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /**实现批量删除功能 */
    start = () => {
        const ids = this.state.selectedRowKeys.toString();
        console.log(ids);
        axios({
            url:`http://218.77.105.241:40080/jc/department/deleteByIds?ids=`+ids,
            method:'Delete',
            headers:{
                'Authorization':Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data.message)
        });
        this.fetch();
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
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

export default Depart;