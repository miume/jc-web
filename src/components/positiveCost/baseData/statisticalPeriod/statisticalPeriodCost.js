import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import StatisticalPeriodAdd from './add'
import axios from 'axios'

class StatisticalPeriodCost extends Component{
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
            title:'周期名称',
            dataIndex:'name',
            key:'name',
            width:'18%',
        },{
            title:'默认时长(天)',
            dataIndex:'length',
            key:'length',
            width:'18%',
            align:'center'
        },{
            title:'开始时刻',
            dataIndex:'startTime',
            key:'startTime',
            width:'18%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                        <StatisticalPeriodAdd editflag={true} record={record} code={record.code} getTableData={this.getTableData} url={this.url} data={this.state.dataSource}/>
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
            url:this.url.positiveStatic.all,
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
                    dataSource:res
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url. positiveStatic.delete}`,
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
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <Blockquote menu={current.menuParent} name='统计周期' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <StatisticalPeriodAdd getTableData={this.getTableData} url={this.url} data={this.state.dataSource} editflag={false}/>
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    size='small'
                    columns={this.columns}
                    pagination={false}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default StatisticalPeriodCost;