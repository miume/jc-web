import React from 'react';
import SearchCell from "../BlockQuote/search";
import BlockQuote from "../BlockQuote/blockquote";
import UnqualifiedTrackTable from './unqualifiedTrackTable';
import axios from "axios";
const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        id:i,
        a: '镍咕锰',
        b: '发生工序',
        c: '2018年12月27日',
        d: '周小伟',
    });
}

class UnqualifiedTrack extends React.Component{
    url;
    componentDidMount() {
        // this.fetch();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: data,
            searchContent:'',
            searchText: '',
        };
        this.returnDataEntry = this.returnDataEntry.bind(this);
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
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        return(
            <div>
                <BlockQuote name="不合格跟踪表" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <SearchCell
                        name='请输入处理人名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                    <div className='clear' ></div>
                    <UnqualifiedTrackTable
                        data={this.state.dataSource}
                        pagination={this.pagination}
                        // fetch={this.fetch}
                    />
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
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
            url: `${this.url.unqualifiedTrack.pages}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                // const dataSource = this.dataAssemble(res);
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                this.setState({
                    dataSource: res.list,
                });
            }
        });
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.fetch({
            personName:this.state.searchContent,
        });
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default UnqualifiedTrack;