import React,{Component} from 'react'
import {Button,Input,Popconfirm,message} from 'antd'
// import '../statisticalPeriod/add.css'
import SaveButton from '../../../BlockQuote/saveButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import axios from 'axios'
class ShowInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,//用来判断是否为编辑界面
            addFlag:true ,//用来判断调新增还是编辑接口
            code:undefined
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
        axios({
            url:`${this.url.batchConfig}/getCurrent`,
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
                    batchNum: res.batchNum,
                    hcValue: res.hcValue,
                    xdValue: res.xdValue,
                    hgValue: res.hgValue,
                    bzValue: res.bzValue,

                })
            }
            else{//如果返回的数据为null，此时要新增一条数据，调用新增接口
                this.setState({
                    addFlag:true
                })
            }
        })
    }
    handleSave(){
        let {code,addFlag,batchNum,hcValue,xdValue,hgValue,bzValue}=this.state,
            data={
                batchNum:batchNum,
                hcValue:hcValue,
                xdValue:xdValue,
                hgValue:hgValue,
                bzValue:bzValue,
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
            flag:true
        })
        axios({
            url:this.state.addFlag?`${this.url.batchConfig}/add`:`${this.url.batchConfig}/update`,
            method:this.state.addFlag?'post':'put',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('新增成功!')
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
    }
    edit(){
        this.setState({
            flag:false
        })
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'))
        let {flag,batchNum,hcValue,xdValue,hgValue,bzValue}=this.state
        return(
            <div style={{marginTop:'8%'}}>
                <div className='fontAttribute'>
                    <span>配液单槽批数 :</span>
                    <Input placeholder='请输入' name='batchNum' value={batchNum}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={flag}/>
                    <span >合成体积计算基数 :</span>
                    <Input placeholder='请输入' name='hcValue' value={hcValue}  style={{width:'250px'}} onChange={this.inputChange} disabled={flag}/>
                </div>      
                <div className='fontAttribute'>
                    <span >陈化洗涤计算基数 :</span>
                    <Input placeholder='请输入' name='xdValue' value={xdValue}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={flag}/>
                    <span >烘干计算基数 :</span>
                    <Input placeholder='请输入' name='hgValue' value={hgValue}   style={{width:'250px'}} onChange={this.inputChange} disabled={flag}/>
                </div>
                <div style={{marginLeft:'18.4%'}}>
                    <span style={{paddingRight:'10px',textAlign:'right'}}>包装计算基数 :</span>
                    <Input placeholder='请输入' name='bzValue' value={bzValue} style={{width:'250px'}} onChange={this.inputChange} disabled={flag}/>
                </div>
               {!flag?<div style={{textAlign:'center',marginTop:'50px'}}>
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
            </div>
        );
    }
}
export default ShowInfo