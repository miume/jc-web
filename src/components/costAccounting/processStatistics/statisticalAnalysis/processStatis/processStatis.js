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
            dataIndex:'periodName',
            key:'periodName'
        },{
            title:'期数',
            dataIndex:'head.lineName',
            key:'head.lineName'
        },{
            title:'开始时间',
            dataIndex:'head.startTime',
            key:'head.startTime'
        },{
            title:'结束时间',
            dataIndex:'head.endTime',
            key:'head.endTime'
        },{
            title:'过程工序',
            dataIndex:'processName',
            key:'processName'
        },{
            title:'小计值',
            dataIndex:'total',
            key:'total'
        },{
            title:'Ni金属量(T)',
            dataIndex:'totalNi',
            key:'totalNi'
        },{
            title:'Co金属量(T)',
            dataIndex:'totalCo',
            key:'totalCo'
        },{
            title:'Mn金属量(T)',
            dataIndex:'totalMn',
            key:'totalMn'
        }];
        this.selectChange=this.selectChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
    }

    getTableData(){
       let {startTime}=this.state
       let periodId=this.state.periodId?this.state.periodId:this.props.periodCode
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisProcess}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                // ...params,
                periodId:periodId,
                startTime:startTime
            }
        }).then((data)=>{
            let res=data.data.data
            if(res&&res.details){
                for(let i=0;i<res.details.length;i++){
                    res.details[i]['id']=(i+1)
                }
                this.setState({
                    data:res.details
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
                    <Search flag={true}  staticPeriod={this.props.staticPeriod} time={this.state.time?this.state.time:time} periodCode={this.state.periodId?this.state.periodId:this.props.periodCode} confirm={this.getTableData} selectChange={this.selectChange} timeChange={this.timeChange}  onSearch={this.onSearch}/>
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