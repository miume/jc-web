import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import axios from "axios";
import {Table,Divider} from "antd";
// import WhiteSpace from '../BlockQuote/whiteSpace';
import '../Home/page.css';
import SearchCell from '../BlockQuote/search'
// import AddModal from './addModal'
import Delete from './delete'
import DeleteByIds from '../BlockQuote/deleteByIds';


class SampleInspection extends React.Component{
    server
    componentDidMount() {
        this.fetch();
      }
    componentWillUnmount() {
    this.setState = () => {
        return ;
    }
    }
     columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'commonBatchNumber.id',
        sorter: (a, b) => a.commonBatchNumber.id - b.commonBatchNumber.id,
        align:'center',
        width: '8%',
    },{
        title: '送检时间',
        dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringDate',
        align:'center',
        width: '13%',
    },{
        title: '送检人',
        dataIndex: 'deliverer.name',
        key: 'deliverer',
        align:'center',
        width: '7%',
    },{
        title: '送检工厂',
        dataIndex: 'deliveryFactory.name',
        key: 'name',
        align:'center',
        width: '7%',
    },{
        title: '批号',
        dataIndex: 'serialNumberName',
        key: 'batchNumber',
        align:'center',
        width: '11%',
    },{
        title: '异常备注',
        dataIndex: 'sampleDeliveringRecord.exceptionComment',
        key: 'memo',
        align:'center',
        width: '9%',
        render(text,record){
            if(record.sampleDeliveringRecord.exceptionComment === null){
                return "无"
            }else{
                return record.sampleDeliveringRecord.exceptionComment
            }
        }
    },{
        title: '类型',
        dataIndex: 'sampleDeliveringRecord.type',
        key: 'type',
        align:'center',
        width: '6%',
        render:status=>{
            switch(`${status}`){
                case '1':return "原材料";
                case "2":return "中间品";
                case "3":return "成品"
            }
        }
    },{
        title: '接受状态',
        dataIndex: 'sampleDeliveringRecord.acceptStatus',
        key: 'status',
        align:'center',
        width: '6%',
        render:status=>{
            switch(`${status}`){
                case '-1':return "保存"
                case '1':return "等待接受";
                case "2":return "接受";
                case "3":return "拒绝"
            }
        }
    },{
        title: '拒绝原因',
        dataIndex: 'sampleDeliveringRecord.handleComment',
        key: 'handleComment',
        align:'center',
        width: '7%',
        render(text,record){
            if(record.sampleDeliveringRecord.exceptionComment === null){
                return "无"
            }else{
                return record.sampleDeliveringRecord.exceptionComment
            }
        }
    },{
        title:'操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '18%',
        render(text,record){
            return(
                <div>
                    <span className='blue' href='#'>编辑</span>
                    <Divider type="vertical" />
                    <span className='blue' href='#'>删除</span>
                    <Divider type="vertical" />
                    <span className='blue' href='#'>接收</span>
                    <Divider type="vertical" />
                    <span className='blue' href='#'>拒绝</span>
                </div>
            )
        }
    }];
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            loading: false,
            pagination:[],
        };
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        }
    }
    render(){
        const { selectedRowKeys } = this.state;
        this.server = localStorage.getItem('remote');
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <BlockQuote name="样品送检"></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <AddModal fetch={this.fetch}/> */}
                    <DeleteByIds 
                        selectedRowKeys = {this.state.selectedRowKeys}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                    />
                    <span style={{float:'right',paddingBottom:'8px'}}>   
                        <SearchCell name='请输入搜索内容'  />
                    </span>
                    <div className='clear' ></div>
                    <Table columns={this.columns} dataSource={this.state.dataSource} rowSelection={rowSelection} size="small"
                    bordered
                    rowKey={record => record.sampleDeliveringRecord.id}
                    onChange={this.handleTableChange}
                    pagination={this.pagination}
                    scroll={{ x: 1500}}></Table>
                </div>
            </div>
        )
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current,
            sortField: 'id',
            sortType: 'desc',
        });
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.server}/jc/common/sampleDeliveringRecord/pages`,
            method: 'get',
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.pageNumber-1)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
        })
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
    deleteByIds(){
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
}

export default SampleInspection