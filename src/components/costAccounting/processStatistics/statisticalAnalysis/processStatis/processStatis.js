import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Search from './processSearch'
import axios from 'axios'
class ProcessStatis extends Component{//工序统计
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodId:'',
            date:'',
            time:'',
            data:[],
            startTime:''
        }
        
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'周期类型',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'期数',
            dataIndex:'period',
            key:'period'
        },{
            title:'开始时间',
            dataIndex:'beginTime',
            key:'beginTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'过程工序',
            dataIndex:'process',
            key:'process'
        },{
            title:'小计值',
            dataIndex:'subtotal',
            key:'subtotal'
        },{
            title:'Ni金属量(T)',
            dataIndex:'Nimetal',
            key:'Nimetal'
        },{
            title:'Co金属量(T)',
            dataIndex:'Cometal',
            key:'Cometal'
        },{
            title:'Mn金属量(T)',
            dataIndex:'Mnmetal',
            key:'Mnmetal'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation'
        }];
        this.selectChange=this.selectChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
    }

    getTableData(){
       let {periodId,startTime}=this.state
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisProcess}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                // ...params,
                periodId:this.state.periodId,
                startTime:startTime
            }
        }).then((data)=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list['index']=(res.page-1)*res.size+(i+1)
                }
                this.setState({
                    data:res.list
                })
            }
        })
    }
 
    selectChange(value){
        this.setState({
            periodId:value,
        })
        this.props.getStartTime(value)
    }

    timeChange(value) {
        console.log(`selected ${value}`);//显示的是最终内容
        this.setState({
            startTime:value
        })
      }
      
    onSearch(val) {
        //console.log('search:', val); //显示的是搜索框输入的内容
      }

    render(){
       let time=this.props.time?this.props.time:null
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search flag={true}  staticPeriod={this.props.staticPeriod} time={this.state.time?this.state.time:time} periodCode={this.props.periodCode?this.props.periodCode:''} confirm={this.getTableData} selectChange={this.selectChange} timeChange={this.timeChange}  onSearch={this.onSearch}/>
                    <div className='clear'></div>
                    <Table
                    dataSource={this.state.data}
                    rowKey={record=>record.id}
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default ProcessStatis;