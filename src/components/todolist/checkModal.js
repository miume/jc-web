import React from 'react';
import {Modal,message} from 'antd';
import RawTest from './rawTest';
import Procedure from './procedure';
import RedList from './redlist';
import AllTester from '../BlockQuote/allTester';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import CheckProductStandard from './checkProductStandard';
import CheckPurchase from './checkPurchase';
import CkeckProductInspection from './checkProductInspection';
import axios from 'axios';
class CheckModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            reply:''
        }
        this.fail = this.fail.bind(this);
        this.pass = this.pass.bind(this);
        this.judgeType = this.judgeType.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getReplyData = this.getReplyData.bind(this);
        this.setClassName = this.setClassName.bind(this);
    }
    /**根据dataType判断是那种类型产品送审 */
    judgeType(type){
        switch(type){
            case 1:  
            case 2:  
            case 3:  return <Procedure url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>; 
            case 4:  return <RawTest url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>; 
            case 6:  return <RedList url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>; 
            case 7:  return <CheckPurchase url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 8:  return <CkeckProductInspection url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 5:  
            case 9:  
            case 10: return <RawTest url={this.props.url} dataId={this.props.dataId} flag={this.props.flag} type={type}/>; 
            case 13: 
            case 14: return <CheckProductStandard url={this.props.url} batchNumberId={this.props.dataId} flag={type} />
            default: return '' ;
        }
    }
    setClassName(){
        this.setState({
            divclassName:'big-div-todo'
        })
    }
    /**点击审核 */
    handleCheck(){
        const {flag,dataId} = this.props;
        if(flag) this.getAllTester(dataId);
        this.setState({
            visible:true
        })
    }
    /**根据batchNumberId 查询审核记录 */
    getReplyData(e){
        // console.log(e.target.value)
        const value = e.target.value;
        this.setState({
            reply:value
        })
    }
    /**点击取消 弹出框消失 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    fail(){
        this.checkApply(0);
    }
    pass(){
        this.checkApply(1);
    }
    /**通过、不通过 */
    checkApply(status){
        const {reply} = this.state;
        if(reply===''){
            message.info('请输入审核意见！');
            return
        }
        // console.log(`status=${status},reply=${reply}`)
        const userId = JSON.parse(localStorage.getItem('menuList')).userId;
        axios.put(`${this.props.url.toDoList}/${this.props.dataId}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                userId:userId,
                reply:reply,
                isAccept:status
            }
        }).then((data)=>{
            this.props.fetch()
            this.props.getHistory()
            if(data.data.code===0){
                message.info(data.data.message);
            }else{
                message.info('操作失败，请联系管理员！')
            }
        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
        this.handleCancel();
    }
    /**通过batchNumberId 查询审核人 */
    getAllTester(dataId){
        axios({
          url:`${this.props.url.toDoList}/${dataId}/result`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
        //   console.log(res)
          if(res){
            this.setState({
                examineData : res
            })
          }
      })   
      }
    render(){
        const type = this.props.dataType.toString();
        const dataType = JSON.parse(localStorage.getItem('dataType'));
        return (
            <span>
                {/* {
                    this.props.flag?<Button onClick={this.handleCheck} type='ant-btn ant-btn-primary'><i className='' aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>:
                    <NewButton name='审核' className='fa fa-check' handleClick={this.handleCheck} ></NewButton>
                } */}
                <NewButton name={this.props.flag?'详情':'审核'} className={this.props.flag?'fa fa-floppy-o':'fa fa-check'} handleClick={this.handleCheck} ></NewButton>
                <Modal visible={this.state.visible} title={this.props.flag?`${dataType[type]}`+'详情':`${dataType[type]}`+'审核'} centered={true}
                closable={false} maskClosable={false} className={this.props.dataType===2||this.props.dataType===7?'modal-xlg':'modal-md'}
                footer={[
                    <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                    <span key='check' className={this.props.flag?'hide':''} >
                        <NewButton key='fail' className='fa fa-times' name='不通过' handleClick={this.fail} />
                        <NewButton key='pass' className='fa fa-check' name='通过' handleClick={this.pass} />
                    </span>
                    
                ]}
                >
                    <div>
                    {
                        this.judgeType(this.props.dataType)
                    }
                    <div>
                    {
                        this.props.flag?
                        <AllTester examineData={this.state.examineData} dataId={this.props.dataId} hide={this.props.dataType===2||this.props.dataType===7?0:1} />:
                        <textarea onChange={this.getReplyData} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                    }
                    </div> 
                    <div className='clear'></div>
                    </div>
                
                </Modal>
            </span>
        );
    }
}
export default CheckModal;