import React,{Component} from 'react'
import BlockQuote from '../../../BlockQuote/blockquote'
import NewButton from '../../../BlockQuote/newButton'
import {Spin,Table,Divider,Popconfirm} from 'antd'
import Add from './add'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ModelPositiveCost extends Component{//产品型号
    constructor(props){
        super(props)
        this.state={
            loading:true,
            data:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'15%'
        },{
            title:'产线型号',
            dataIndex:'name',
            key:'name',
            width:'35%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'35%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <Add editFlag={true} updateFlag={updateFlag} url={this.url} record={record} getTableData={this.getTableData}/>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.getTableData=this.getTableData.bind(this);
    }
    componentDidMount(){
        this.getTableData()
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getTableData(){
        this.setState({
            loading:true
        })
        axios({
            url:this.url.positiveModel.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=i+1
                }
                this.setState({
                    data:res,
                    loading:false
                })
            }
        })
    }
    handleDelete(id){
        axios({
            url:this.url.positiveModel.delete,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                id:id
            }
        }).then(data=>{
            if(data.data.code===0){
                this.getTableData()
            }
        })
    }
     //返回正极成本的基础数据部分
     returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('postiveBase'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <BlockQuote menu={this.current.menuParent} name='产品型号' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} />
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Add addFlag={this.state.addFlag} url={this.url} getTableData={this.getTableData}/>
                    <Table 
                    dataSource={this.state.data}
                    rowKey={record=>record.index}
                    pagination={false}
                    columns={this.columns}
                    size='small' bordered/>
                </Spin>
            </div>
        )
    }
}
export default ModelPositiveCost