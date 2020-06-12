import React,{Component} from 'react'
import {Table,Button,Select,Spin,message} from 'antd'
import Search from './search'
import Blockquote from '../../../BlockQuote/blockquote'
import axios from 'axios'
class PositiveCostOperation extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:undefined
        }
        this.columns=[{
            title:'周期名称',
            key:'periodName',
            dataIndex:'periodName',
            width:'6%'
        },{
            title:'期数',
            key:'periods',
            dataIndex:'periods',
            width:'4%'
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime',
            width:'6%'
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
            width:'6%'
        }]
        this.selectChange=this.selectChange.bind(this);
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
        this.confirm=this.confirm.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.returnFireCost=this.returnFireCost.bind(this);
        this.add=this.add.bind(this);
    }
    componentDidMount(){
        this.getPeriod()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getPeriod(){
        axios({
            url:this.url.positiveStatic.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    staticPeriod:res,
                    periodCode:res[0].code
                })
                this.getTimeByPeriod(res[0].code)
            }
        })
        
    }
    getTimeByPeriod(value){
        axios({
            url:this.url.anodeCostAccount.getDate,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                periodId:value
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    lineNameData:res
                })
            }
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
        })
        if(name==='periodCode'){
            this.getTimeByPeriod(value)
        }
    }
    timeChange(value){
        value=value.split('/')[0]
        this.setState({
            periods:value
        })
    }
    confirm(){
        this.setState({
            loading:true
        })
        let {periodCode,periods}=this.state

        axios({
            url:this.url.anodeCostAccount.confirm,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                // lineCode:lineCode,
                periodId:periodCode,
                periods:periods
            }
        }).then(data=>{
            let res=data.data.data;
            if(res){
                if(res[0]===1){
                    message.error('不存在本期的产线统计数据，基础数据不全!');
                }
               else if(res[0]===2){
                    message.error('不存在上期的产线统计数据，基础数据不全!');
                }
                else{
                    for(let i=0;i<res.length;i++){
                        res[i]['index']=i+1
                    }
                    this.setState({
                        data:res
                    })
                }
            }
            else{
                message.error('操作失败，请联系管理员!');
            }
            this.setState({
                loading:false
            })
        }).catch(()=>{
            this.setState({
                loading:false,
                data: []
            })
            message.error('操作失败，请联系管理员!')
        })
    }
    add(){

    }
       //返回火法成本
    returnFireCost(){
        this.props.history.push({pathname:'/positiveProductAccount'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {lineNameData,data,periods,periodCode,staticPeriod}=this.state
        return(
            <div >
                <Blockquote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.returnFireCost} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Button onClick={this.add} style={{float:'right'}} type='ant-btn ant-btn-primary' >新增</Button>
                    <Search  staticPeriod={staticPeriod} periodCode={periodCode} selectChange={this.selectChange}
                            lineNameData={lineNameData} periods={periods} timeChange={this.timeChange} flag={true}
                            confirm={this.confirm}
                     />
                    
                    <div className='clear'></div> 
                    <Table
                        dataSource={data}
                        rowKey={record=>record.index}
                        columns={this.columns} 
                        pagination={false}
                        size='small'
                        bordered/>
                </Spin>
            </div>
        );
    }
}
export default PositiveCostOperation