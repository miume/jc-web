import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Search from './processSearch'
import axios from 'axios'
class ProcessStatis extends Component{//工序统计
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:this.props.periodCode?this.props.periodCode:-1,
            date:'',
            time:this.props.startSecondTime?this.props.startSecondTime:'',//startSecondTime是时分秒，需要拼接选择的日期
            data:[]
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
        this.dateChange=this.dateChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.onBlur=this.onBlur.bind(this)
        this.onChange=this.onChange.bind(this);
        this.onFocus=this.onFocus.bind(this);
        this.onSearch=this.onSearch.bind(this);
    }

    getTableData(){
        let {time,date}=this.state
        let startTime=`${date} ${time}`
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisProcess}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                // ...params,
                periodId:this.state.periodCode,
                startTime:startTime
            }
        }).then((data)=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list['index']=(res.page-1)*10+(i+1)
                }
                this.setState({
                    data:res.list
                })
            }
        })
    }
    selectChange(value,name){
        let time=name.props.name
        this.setState({
            periodCode:value,
            time:time
        })
    }

    onChange(value) {
        console.log(`selected ${value}`);
      }
      
    onBlur() {
        console.log('blur');
      }
      
    onFocus() {
        console.log('focus');
      }
      
    onSearch(val) {
        console.log('search:', val);
      }
      
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightContent-Div'>
                    <Search flag={true}  staticPeriod={this.props.staticPeriod} periodCode={this.state.periodCode} search={this.getTableData} selectChange={this.selectChange} onChange={this.onChange} onBlur={this.onBlur} onSearch={this.onSearch} onFocus={this.onFocus}/>
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