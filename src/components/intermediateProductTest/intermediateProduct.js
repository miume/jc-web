import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import InterTable from '../intermediateProductTest/intermediateTable';
// import AddButton from '../intermediateProductTest/addButton';
// import DeleteButton from '../intermediateProductTest/deleteButton';
import SearchCell from '../BlockQuote/search';

import '../Home/page.css';
import axios from "axios";

const data =[];
for(let i=0; i<20; i++){
    if(i%2===0){
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '2018年10月11日',
            deliverer: '测试',
            deliveryFactory: '测试',
            batchNumber: '测试',
            testItems: '测试',
            urgentComment: '测试',
            type: '测试',
            h: '未发布',
            status: '不通过'
        });
        continue;
    };
    if(i%3===0){
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '2018年10月11日',
            deliverer: '测试',
            deliveryFactory: '测试',
            batchNumber: '测试',
            testItems: '测试',
            urgentComment: '测试',
            type: '测试',
            h: '测试',
            status: '未申请'
        });
        continue;
    };
    data.push({
        index:i,
        id: i,
        sampleDeliveringDate: '2018年10月11日',
        deliverer: '测试',
        deliveryFactory: '测试',
        batchNumber: '测试',
        testItems: '测试',
        urgentComment: '测试',
        type: '测试',
        h: '未发布',
        status: '已通过'
    })
}

class InterProduct extends React.Component {
    Authorization;
    server;
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return ;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
        };
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        };
    }
    render() {
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return(
            <div>
                <BlockQuote name="中间品检测"  menu="质量与流程" menu2="数据录入"></BlockQuote>
                <div style={{padding:'15px'}}>
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入搜索内容'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                    <div className='clear' ></div>
                    <InterTable
                        data={this.state.dataSource}
                        // rowSelection={rowSelection}
                        pagination={this.pagination}
                        fetch={this.fetch}
                        modifyDataSource={this.modifyDataSource}
                        handleTableChange={this.handleTableChange}
                    />
                </div>
            </div>
        )
    }
    /**实现修改state功能 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    /**---------------------- */
    /**获取所有数据功能 */
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
        //     url: `${this.server}/jc/sampleDeliveringRecord`,
        //     method: 'get',
        //     headers:{
        //         'Authorization': this.Authorization
        //     },
        //     params: params,
        //     // type: 'json',
        // }).then((data) => {
        //     const res = data.data.data;
        //     this.pagination.total=res.total;
        //     for(var i = 1; i<=res.list.length; i++){
        //         res.list[i-1]['index']=(res.prePage)*10+i;
        //     }
        //     this.setState({
        //         loading: false,
        //         dataSource: res.list,
        //     });
        // }).catch((error)=>{
        //     message.info(error.data.message)
        // });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        const interName = this.state.searchContent;
        // axios({
        //     url:`${this.server}/jc/operation/getRolesByNameLikeByPage`,
        //     method:'get',
        //     headers:{
        //         'Authorization':this.Authorization
        //     },
        //     params:{
        //         size: this.pagination.pageSize,
        //         page: this.pagination.current,
        //         interName:interName
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
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default InterProduct;