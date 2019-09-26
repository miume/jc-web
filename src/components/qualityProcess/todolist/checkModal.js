import React from 'react';
import RawTest from './rawTest';
import RedList from './redlist';
import {Modal,message} from 'antd';
import Procedure from './procedure';
import CheckPurchase from './checkPurchase';
import AllTester from '../../BlockQuote/allTester';
import NewButton from '../../BlockQuote/newButton';
import StockTable from '../../smartWarehouse/stockOut/detailTable';
import CheckUnqualified from './checkUnqualified';
import CancleButton from '../../BlockQuote/cancleButton';
import CheckProductStandard from './checkProductStandard';
import CheckUnqualifiedTrack from './checkUnqualifiedTrack';
import CkeckProductInspection from './checkProductInspection';
import EqupimentGuidance from './equpimentGuidance';
import axios from 'axios';
class CheckModal extends React.Component{
    componentDidMount(){
        if(this.props.dataType===11){
            this.judgeUnqualifiedArea();
        }
        if(this.props.dataType===4){
            this.getStockOutDetailData();
        }
    }
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            reply:'',
            unType:0
        }
        this.fail = this.fail.bind(this);
        this.pass = this.pass.bind(this);
        this.judgeType = this.judgeType.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getReplyData = this.getReplyData.bind(this);
        this.setClassName = this.setClassName.bind(this);
        this.judgeUnqualifiedArea = this.judgeUnqualifiedArea.bind(this);
        this.getStockOutDetailData = this.getStockOutDetailData.bind(this);
    }
    /**根据dataType判断是那种类型产品送审 */
    judgeType(type){
        switch(type){
            case 1:
            case 2:
            case 3:  return <Procedure url={this.props.url} dataId={this.props.dataId}/>;
            case 4:  return <StockTable dataSource={this.state.dataSource} flag={1}/>
            case 6:  return <RedList url={this.props.url} dataId={this.props.dataId}/>;
            case 7:  return <CheckPurchase url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 8:  return <CkeckProductInspection url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 5:
            case 9:
            case 10: return <RawTest url={this.props.url} dataId={this.props.dataId} flag={this.props.flag} type={type}/>;
            case 11: return <CheckUnqualified url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 12: return <CheckUnqualifiedTrack url={this.props.url} dataId={this.props.dataId} flag={this.props.flag}/>;
            case 13:
            case 14: return <CheckProductStandard url={this.props.url} batchNumberId={this.props.dataId} flag={type} />;
            case 15: return <EqupimentGuidance  url={this.props.url} batchNumberId={this.props.dataId}/>
            default: return '' ;
        }
    }
    setClassName(dataType,flag){
        /**如果是不合格需要进行判断 若规格为1080 则将dataType置为2 若规格为520 dataType置为4
         * flag为0 代表大容器
         * flag为1 代表小容器
        */
        if(dataType===11){
            var type = this.state.unType;
            if(type===1){
                dataType = 2;
                flag = flag?1:0;
            }else{
                dataType = 4;
                flag = flag?0:1;
            }
        }
        switch(dataType){
            case 2:
            case 7:
            case 12: return flag?0:'modal-xlg';
            case 15: return '.modal-600'
            default: return flag?1:'modal-md' ;
        }
    }
    judgeUnqualifiedArea = () => {
        axios({
            url: `${this.props.url.unqualifiedExamineTable.unqualifiedTestReportRecord}/${this.props.dataId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            if(detail){
                const type = detail.type;   //根据类型type来进行判断
                this.setState({
                    unType:type
                })
            }else{
                message.info('查询数据为空，请联系管理员')
            }

        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })
    };
    getStockOutDetailData(){
        axios({
            url:`${this.props.url.stockOut.repoOut}/${this.props.dataId}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data?data.data.data.details:[];
            var detail = [];
            if(res){
                for(var i = 0; i < res.length; i++){
                    var e = res[i];
                    detail.push({
                        index:`${i+1}`,
                        serialNumber:e.repoBaseSerialNumber.serialNumber,
                        materialName:e.repoBaseSerialNumber.materialName,
                        meterialClass:e.repoBaseSerialNumber.materialClass,
                        quantity:e.repoOutApply.quantity,
                        weight:e.repoOutApply.weight
                    })
                }
            }
            //console.log(detail)
            this.setState({
                dataSource:detail
            })
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
        const type = this.props.dataType;
        const dataType = JSON.parse(localStorage.getItem('dataType'));
        return (
            <span>
                {
                    this.props.flag?
                    <NewButton name={this.props.flag?'详情':'审核'} className='fa fa-floppy-o' handleClick={this.handleCheck} ></NewButton>:
                    <NewButton name='审核' className={this.props.checkFlag?'fa fa-check':'hide'} handleClick={this.handleCheck} ></NewButton>
                }
                {/* <NewButton name={this.props.flag?'详情':'审核'} className={this.props.flag?'fa fa-floppy-o':'fa fa-check'} handleClick={this.handleCheck} ></NewButton> */}
                <Modal visible={this.state.visible} title={this.props.flag?`${dataType[type]}`+'详情':`${dataType[type]}`+'审核'} centered={true}
                closable={false} maskClosable={false} className={this.setClassName(type)}
                /**this.props.dataType===2||this.props.dataType===7?'modal-xlg':'modal-md' */
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
                        /**this.props.dataType===2||this.props.dataType===7?0:1 */
                        <AllTester examineData={this.state.examineData} dataId={this.props.dataId} hide={this.setClassName(type,1)} />:
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
