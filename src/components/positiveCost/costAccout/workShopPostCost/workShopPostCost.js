import React,{Component} from 'react'
import {Spin,Table,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import Search from '../positiveCostAccount/search'
import axios from 'axios'

class WorkShopPostCost extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataSource:[],
            type: 1,  //标记前驱体碳酸锂
            pageType: 1, //标记成本核算界面
            allProductionType: []
        }
        this.columns=[{
            title:'核算对象',
            key:'costObject',
            dataIndex:'costObject',
            width:'6%'
        },{
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
        },{
            title:'当前消耗材料(kg)',
            key:'rawMaterialFeedStock',
            dataIndex:'rawMaterialFeedStock',
            width:'11%',
            render:(text)=>{
                let da=text?text.split(' '):undefined
                return(
                    da?da.map((item,index)=>{
                        return(
                            <span style={{display:'block'}} key={index}>{item}</span>
                        )
                    }):null
                )
            }
        },{
            title:'上期期末在制品(T)',
            key:'rawMaterialBalance',
            dataIndex:'rawMaterialBalance',
            width:'11%',
            render:(text)=>{
                let da=text?text.split(' '):undefined
                return(
                    da?da.map((item,index)=>{
                        return(
                            <span style={{display:'block'}} key={index}>{item}</span>
                        )
                    }):null
                )
            }
        },{
            title:'本期期末在制品(T)',
            key:'lastGoodsInProcessFirst',
            dataIndex:'lastGoodsInProcessFirst',
            width:'6%'
        },{
            title:'本期入库产品(T)',
            key:'currentGoodsInProcessFirst',
            dataIndex:'currentGoodsInProcessFirst',
            width:'6%'
        },{
            title:'当期消耗其他物料(T)',
            key:'lastGoodsInProcessSecond',
            dataIndex:'lastGoodsInProcessSecond',
            width:'6%'
        },{
            title:'材料单耗(kg)',
            key:'currentGoodsInProcessSecond',
            dataIndex:'currentGoodsInProcessSecond',
            width:'6%'
        }]
        this.returnFireCost=this.returnFireCost.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.confirm=this.confirm.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.getAllProductionType = this.getAllProductionType.bind(this);
    }
    componentDidMount(){
        this.getPeriod()
        //pageType表示界面类型  1表示车间成本核算 2表示产线成本核算 3代表产品成本核算
        let {pageType} = this.props; 
        if(pageType) {
            this.setState({pageType})
        }
        if (pageType === 3) {
            this.getAllProductionType()
        }
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
    
    //获取所有产品型号
    getAllProductionType() {
        axios({
            url:this.url.positiveModel.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    allProductionType:res,
                })
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

    onRadioChange(e) {
        this.setState({
            type: e.target.value
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
        //periodCode表示班次，periods表示开始时间，type表示前驱体或碳酸锂，productionType表示产品型号
        let {periodCode,periods,type,productionType}=this.state
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
                periods:periods,
                type
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
    //返回火法成本
    returnFireCost() {
        this.props.history.push({pathname:'/positiveProductAccount'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {lineNameData,periods,periodCode,staticPeriod,type,pageType,allProductionType,productionType}=this.state
        return(
            <div>
                <Blockquote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.returnFireCost} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search  staticPeriod={staticPeriod} periodCode={periodCode} selectChange={this.selectChange}
                            lineNameData={lineNameData} periods={periods} timeChange={this.timeChange} flag={true}
                            confirm={this.confirm} type={type} onRadioChange={this.onRadioChange} pageType={pageType}
                            allProductionType={allProductionType} productionType={productionType}
                     />
                     <div className='clear'></div> 
                    <Table
                        rowKey={record=>record.index}
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
export default WorkShopPostCost;