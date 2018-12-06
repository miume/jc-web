import React from 'react';
import '../Home/page.css';
import CheckTable from './checkTable';
import SearchCell from '../BlockQuote/search';

const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        id:i,
        a: '测试',
        b: '测试',
        c: '启东北新',
        d: '2019年1月10号',
        e: '李小红',
        f: '2018年11月27日',
        g: '李小红',
        h: '2018年11月27日',
        i: '进货检验',
        j: '不通过',
        k: '正常',
    });
}


class Check extends React.Component {
    Authorization;
    server;
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            loading: false,
            searchContent:'',
            searchText: '',
        };
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
        }
    };
    render() {
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return(
            <div>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell
                        name='请输入搜索内容'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                </span>
                <div className='clear' ></div>
                <CheckTable
                    data={this.state.dataSource}
                    pagination={this.pagination}
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
        // const ope_name = this.state.searchContent;
        // axios({
        //     url:`${this.server}/jc/auth/operation/getRolesByNameLikeByPage`,
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
}

export default Check;