/**
 * 车间统计分析
 */
import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import {Spin,Table,message} from 'antd'
import Search from '../../costAccout/positiveCostAccount/search'
import axios from 'axios'
class WorkShopAnaly extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            dataSource:[]
        }
        this.columns=[{
            title:'核算对象',
            dataIndex:'object',
            key:'object',
            width:'8%',
        },{
            title:'周期名称',
            dataIndex:'name',
            key:'name',
            width:'8%',
        },{
            title:'期数',
            dataIndex:'periods',
            key:'periods',
            width:'5%',
        },{
            title:'开始时间',
            dataIndex:'startTime',
            key:'startTime',
            width:'8%',
            align:'center'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime',
            width:'8%',
            align:'center'
        },{
            title:'期初在制品',
            dataIndex:'goodsInProcessFirst',
            key:'goodsInProcessFirst',
            width:'10%',
        },{
            title:'期末在制品',
            dataIndex:'goodsInProcessEnd',
            key:'goodsInProcessEnd',
            width:'10%',
        },{
            title:'本期投入材料预计产出的产成品',
            dataIndex:'product',
            key:'product',
            width:'10%'
        },{
            title:'本期入库产成品',
            dataIndex:'enterProduct',
            key:'enterProduct',
            width:'10%',
        },{
            title:'物料投入产出平衡统计',
            dataIndex:'analy',
            key:'analy',
            width:'10%',
        },{
            title:'物料投入产出率',
            dataIndex:'inputOutout',
            key:'endTime',
            width:'10%',
        }]
        this.returnInputOutputPositive=this.returnInputOutputPositive.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.confirm=this.confirm.bind(this)
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
    /**查询*/
    confirm(){
        let {periodCode,periods}=this.state
        this.setState({
            loading:true
        })
        axios({
            url:this.url.anodeCostAccount.confirm,
            headers:{
                Authorization:this.url.Authorization
            },
            method:'get',
            params:{
                lineCode:1,
                periodId:periodCode,
                periods:periods
            }
        }).then(data=>{
            let res=data.data.data
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
                        dataSource:res,
                        loading:false
                    })
                }
            }
            else{
                this.setState({
                    loading:false,
                    dataSource: []
                })
                message.error('操作失败，请联系管理员!');
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    returnInputOutputPositive(){
        this.props.history.push({pathname:'/inputOutputPositiveCost'})
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {dataSource,lineNameData,data,periods,periodCode,staticPeriod}=this.state
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name={this.current.menuName} menu2='返回' returnDataEntry={this.returnInputOutputPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search  staticPeriod={staticPeriod} periodCode={periodCode} selectChange={this.selectChange}
                            lineNameData={lineNameData} periods={periods} timeChange={this.timeChange} flag={true}
                            confirm={this.confirm}
                     />
                     <div className='clear'></div>
                    <Table
                    rowKey={record=>record.index}
                    dataSource={dataSource}
                    size='small'
                    columns={this.columns}
                    pagination={false}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default WorkShopAnaly