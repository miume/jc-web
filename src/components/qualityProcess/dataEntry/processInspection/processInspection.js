import React from 'react';
import axios from 'axios';
import BlockQuote from '../../../BlockQuote/blockquote'
import {Table, Popconfirm, Divider, message, Spin,Select} from 'antd';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import Add from './add';
import './editor.css';
import SearchCell from '../../../BlockQuote/search';
import home from '../../../commom/fns'

const { Option } = Select;
class ProcessInspection extends React.Component{
    url
    status
    componentDidMount(){
        this.fetch();
        this.getAllProductionProcess();
    }
    componentWillUnmount(){
        this.setState = ()=>{
          return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            selectedRowKeys : [],     //存取所选中checkbox的ids
            searchContent:'',
            allProductionProcess:[],
            detailData:[],
            loading: true,
            deliveryFactoryId: '' // 送检工厂 ID
        }
        this.fetch = this.fetch.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            } ,
            showSizeChanger:true,
            pageSizeOptions: ["10","20","50","100"]
          };
        this.columns = [{
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '5%',
          align:'left',
        }, {
          title: '批号',
          dataIndex: 'commonBatchNumber.batchNumber' ,
          key: 'commonBatchNumber.batchNumber',
          width: '15%',
          align:'left',
        }, {
            title: '产品线',
            dataIndex: 'produceLine' ,
            key: 'produceLine',
            width: '13%',
            align:'left',
            render:(produceLine)=>{
                var arr = produceLine?produceLine.split(","):[];
                if (arr.length > 1) {
                    return <span title={produceLine} className='text-decoration'>{arr[0] + "..."}</span>;
                } else {
                    return <span>{produceLine}</span>;
                }
            }
        }, {
          title: '创建人',
          dataIndex: 'createPersonName',
          key:  'createPersonName',
          width: '10%',
          align:'left',
        }, {
          title: '创建时间',
          dataIndex: 'commonBatchNumber.createTime',
          key: 'commonBatchNumber.createTime',
          width: '15%',
          align:'left',
         },{
          title:'紧急',
          dataIndex:'commonBatchNumber.isUrgent',
          key:'commonBatchNumber.isUrgent',
          align:'left',
          width:'10%',
          render:isUrgent=>!isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
      },{
          title: '状态',
          dataIndex: 'commonBatchNumber.status',
          key:'commonBatchNumber.status',
          render: state => {
               return this.status[state.toString()];
          },
          width: '10%',
          align:'left',
        }, {
          title: '操作',
          dataIndex: 'commonBatchNumber.id',
          key:'commonBatchNumber.id',
          align:'left',
          render: (text,record) => {

              const status = record.commonBatchNumber.status;
              const deleteFlag = home.judgeOperation(this.operation,'DELETE');
              const editorFlag = home.judgeOperation(this.operation,'UPDATE')
              return (
                  <span>
                      <Add value={text} status={status} url={this.url} fetch={this.fetch} flag={1} />
                      <span className={editorFlag?'':'hide'}>
                        <Divider type="vertical" />
                        <Add value={text} status={status} url={this.url} fetch={this.fetch} flag={2}/>
                      </span>
                      <span className={deleteFlag?'':'hide'}>
                        <Divider type="vertical" />
                        {
                            status === -1?
                            <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(text)} okText="确定" cancelText="取消" >
                                <span className='blue'>删除</span>
                            </Popconfirm>:<span className='notClick'>删除</span>
                        }
                      </span>
                  </span>
                  );
          }
        }];
    }
    /**table变化时 */
    handleTableChange(pagination){
        this.pagination = pagination;
        this.fetch({
            size:pagination.pageSize,
            page:pagination.current,
            personName:this.state.searchContent
        })
    }
    /**分页查询 getAllByPage */
    fetch(params,flag){
        if(flag)
            this.setState({
                searchContent:''
            })
        axios.get(`${this.url.procedure.getAllByPage}`,{
            headers:{
               'Authorization':this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list)
            {
              for(var i = 1; i <= res.list.length;i++){
                  var e = res.list[i-1];
                  e['index'] = res.prePage*10+i
            }
            this.pagination.total = res?res.total:0;
            this.setState({
                dataSource:res.list,
                loading: false
            })
            }
        })
    }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
      const ids = this.state.selectedRowKeys;
        axios({
          url:`${this.url.procedure.procedureTestRecord}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
          params:{
            batchNumberIds:ids.toString()
          }
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.fetch({
                  size: this.pagination.pageSize,
                  page: this.pagination.current,
                  orderField: 'id',
                  orderType: 'desc',
              });
            }
        }).catch(()=>{
          message.info('删除错误，请联系管理员！')
        })
     }
    /**取消批量删除 */
    cancle() {
        this.setState({
            selectedRowKeys:[]
        })
    }
   /**实现全选 */
   onSelectChange(selectedRowKeys) {
      this.setState({ selectedRowKeys:selectedRowKeys });
   }
    /**处理单条记录删除 */
    handleDelete(key){
      axios({
          url:`${this.url.procedure.procedureTestRecord}/${key}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          }
      }).then((data)=>{
          message.info(data.data.message);
          if(data.data.code===0){
            this.fetch({
              size: this.pagination.pageSize,
              page: this.pagination.current,
              orderField: 'id',
              orderType: 'desc',
          });
        }
      }).catch(()=>{
          message.info('删除失败，请联系管理员！');
      })
    }
    /**返回数据录入页面 */
    returnDataEntry(){
      this.props.history.push({pathname:'/dataEntry'});
  }
  /**实时跟踪搜索框内容的变化 */
  searchContentChange(e){
      const value = e.target.value;
      this.setState({
          searchContent:value
      })
  }
  /**绑定搜索事件 */
  searchEvent(){
      this.fetch({
          size:this.pagination.pageSize,
          page:this.pagination.current,
          personName:this.state.searchContent,
          newId: this.state.deliveryFactoryId
      });
  }
  /**获取所有产品线 productionProcess*/
  getAllProductionProcess(){
    axios({
      url:`${this.url.deliveryFactory.deliveryFactory}`,
      method:'get',
      headers:{
        'Authorization':this.url.Authorization
      }
    }).then(data=>{
      const res = data.data.data;
      this.setState({
        allProductionProcess : res
    })
  })
  }

  factoryOnChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            deliveryFactoryId: parseInt(value)
        })
    }

    searchClear = (params,flag) => {
        params["newId"] = this.state.deliveryFactoryId?parseInt(this.state.deliveryFactoryId):'';
        console.log(params)
      this.fetch(params,flag)
    }


    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        const current = JSON.parse(localStorage.getItem('dataEntry')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations
        this.status = JSON.parse(localStorage.getItem('status'));
        const {selectedRowKeys} = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange:this.onSelectChange,
          getCheckboxProps:record=>({
            disabled:record.commonBatchNumber.status!==-1&&record.commonBatchNumber.status!==3
          })
        };
        const addFlag = home.judgeOperation(this.operation,'SAVE')
        return (
            <div>
                <BlockQuote  name={current.menuName} menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Add url={this.url} fetch={this.fetch} allProductionProcess={this.state.allProductionProcess} addFlag={addFlag} />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}
                    flag={home.judgeOperation(this.operation,'DELETE')}
                    />

                    <div style={{float:"right"}}>
                        <Select
                            showSearch
                            style={{ width: 200,marginRight: "10px" }}
                            placeholder="选择产品线"
                            optionFilterProp="children"
                            onChange={this.factoryOnChange}
                            allowClear={true}
                            filterOption={(input, option) =>
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {
                                this.state.allProductionProcess.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <SearchCell name='请输入搜索人' searchContentChange={this.searchContentChange} searchEvent={this.searchEvent}
                                    fetch={this.searchClear} flag={home.judgeOperation(this.operation,'QUERY')}/>
                    </div>
                  <Table rowKey={record => record.commonBatchNumber.id} rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource}  pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered/>
                </Spin>
            </div>

        );
    }
}
export default ProcessInspection;
