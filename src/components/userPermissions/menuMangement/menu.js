import React from 'react';
import '../../Home/page.css';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import BlockQuote from '../../BlockQuote/blockquote';
import MenuTable from './menuTable';
import AddModal from './addModal';
import axios from "axios";
import {message, Spin} from "antd";
import SearchCell from '../../BlockQuote/search';

/**这是个令牌，每次调用接口都将其放在header里 */

class Menu extends React.Component{
    server;
    url;
    operation;
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
  constructor(props){
        super(props);
        this.state = {
          dataSource: [],
          selectedRowKeys: [],
          loading: true,
          searchContent:'',
          searchText: '',
          treeData:[]
      };
      this.reset = this.reset.bind(this);
      this.getTableData = this.getTableData.bind(this);
      this.handleTableChange=this.handleTableChange.bind(this);
      this.deleteByIds=this.deleteByIds.bind(this);
      this.cancel=this.cancel.bind(this);
      this.fetch=this.fetch.bind(this);
      this.modifyDataSource=this.modifyDataSource.bind(this);
      this.searchContentChange = this.searchContentChange.bind(this);
      this.searchEvent = this.searchEvent.bind(this);
      this.judgeOperation = this.judgeOperation.bind(this);
      this.getAllMenus = this.getAllMenus.bind(this);
      this.treeDataProcessing = this.treeDataProcessing.bind(this);

      this.pagination = {
          showTotal(total){
              return `共${total}条记录`
          },
          showSizeChanger: true,
          pageSizeOptions: ["10","20","50","100"]
    }
  }

    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }

  render(){
      this.url = JSON.parse(localStorage.getItem('url'));
      this.server = localStorage.getItem('remote');
      const current = JSON.parse(localStorage.getItem('current')) ;
      this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
      const { loading, selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    return (
      <div>
          <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
          <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
            <AddModal
                url={this.url}
                fetch={this.fetch}
                treeData={this.state.treeData}
                flag={this.judgeOperation(this.operation,'SAVE')}
            />
            <DeleteByIds
                selectedRowKeys={this.state.selectedRowKeys}
                deleteByIds={this.deleteByIds}
                loading={loading}
                cancel={this.cancel}
                flag={this.judgeOperation(this.operation,'DELETE')}
            />
                <SearchCell name='请输入菜单名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.reset} flag={this.judgeOperation(this.operation,'QUERY')}/>
        <div className='clear' ></div>
        <MenuTable
            data={this.state.dataSource}
            pagination={this.pagination}
            rowSelection={rowSelection}
            fetch={this.fetch}
            modifyDataSource={this.modifyDataSource}
            handleTableChange={this.handleTableChange}
            judgeOperation = {this.judgeOperation}
            operation = {this.operation}
        />
          </Spin>
      </div>
    )
  }

  componentDidMount() {
      this.fetch();
      this.getAllMenus();
  }

    /**修改父组件的数据 */
    modifySelectedRowKeys = (data) => {
      this.setState({selectedRowKeys:data});
    };

    modifyDataSource = (data) => {
      this.setState({dataSource:data});
    };

    /**获取所有数据 getAllByPage */
    handleTableChange(pagination)  {
        this.pagination = pagination;
        this.fetch();
  };

    /**获取表格数据*/
    fetch(params = {}) {
        this.setState({ loading: true });
        let {searchContent} = this.state, {pageSize,current} = this.pagination;
        params = {
            menuName: params['menuName'] === '' ? '' : searchContent,
            pageSize: pageSize ? pageSize : 10,
            pageNumber: current ? current : 1
        };
        this.getTableData(params);
   };

    getTableData(params) {
        axios({
            url: `${this.url.menu.findAllByPage}`,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            let dataSource = [];
            if(res&&res.list) {
                this.pagination.total=res.total;
                for(let i = 1; i<=res.list.length; i++) {
                    res.list[i-1]['index'] = (res['prePage']) * res['pageSize'] + i;
                }
                dataSource = res.list;
                this.setState({
                    loading: false,
                    dataSource: dataSource,
                    selectedRowKeys: [],
                });
            }
        })
    }

    /**查询所有菜单*/
    getAllMenus() {
      axios({
          url:`${this.url.menu.getAll}`,
          method:'get',
          headers:{
              'Authorization': this.url.Authorization
          },
      }).then((data)=>{
          let res = data.data.data, treeData = this.treeDataProcessing(res);
          this.setState({
              treeData: treeData
          })
      })
    }

    /**处理所有菜单数据*/
    treeDataProcessing(res,result = []) {
        for(let i = 0; i < res.length; i++) {
            let temp = {
                title: res[i]['menuName'],
                key: res[i]['menuId'],
                value: res[i]['menuName']+'-'+res[i]['menuId'],
                children: []
            }, children = res[i]['menuList'];

            children = children && children.length ? this.treeDataProcessing(children,[]) : [];
            temp.children = children;
            result.push(temp)
        }
        return result;
    }

    /**批量删除*/
    deleteByIds() {
      let ids = this.state.selectedRowKeys;
      axios({
          url:`${this.url.menu.deleteByIds}`,
          method:'delete',
          headers:{
              'Authorization':this.url.Authorization
          },
          data:ids,
          type:'json'
      }).then((data)=>{
          message.info(data.data.message);
          this.handleTableChange(this.pagination);
      }).catch((error)=>{
          message.info(error.data.message)
      });
  };

    /**监控表格数据选择*/
    onSelectChange(selectedRowKeys) {
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

    /**搜索事件*/
    searchEvent(){
        this.fetch();
     };

    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
      const value = e.target.value;
      this.setState({searchContent:value});
    }

    /**重置操作*/
    reset() {
        this.setState({
            searchContent: ''
        });
        this.fetch({
            menuName: ''
        })
    }
}
export default Menu;
