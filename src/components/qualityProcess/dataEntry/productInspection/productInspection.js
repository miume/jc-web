import React from 'react';
import BlockQuote from '../../../BlockQuote/blockquote';
import SearchCell from "../../../BlockQuote/search";
import ProductTable from "./productInspectionTable";
import axios from "axios";
import home from "../../../commom/fns";
import {Spin} from "antd";
class ProductInspection extends React.Component {
    url;
    status;
    operation;
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
            sortField: 'sample_delivering_date',
            sortType: 'desc'
        });
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            searchContent : '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true,
                pageSizeOptions: ["10","20","50","100"]
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
            loading: true
        };
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.status = JSON.parse(localStorage.getItem('status')) ;
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        const current = JSON.parse(localStorage.getItem('dataEntry')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell
                        name='请输入送检工厂名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                    />
                    <div className='clear' ></div>
                    <ProductTable
                        menuList={menuList}
                        fetch={this.fetch}
                        url = {this.url}
                        data={this.state.dataSource}
                        status={this.status}
                        pagination={this.state.pagination}
                        modifyDataSource={this.modifyDataSource}
                        handleTableChange={this.handleTableChange}
                        judgeOperation = {home.judgeOperation}
                        operation = {this.operation}
                    />
                </Spin>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**实现修改state功能 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    /**---------------------- */
    /**获取所有数据功能 */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                factory:this.state.searchContent,
                sortField: 'sample_delivering_date',
                sortType: 'desc'
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                sortField: 'sample_delivering_date',
                sortType: 'desc'
            })
        }

    };
    fetch = (params,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios.get(`${this.url.productInspection.pages}`,{
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            const res = data.data.data?data.data.data:[];
            const {pagination} = this.state;
            pagination.total = res.total;
            if(res&&res.list)
            {
                for(var i = 1; i <= res.list.length;i++){
                    var e = res.list[i-1];
                    e['index'] = res.prePage*10+i
                }
                this.setState({
                    dataSource:res.list,
                    pagination:pagination,
                    loading: false
                })
            }else{
                this.setState({
                    dataSource:[],
                    loading: false
                })
            }

        })
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        });
        this.fetch({
            factory:this.state.searchContent,
            sortField: 'sample_delivering_date',
            sortType: 'desc'
        });

    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
}

export default ProductInspection;
