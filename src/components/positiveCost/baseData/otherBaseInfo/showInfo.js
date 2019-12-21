import React,{Component} from 'react'
import {Button,Input,Popconfirm,message,Spin} from 'antd'
import '../statisticalPeriod/add.css'
import SaveButton from '../../../BlockQuote/saveButton'
import axios from 'axios'
class ShowInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,//用来判断是否为编辑界面
            bagWeight: undefined,
            bowlFillWeight: undefined,
            bowlNum: undefined,
            burningLossRate: undefined,
            smashWeight: undefined,
            presinteringWeight: undefined,
            secondSinteringWeight: undefined,
            highMixingMachineWeight: undefined,
            matchingCoefficientPrecursors: undefined,
            matchingCoefficientLithiumCarbonate: undefined,
            matchingCoefficientHopPocket: undefined,
            addFlag:true ,//用来判断调新增还是编辑接口
            code:undefined,
            loading:false
        }
        this.inputChange=this.inputChange.bind(this);
        this.getCurrent=this.getCurrent.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.edit=this.edit.bind(this);
        this.handleSave=this.handleSave.bind(this)
    }
    componentDidMount(){
        this.getCurrent()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getCurrent(){
        this.setState({
            loading:true
        })
        axios({
            url:this.url.positiveOther.getCurrent,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){//返回的数据不为空，会返回一个code，调用编辑接口
                this.setState({
                    code:res.code,
                    addFlag:false,
                    bagWeight: res.bagWeight,
                    bowlFillWeight: res.bowlFillWeight,
                    bowlNum: res.bowlNum,
                    burningLossRate: res.burningLossRate,
                    smashWeight: res.smashWeight,
                    presinteringWeight: res.presinteringWeight,
                    secondSinteringWeight: res.secondSinteringWeight,
                    highMixingMachineWeight: res.highMixingMachineWeight,
                    matchingCoefficientPrecursors: res.matchingCoefficientPrecursors,
                    matchingCoefficientLithiumCarbonate: res.matchingCoefficientLithiumCarbonate,
                    matchingCoefficientHopPocket: res.matchingCoefficientHopPocket
                })
            }
            else{//如果返回的数据为null，此时要新增一条数据，调用新增接口
                this.setState({
                    addFlag:true
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    handleSave(){
        let {code,addFlag,bagWeight,bowlFillWeight,bowlNum,burningLossRate,smashWeight,
            presinteringWeight,secondSinteringWeight,highMixingMachineWeight,
            matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,matchingCoefficientHopPocket}=this.state,
            data={
                bagWeight: bagWeight,bowlFillWeight: bowlFillWeight,bowlNum: bowlNum,burningLossRate: burningLossRate,
                smashWeight: smashWeight,presinteringWeight: presinteringWeight,secondSinteringWeight: secondSinteringWeight,
                highMixingMachineWeight: highMixingMachineWeight,matchingCoefficientPrecursors: matchingCoefficientPrecursors,
                matchingCoefficientLithiumCarbonate: matchingCoefficientLithiumCarbonate,matchingCoefficientHopPocket: matchingCoefficientHopPocket
            }
            for(let key in data){
                if(data[key]===undefined){
                    console.log(key,data[key])
                    message.error('信息填写不完整!')
                    return
                }
            }
            data['code']=addFlag?'':code
        this.setState({
            flag:false
        })
        axios({
            url:this.state.addFlag?this.url.positiveOther.add:this.url.positiveOther.update,
            method:this.state.addFlag?'post':'put',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getCurrent()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        }).catch(()=>{

        })
    }
    inputChange(e){
        let value=e.target.value,
            name=e.target.name
        this.setState({
            [name]:value
        })
    }
    handleCancel(){
        this.getCurrent()
        this.setState({
            flag:false
        })
    }
    edit(){
        this.setState({
            flag:true
        })
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,flag,bagWeight,bowlFillWeight,bowlNum,burningLossRate,smashWeight,
            presinteringWeight,secondSinteringWeight,highMixingMachineWeight,
            matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,matchingCoefficientHopPocket}=this.state
        return(
            <Spin spinning={loading} wrapperClassName={'rightDiv-Content'}>
                <div className='fontAttribute'>
                    <div className='fontAttribute'>
                        <span>成品每包重量 :</span>
                        <Input placeholder='请输入' name='bagWeight' value={bagWeight} suffix="kg" style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >粉碎正压输每罐重量 :</span>
                        <Input placeholder='请输入' name='smashWeight' value={smashWeight} suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >装钵重量 :</span>
                        <Input placeholder='请输入' name='bowlFillWeight' value={bowlFillWeight} suffix="kg" style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >预烧正压输送每罐重量 :</span>
                        <Input placeholder='请输入' name='presinteringWeight' value={presinteringWeight}  suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >每排钵数 :</span>
                        <Input placeholder='请输入' name='bowlNum' value={bowlNum}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >二烧正压输送每罐重量 :</span>
                        <Input placeholder='请输入' name='secondSinteringWeight' value={secondSinteringWeight} suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >烧损系数 :</span>
                        <Input placeholder='请输入' name='burningLossRate' value={burningLossRate}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >高混机每批进料量 :</span>
                        <Input placeholder='请输入' name='highMixingMachineWeight' value={highMixingMachineWeight} suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontInfo'>预混配比系数</div>
                    <div className='fontAttribute'>
                        <span >前驱体 :</span>
                        <Input placeholder='请输入' name='matchingCoefficientPrecursors' value={matchingCoefficientPrecursors} suffix="kg" style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >碳酸锂 :</span>
                        <Input placeholder='请输入' name='matchingCoefficientLithiumCarbonate' value={matchingCoefficientLithiumCarbonate} suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >布袋料 :</span>
                        <Input placeholder='请输入' name='matchingCoefficientHopPocket' value={matchingCoefficientHopPocket} suffix="kg" style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                </div>
                {flag?<div style={{textAlign:'center',marginTop:'50px'}}>
                        <SaveButton handleSave={this.handleSave}/>&nbsp;&nbsp;&nbsp;
                        <Popconfirm okText='确定' cancelText='再想想' title='你确定取消这个任务吗？' onConfirm={this.handleCancel}>
                            <Button className='white-button'>
                                <i className="fa fa-times" style={{fontWeight:'bolder'}}></i>&nbsp;
                                取消
                            </Button>
                        </Popconfirm>
                    </div>
                    :<div style={{textAlign:'center',marginTop:'50px'}}>
                        <Button type='primary' onClick={this.edit}>修改</Button>
                    </div>
                }
            </Spin>
        );
    }
}
export default ShowInfo