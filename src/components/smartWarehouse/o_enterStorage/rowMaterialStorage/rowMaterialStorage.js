//入库管理的原材料入库
import React,{Component} from 'react';
import {Table, Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';

class RowMaterialStorage extends Component{
    url;
    operation;
    componentWillUnmount(){
        this.setState=()=>{
          return;
        }
    }

    constructor(props){
         super(props);
         this.state={
             searchContent:'',
             dataSource:[],
             pagination:[],
             pageChangeFlag:0,
             loading: false
         };
         this.columns = [{
             title:'序号',
             dataIndex:'index',
             key:'index',
             sorter:(a,b)=>a.id-b.id,
             width:'10%'
         }, {
             title:'物料编码',
             dataIndex:'materialCode',
             key:'materialCode',
             width:'50%'
         }, {
             title:'入库时间',
             dataIndex:'createdTime',
             key:'createdTime',
             width:'15%',
             render: (text) => {
                 return text.slice(0,10);
             }
         }, {
             title:'入库人',
             dataIndex:'createdPerson',
             key:'createdPerson',
             width:'15%'
         }];
        this.pagination={
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        };

        this.fetch = this.fetch.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
    }

    handleTableChange(pagination) {//当点击第二页，第三页的时候，调用
        this.pagination = pagination;
        this.props.getTableData({
            size:pagination.pageSize,//每页几条数据
            current:pagination.current,//当前页是几
        });
    };

    fetch() {
        this.setState({
            searchContent: ''
        });
        this.props.getTableData({
            size:this.pagination.pageSize,//每页几条数据
        });
    }

    searchContentChange(e) {
        const value=e.target.value;//此处显示的是我搜索框填的内容
        this.setState({searchContent:value});
    }

    /**根据物料名称修改*/
    searchEvent() {
        const materialName = this.state.searchContent;
        this.props.getTableData({
            materialCode: materialName
        });
    }

    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render() {
        this.pagination.total = this.props.dataSource && this.props.dataSource.total ? this.props.dataSource.total : 0;
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        //获取该菜单所有权限
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        return(
            <Spin spinning={this.props.loading} wrapperClassName='rightDiv-content'>
                <SearchCell name='请输入物料编码'
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.searchEvent}
                    fetch={this.fetch}
                    type={this.props.type}
                    flag={this.judgeOperation(this.operation,'QUERY')}
                />
                <div className='clear'></div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns}
                dataSource={this.props.dataSource}
                pagination={this.pagination}
                onChange={this.handleTableChange}
                bordered
                size='small'
                />
            </Spin>
        );
    }
}
export default  RowMaterialStorage;
