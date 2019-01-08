import React from 'react';
import CheckTable from './checkTable';
import SearchCell from '../BlockQuote/search';
import axios from "axios";



class Check extends React.Component {
    componentDidMount() {
        this.fetch();
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchContent:'',
            searchText: '',
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
    };
    render() {
        return(
            <div>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell
                        name='请输入原材料名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                </span>
                <div className='clear' ></div>
                <CheckTable
                    menuList={this.props.menuList}
                    url={this.props.url}
                    status={this.props.status}
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    fetch={this.fetch}
                />
            </div>
        )
    }
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
        axios({
            url: `${this.props.url.purchaseCheckReport.purchasePages}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                this.setState({
                    dataSource: res.list,
                });
            }else{
                this.setState({
                    dataSource: [],
                });
            }
        });
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.fetch({
            materialName:this.state.searchContent,
        });
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default Check;
