import React,{Component} from 'react'
import {Spin, Table, Divider, Popconfirm, message, Switch} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import NewButton from '../../../BlockQuote/newButton'
import ProductLineAdd from './add'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ProductLinePositiveCost extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            dataSource:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%',
        },{
            title:'产线名称',
            dataIndex:'name',
            key:'name',
            width:'18%',
        },{
            title:'是否启用',
            dataIndex:'flag',
            key:'flag',
            width:'18%',
            render:(text,record)=>{
                return (
                    <Switch checked={record.flag} onChange={()=>this.switchChange(record)}/>
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <ProductLineAdd record={record} updateFlag={updateFlag} code={record.code} editflag={true} getTableData={this.getTableData} url={this.url}/>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.switchChange=this.switchChange.bind(this);
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
            url:this.url.positiveProductline.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=i+1;
                }
                this.setState({
                    dataSource:res,
                    loading:false
                })

            }
            this.setState({
                loading:false
            })
        }).catch(error=>{
        })
    }
    switchChange(record){
        let data={
            code:record.code,
            flag:!record.flag
        }
        axios({
            url:this.url.positiveProductline.update,
            method:'put',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.info(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.positiveProductline.delete}`,
            method:"delete",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:id}
        }).then((data)=>{
            message.info(data.data.message);
            this.getTableData();
        }).catch((error)=>{
            message.info(error.data)
        });
    };
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('postiveBase'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name='生产线' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <ProductLineAdd url={this.url} addFlag={this.state.addFlag}  getTableData={this.getTableData}/>
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    pagination={false}
                    size='small'
                    bordered/>
                </Spin>

                
            </div>
        );
    }
}
export default ProductLinePositiveCost;