import React from 'react';
import {Divider, Table,Button,Input,Switch} from 'antd';
import '../Home/page.css';
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import axios from "axios";
//
const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        index:i,
        id: i,
        a: '周小伟',
        b: '启动',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: '无',
        h: '无',
        i: 'i',
        j: '已通过'
    });
}


class Pack extends React.Component {
    Authorization;
    server;
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
            searchContent:'',
            searchText: '',
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.modifySelectedRowKeysData = this.modifySelectedRowKeysData.bind(this);
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
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <span>
                    <Button
                        type="primary"
                        style={{marginRight:'15px'}}
                        onClick={this.handleGenerateButton}
                    >生成</Button>
                </span>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    {/*根据后台传过来的一个字段进行判断*/}
                    <span style={{marginRight:'10px',fontSize:'6px'}}>仅显示未生成的数据</span>
                    <Switch onChange={this.urgentChange} size='small' style={{width:'35px',marginBottom:'2px'}}/>
                    <Divider type="vertical" style={{height:'35px'}}/>
                    <SearchCell
                        name='请输入搜索内容'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                </span>
                <div className='clear' ></div>
                <PackTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.pagination}
                    modifySelectedRowKeysData={this.modifySelectedRowKeysData}
                    // fetch={this.fetch}
                />
            </div>
        )
    };
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
    /**实现生成功能 */
    handleGenerateButton = () => {
        // console.log('selectedRowKeysselectedRowKeys',this.state.selectedRowKeys);
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
        // axios({
        //     // url: `${this.server}/jc/purchaseReportRecord/getAllByPage`,
        //     url: `http://2p277534k9.iok.la:58718/jc/purchaseReportRecord/getAllByPage`,
        //     method: 'get',
        //     headers:{
        //         'Authorization': this.Authorization
        //     },
        //     params: params,
        //     // type: 'json',
        // }).then((data) => {
        //     console.log('data',data.data)
        //     const res = data.data.data;
        //     console.log('res',res);
        //     this.pagination.total=res.total;
        //     for(var i = 1; i<=res.list.length; i++){
        //         res.list[i-1]['index']=(res.prePage)*10+i;
        //     }
        //     this.setState({
        //         loading: false,
        //         dataSource: res.list,
        //     });
        // });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        const ope_name = this.state.searchContent;
        // axios({
        //     url:`${this.server}/jc/operation/getRolesByNameLikeByPage`,
        //     method:'get',
        //     headers:{
        //         'Authorization':this.Authorization
        //     },
        //     params:{
        //         size: this.pagination.pageSize,
        //         page: this.pagination.current,
        //         operationName:ope_name
        //     },
        //     type:'json',
        // }).then((data)=>{
        //     const res = data.data.data;
        //     this.pagination.total=res.total;
        //     for(var i = 1; i<=res.list.length; i++){
        //         res.list[i-1]['index']=(res.prePage)*10+i;
        //     }
        //     this.setState({
        //         dataSource: res.list,
        //     });
        // }).catch((error)=>{
        //     message.info(error.data.message)
        // })

    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
    /**实现选择是否只展现未生成的数据功能 */
    urgentChange = (checked) => {
        console.log(`switch to ${checked}`);
        // this.setState({
        //     checkSwitchData:checked
        // })
    }
    /**---------------------- */
    /**实现selectedRowKeys里的数据改变功能 */
    modifySelectedRowKeysData = (recordId) => {
        this.setState({
            selectedRowKeys:[...this.state.selectedRowKeys,recordId]
        });
    };
    /**---------------------- */
}

export default Pack;