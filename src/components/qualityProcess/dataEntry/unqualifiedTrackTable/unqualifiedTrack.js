import React from 'react';
import SearchCell from "../../../BlockQuote/search";
import BlockQuote from "../../../BlockQuote/blockquote";
import UnqualifiedTrackTable from './unqualifiedTrackTable';
import axios from "axios";
import home from "../../../commom/fns"
import {Spin} from "antd";
class UnqualifiedTrack extends React.Component{
    url;
    operation;
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
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
            searchContent:'',
            searchText: '',
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
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        const current = JSON.parse(localStorage.getItem('dataEntry')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell
                        name='请输入处理人名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                    />
                    <div className='clear' ></div>
                    <UnqualifiedTrackTable
                        url={this.url}
                        menuList={menuList}
                        data={this.state.dataSource}
                        pagination={this.state.pagination}
                        fetch={this.fetch}
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
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        })
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                personName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };
    fetch = (params,flag) => {
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
        axios({
            url: `${this.url.unqualifiedTrack.pages}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list){
                const {pagination} = this.state;
                pagination.total = res.total;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
            }
            this.setState({
                dataSource: res && res.list? res.list: [],
                pagination: pagination,
                loading: false
            });
        });
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        })
        this.fetch({
            personName:this.state.searchContent
        })
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default UnqualifiedTrack;
