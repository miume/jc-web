import React from 'react';
import '../Home/page.css';
import DeleteByIds from '../BlockQuote/deleteByIds';
import BlockQuote from '../BlockQuote/blockquote';
import MenuTable from './menuTable';
import AddModal from './addModal';
import axios from "axios";
import {message} from "antd";
import SearchCell from '../BlockQuote/search';

/**这是个令牌，每次调用接口都将其放在header里 */

class Menu extends React.Component{
    server
    url
    operation
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
  constructor(props){
        super(props);
        this.state = {
          dataSource: [],
          pagination:[],
          selectedRowKeys: [],
          loading: false,
          searchContent:'',
          searchText: '',
          fatherMenu:[],
          searchContent1:'',
      };
      this.handleTableChange=this.handleTableChange.bind(this);
      this.start=this.start.bind(this);
      this.cancel=this.cancel.bind(this);
      this.fetch=this.fetch.bind(this);
      this.modifyDataSource=this.modifyDataSource.bind(this);
      this.searchContentChange = this.searchContentChange.bind(this);
      this.searchEvent = this.searchEvent.bind(this);
      this.getAllFatherMenu = this.getAllFatherMenu.bind(this);
    //   this.Authorization = localStorage.getItem('Authorization');
      this.searchContentChange1 = this.searchContentChange1.bind(this)
      this.searchFatherEvent = this.searchFatherEvent.bind(this);
      this.judgeOperation = this.judgeOperation.bind(this);
    //   this.changePage = this.changePage.bind(this);

      this.pagination = {
        total: this.state.dataSource.length,
        showTotal(total){
            return `共${total}条记录`
        },
    }
  }

    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }

  /**获取查询时菜单名称的实时变化 */
  searchContentChange1(e){
    const value = e.target.value;
    this.setState({searchContent1:value});
}
    searchFatherEvent(){
        const ope_name = this.state.searchContent1;
        axios({
            url:`${this.url.menu.findByParentNameLikeByPage}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                parentMenuName:ope_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    dataSource: res.list,
                });
            }
        }).catch((error)=>{
                message.info(error.data.message)
            })
    };
  render(){
        this.url = JSON.parse(localStorage.getItem('url'));
       this.server = localStorage.getItem('remote');
       const current = JSON.parse(localStorage.getItem('current')) ;
       this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operationList:null;
      const { loading, selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    return (
      <div>
        <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
        <div style={{padding:'15px'}}>
            <AddModal
                fetch={this.fetch}
                fatherMenu = {this.state.fatherMenu}
                flag={this.judgeOperation(this.operation,'SAVE')}
            />
            <DeleteByIds
                selectedRowKeys={this.state.selectedRowKeys}
                deleteByIds={this.start}
                loading={loading}
                cancel={this.cancel}
                flag={this.judgeOperation(this.operation,'DELETE')}
            />
            {/* <span style={{float:'right',paddingBottom:'8px'}}> */}
                <SearchCell name='请输入菜单名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch} flag={this.judgeOperation(this.operation,'QUERY')}/>
            {/* </span> */}
        <div className='clear' ></div>
        <MenuTable
            data={this.state.dataSource}
            pagination={this.pagination}
            rowSelection={rowSelection}
            fetch={this.fetch}
            modifyDataSource={this.modifyDataSource}
            handleTableChange={this.handleTableChange}
            fatherMenu = {this.state.fatherMenu}
            searchContentChange1 = {this.searchContentChange1}
            searchFatherEvent = {this.searchFatherEvent}
        />
        </div>
      </div>
    )
  }

    /**修改父组件的数据 */
    modifySelectedRowKeys = (data) => {
      this.setState({selectedRowKeys:data});
  };
    modifyDataSource = (data) => {
      this.setState({dataSource:data});
  };
  /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
      this.fetch({
          size: pagination.pageSize,
          page: pagination.current,
          orderField: 'id',
          orderType: 'desc',
      });
    //   console.log(pagination)
  };
  
    fetch = (params = {}) => {
      this.getAllFatherMenu();
      this.setState({ loading: true });
      axios({
          url: `${this.url.menu.findAllByPage}`,
          method: 'get',
          headers:{
              'Authorization': this.url.Authorization
          },
          params: params,
          // type: 'json',
      }).then((data) => {
          const res = data.data.data;
          if(res&&res.list){
            this.pagination.total=res.total;
            this.pagination.current=res.pageNum;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                loading: false,
                dataSource: res.list,
                searchContent:'',
                selectedRowKeys: [],
            });
          }
      })
  };
    componentDidMount() {
      this.fetch();
  }
  /**获取所有父菜单 */
  getAllFatherMenu(){
    axios({
      url:`${this.url.menu.findByMenuType}`,
      method:'get',
      headers:{
        'Authorization': this.url.Authorization
        },
        params: {menuType:1},
    }).then((data)=>{
      const res = data.data.data;
      if(res){
        this.setState({
            fatherMenu:res
          })
      }
    })
  }
    start = () => {
      const ids = this.state.selectedRowKeys;
      axios({
          url:`${this.url.menu.deleteByIds}`,
          method:'post',
          headers:{
              'Authorization':this.url.Authorization
          },
          data:ids,
          type:'json'
      }).then((data)=>{
          message.info(data.data.message);
          this.fetch();
      }).catch((error)=>{
          message.info(error.data.message)
      });
  };
    onSelectChange = (selectedRowKeys) => {
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
    searchEvent(){
      const ope_name = this.state.searchContent;
      axios({
          url:`${this.url.menu.findByNameLikeByPage}`,
          method:'get',
          headers:{
              'Authorization':this.url.Authorization
          },
          params:{
              size: this.pagination.pageSize,
            //   page: this.pagination.current,
              menuName:ope_name
          },
          type:'json',
      }).then((data)=>{
          const res = data.data.data;
          if(res&&res.list){
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
          }
      }).catch((error)=>{
              message.info(error.data.message)
          })
  };
    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
      const value = e.target.value;
      this.setState({searchContent:value});
  }
}
export default Menu;