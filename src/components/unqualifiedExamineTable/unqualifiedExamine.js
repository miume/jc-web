import React from 'react';
import SearchCell from "../BlockQuote/search";
import UnqualifiedTable from "./unqualifiedTable";
import BlockQuote from "../BlockQuote/blockquote";
import axios from "axios";


const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        'purchaseReportRecord.id':i,
        'commonBatchNumberDTO.commonBatchNumber.batchNumber': '测试',
        'materialName': '测试',
        'sampleDeliveringRecordDTO.repoBaseSerialNumber.manufacturerName': '启东北新',
        'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate': '2019年1月10号',
        'commonBatchNumberDTO.createPersonName': '李小红',
        'commonBatchNumberDTO.commonBatchNumber.createTime': '2018年11月27日',
        'commonBatchNumberDTO.commonBatchNumber.status': 2,
        'commonBatchNumberDTO.commonBatchNumber.isUrgent': 0,
    });
}

class UnqualifiedExamine extends React.Component{
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
        const current = JSON.parse(localStorage.getItem('current')) ;
        const status = JSON.parse(localStorage.getItem('status')) ;
        this.url = JSON.parse(localStorage.getItem('url'));
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        return(
            <div>
                <BlockQuote name="不合格审评表" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <SearchCell
                        name='请输入搜索内容'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        // fetch={this.fetch}
                    />
                    <div className='clear' ></div>
                    <UnqualifiedTable
                        status={status}
                        url={this.url}
                        menuList={menuList}
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
            url: `${this.props.url.purchaseCheckReport.audit}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
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
        const batchNumber = this.state.searchContent;
        axios({
            url: `${this.props.url.purchaseCheckReport.batchNumber}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                batchNumber: batchNumber
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
        });
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default UnqualifiedExamine;