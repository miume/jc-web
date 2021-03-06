import React,{Component} from 'react'
import {Button,Input,Popconfirm,message,Spin} from 'antd'
import SaveButton from '../../../BlockQuote/saveButton'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ShowInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,//用来判断是否为编辑界面
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
        let {openKeys,menuId} = this.props.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
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
            this.setState({
                loading:false
            })
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
            if(batchNum<=0||hcValue<=0||xdValue<=0||hgValue<=0||bzValue<=0){
                message.error('值必须大于0!')
                return
            }
            for(let key in data){
                if(data[key]===undefined){
                    message.error('信息填写不完整!')
                    return
                }
            }
            data['code']=addFlag?'':code
        this.setState({
            flag:false
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
            name=e.target.name;
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        // if(value[value.length-1] !== '.')
        //     value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        if(value !== '' && value < 1){
            message.error('值必须大于1!')
            return
        }
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
        let {flag,batchNum,hcValue,xdValue,hgValue,bzValue,loading,updateFlag}=this.state
        return(
            <Spin spinning={loading} wrapperClassName={'rightDiv-Content'}>
                <div className='fontAttribute'>
                    <div className='fontAttribute'>
                        <span>配液单槽批数 :</span>
                        <Input placeholder='请输入' name='batchNum' value={batchNum}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >合成体积计算基数 :</span>
                        <Input placeholder='请输入' name='hcValue' value={hcValue}  style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >陈化洗涤计算基数 :</span>
                        <Input placeholder='请输入' name='xdValue' value={xdValue}  style={{width:'250px',marginRight:'80px'}} onChange={this.inputChange} disabled={!flag}/>
                        <span >烘干计算基数 :</span>
                        <Input placeholder='请输入' name='hgValue' value={hgValue}   style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
                    </div>
                    <div className='fontAttribute'>
                        <span >包装计算基数 :</span>
                        <Input placeholder='请输入' name='bzValue' value={bzValue} style={{width:'250px'}} onChange={this.inputChange} disabled={!flag}/>
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
                            <span className={updateFlag?'':'hide'}><Button type='primary' onClick={this.edit}>修改</Button></span>
                        </div>
                    }
            </Spin>
        );
    }
}
export default ShowInfo
