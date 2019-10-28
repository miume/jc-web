import React,{Component} from 'react';
import {Spin,Table,message,Modal,Divider,Popconfirm} from 'antd';
import BlockQuote from '../../BlockQuote/blockquote';
import NewButton from '../../BlockQuote/newButton';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import SearchCell from '../../BlockQuote/search';
import CancleButton from '../../BlockQuote/cancleButton';
import Add from './add';
const data=[{
    id:1,
    key:1,
    index:1,
    materialName:'NiSO4',
    materialType:'原材料',
    metal:['Ni','Mn']  //数组转字符串
}]
class MaterialBasic extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            selectedRowKeys:[],
            dataSource:data
        }
        this.onSelectChange=this.onSelectChange.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
            width:'10%',
            align:'center'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%',
            align:'center'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType',
            width:'20%',
            align:'center'
        },{
            title:'所含金属',
            dataIndex:'metal',
            key:'metal',
            width:'23%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                       <Add editflag={true} record={record}/>
                        {this.judgeOperation(this.operation,'UPDATE')?<Divider type='vertical'></Divider>:''}
                        <Popconfirm title='确定删除?' okText='确定' cancelText='再想想'>
                             <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        },]
    }
    onSelectChange(selectedRowKeys){//复选框变化调用的函数
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    //判断当前用户拥有该菜单哪些权限
    judgeOperation(operation,operationCode){
       var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
       return flag.length>0?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const {selectedRowKeys}=this.state;
        const rowSelection={//复选框，并在表格设置此属性值
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                 <Add wrappedComponentRef={(form)=>this.formRef=form}/>
                 <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} flag={this.judgeOperation(this.operation,'DELETE')}/>
                 <SearchCell name='请输入物料名称' flag={this.judgeOperation(this.operation,'QUERY')}></SearchCell>
                 <Table 
                 rowKey={record=>record.id}
                 rowSelection={rowSelection}
                 columns={this.columns}
                 dataSource={this.state.dataSource}
                 size='small'
                 bordered />
                </Spin>
            </div>
        );
    }
}
export default MaterialBasic;