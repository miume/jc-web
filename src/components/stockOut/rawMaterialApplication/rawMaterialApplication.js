import React from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
import './rawAdd.css';
import ApplyStockOut from './applyStockOut';
// const Option = Select.Option;
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22' 
//     })
// }
class RawMaterialApplication extends React.Component{
    Authorization
    server
    // componentDidMount(){
    //     const data = this.props.dataSource;
    //     this.pagination.total=res.total;
    //     var out = []
    //     for(var i = 1; i<=res.list.length; i++){
    //         var li = res.list[i-1];
    //         out.push({
    //             id:li.repoOutApply.id,
    //             index:res.prePage*10+i,
    //             materialName:li.repoBaseSerialNumber.materialName,
    //             materialClass:li.repoBaseSerialNumber.materialClass,
    //             serialNumber:li.repoBaseSerialNumber.serialNumber,
    //             quantity:li.repoOutApply.quantity,
    //             weight:li.repoOutApply.weight
    //         })
    //     }
    //         console.log(this.props.dataSource)
    // }
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            searchContent:'',
            selectedRowKeys:[]
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'15%'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'15%'
        },{
            title:'物料类型',
            dataIndex:'materialClass',
            key:'materialClass',
            align:'center',
            width:'15%',
            render:(text,record)=>{
                switch(text){
                    case 1: return '原材料';
                    case 2: return '中间件';
                    case 3: return '成品';
                    default:return '';
                }
            }
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            align:'center',
        },{
            title:'数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'15%'
        },{
            title:'重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'15%'
        }]
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
              return `共${total}条记录`
            } ,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
          }
    }   
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
          size: pagination.pageSize,
          page: pagination.current,
          orderField: 'id',
          orderType: 'desc',
        });
      }
    
    //   fetch = (params = {}) => {
    //     axios({
    //       url: `${this.server}/jc/common/repoOutApply/getAllByNameLikeAndTypeByPage`,
    //       method: 'get',
    //       headers:{
    //       'Authorization': this.Authorization
    //     },
    //      params: {
    //          ...params,
    //          type:this.props.type,
    //      },
    //     }).then((data) => {
    //       const res = data.data.data;
    //       this.pagination.total=res.total;
    //       var out = []
    //       for(var i = 1; i<=res.list.length; i++){
    //           var li = res.list[i-1];
    //           out.push({
    //               id:li.repoOutApply.id,
    //               index:res.prePage*10+i,
    //               materialName:li.repoBaseSerialNumber.materialName,
    //               materialClass:li.repoBaseSerialNumber.materialClass,
    //               serialNumber:li.repoBaseSerialNumber.serialNumber,
    //               quantity:li.repoOutApply.quantity,
    //               weight:li.repoOutApply.weight
    //           })
    //       }
    //       this.setState({
    //         dataSource: out,
    //       });
    //     });
    //   }
    /**监控搜索框的输入变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }
    /**根据货物名称进行搜索 */
    searchEvent(){
        this.props.fetch({
            materialName:this.state.searchContent
        });
    }
    /**监控checkbox选中的情况 */
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    render(){
        const rowSelection = {
            onChange:this.onSelectChange,
            onselect(){},
            onSelectAll(){}
        }
        return (
            <div style={{padding:'0 15px'}}>
                <ApplyStockOut selectedRowKeys={this.state.selectedRowKeys} data={this.state.dataSource}/>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称' searchEvent={this.searchEvent} fetch={this.fetch} searchContentChange={this.searchContentChange}></SearchCell>
                </span>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination} onChange={this.handleTableChange} scroll={{ y: 398 }} bordered size='small'></Table>
            </div>
        );
    }
}
export default RawMaterialApplication;