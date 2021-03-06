import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import ProcessAdd from './add'
import axios from "axios";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ProcessPositiveCost extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataSource:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%',
            align:'center'
        },{
            title:'工序名称',
            dataIndex:'processName',
            key:'cycleName',
            width:'18%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            align:'center',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <ProcessAdd editflag={true} updateFlag={updateFlag} record={record}  code={record.code} getTableData={this.getTableData} url={this.url}/>
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
            url:this.url. positiveProcess.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=(i+1);
                }

                this.setState({
                    dataSource:res
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    handleDelete = (id)=>{
        axios({
            url:`${this.url. positiveProcess.delete}`,
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
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name='工序' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <ProcessAdd  addFlag={this.state.addFlag} getTableData={this.getTableData} url={this.url}/>
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    size='small'
                    columns={this.columns}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default ProcessPositiveCost;