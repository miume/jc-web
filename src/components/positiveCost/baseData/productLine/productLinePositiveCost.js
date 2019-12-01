import React,{Component} from 'react'
import {Spin,Table,Divider,Popconfirm,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import NewButton from '../../../BlockQuote/newButton'
import ProductLineAdd from './add'
import axios from 'axios'
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
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            render:(text,record)=>{
                return(
                    <span>
                        <ProductLineAdd record={record} code={record.code} editflag={true} getTableData={this.getTableData} url={this.url}/>
                        <Divider type='vertical'></Divider>
                        <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                        <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.getTableData=this.getTableData.bind(this);
    }
    componentDidMount(){
        this.getTableData()
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
            //console.log(error)
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
        const current=JSON.parse(localStorage.getItem('current'));
        this.url=JSON.parse(localStorage.getItem('url'))
        return(
            <div>
                <Blockquote menu={current.menuParent} name='生产线' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <ProductLineAdd url={this.url} getTableData={this.getTableData}/>
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>

                
            </div>
        );
    }
}
export default ProductLinePositiveCost;