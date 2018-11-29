import React from 'react';
import '../Home/page.css';
import DeleteByIds from './deleteByIds';
import BlockQuote from '../BlockQuote/blockquote';
import MenuTable from './menuTable';
import AddModal from './addModal';
import axios from "axios";
import {message} from "antd";
import SearchCell from '../BlockQuote/search';

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');

class Menu extends React.Component{
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
      };
      this.handleTableChange=this.handleTableChange.bind(this);
      this.start=this.start.bind(this);
      this.cancel=this.cancel.bind(this);
      this.fetch=this.fetch.bind(this);
      this.modifyDataSource=this.modifyDataSource.bind(this);
      this.searchContentChange = this.searchContentChange.bind(this);
      this.searchEvent = this.searchEvent.bind(this);
      this.getAllFatherMenu = this.getAllFatherMenu.bind(this);

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
      const { loading, selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    return (
      <div>
        <BlockQuote name="菜单管理" menu='用户与权限'></BlockQuote>
        <div style={{padding:'15px'}}>
            <AddModal
                fetch={this.fetch}
                fatherMenu = {this.state.fatherMenu}
            />
            <DeleteByIds
                selectedRowKeys={this.state.selectedRowKeys}
                start={this.start}
                loading={loading}
                cancel={this.cancel}
            />
            <span style={{float:'right',paddingBottom:'8px'}}>
                <SearchCell name='请输入菜单名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}/>
            </span>
        <div className='clear' ></div>
        <MenuTable
            data={this.state.dataSource}
            pagination={this.pagination}
            rowSelection={rowSelection}
            fetch={this.fetch}
            modifyDataSource={this.modifyDataSource}
            handleTableChange={this.handleTableChange}
            fatherMenu = {this.state.fatherMenu}
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
  };
    fetch = (params = {}) => {
      this.getAllFatherMenu();
      this.setState({ loading: true });
      axios({
          url: 'http://192.168.1.105:8081/jc/menu/findAllByPage',
          method: 'get',
          headers:{
              'Authorization': Authorization
          },
          params: params,
          // type: 'json',
      }).then((data) => {
          const res = data.data.data;
          this.pagination.total=res.total;
          for(var i = 1; i<=res.list.length; i++){
              res.list[i-1]['index']=(res.prePage)*10+i;
          }
          this.setState({
              loading: false,
              dataSource: res.list,
          });
      })
  };
    componentDidMount() {
      this.fetch();
     
  }
  /**获取所有父菜单 */
  getAllFatherMenu(){
    axios({
      url:'http://192.168.1.105:8081/jc/menu/findByMenuType',
      method:'get',
      headers:{
        'Authorization': Authorization
        },
        params: {menuType:1},
    }).then((data)=>{
      const res = data.data.data;
      this.setState({
        fatherMenu:res
      })
    })
  }
    start = () => {
      const ids = this.state.selectedRowKeys;
      axios({
          url:'http://192.168.1.105:8081/jc/menu/deleteByIds',
          method:'post',
          headers:{
              'Authorization':Authorization
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
          url:'http://192.168.1.105:8081/jc/menu/findByNameLikeByPage',
          method:'get',
          headers:{
              'Authorization':Authorization
          },
          params:{
              size: this.pagination.pageSize,
              page: this.pagination.current,
              menuName:ope_name
          },
          type:'json',
      }).then((data)=>{
          const res = data.data.data;
          this.pagination.total=res.total;
          for(var i = 1; i<=res.list.length; i++){
              res.list[i-1]['index']=(res.prePage)*10+i;
          }
          this.setState({
              dataSource: res.list,
          });
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