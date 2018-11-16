import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import InterTable from '../intermediateProductTest/intermediateTable';
import AddButton from '../intermediateProductTest/addButton';
import DeleteButton from '../intermediateProductTest/deleteButton';
import '../Home/page.css';
import axios from "axios";
import {message,Input,Button} from "antd";
const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjI2NDc2Nn0.7UJlJrYa_C0T18q7WpQv90p9E2FAMi6GONUIeL6Rd63eIpOcwxwgzDH6R2EARaipHiPhrNImqKCrbR1o1MCnkA'


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

class InterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
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
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const Search = Input.Search;
        return(
            <div>
                <BlockQuote name="中间品检测"></BlockQuote>
                <div>
                    <div className="fl">
                        <AddButton/>
                        <DeleteButton
                            selectedRowKeys={this.state.selectedRowKeys}
                            start={this.start}
                            loading={loading}
                            cancel={this.cancel}
                        />
                    </div>
                    <div className="fr">
                        <Search
                            placeholder="请输入搜索内容"
                            onSearch={value => console.log(value)}
                            enterButton
                            style={{ width: 200 }}
                        />
                        <Button  type="primary">重置</Button>
                    </div>
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <InterTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.pagination} />
            </div>
        )
    }
    /**获取所有数据功能 */
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
    /**实现批量删除功能 */
    start = () => {
        const ids = this.state.selectedRowKeys.toString();
        console.log(ids);
        // axios({
        //     url:`http://218.77.105.241:40080/jc/department/deleteByIds?ids=`+ids,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':Authorization
        //     },
        // }).then((data)=>{
        //     message.info(data.data.message);
        // }).catch((error)=>{
        //     message.info(error.data.message)
        // });
        // this.fetch();
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