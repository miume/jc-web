import React from 'react';
import axios from 'axios';
import {Modal,Table, Input,message,Button} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import CheckModal from '../BlockQuote/checkModal';
import Submit from '../BlockQuote/submit';
// import NewButton from '../BlockQuote/newButton';
// const data = [];
// for(var i = 1; i <=10; i++){
//     data.push({
//         id:i,
//         testItem:`Ca${i}`,
//         result:'',
//         unit:'g/ml'
//     })
// }
class RecordChecking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            // dataSource:data,
            detail:[],
            topData:{},
            visible1:false,  //用来控制送审弹出框
            process:-1,      //审核流程
            urgent:0,         //紧急 1 正常 0
            IsQualified:-1
        }
        this.save = this.save.bind(this);
        this.failed = this.failed.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.checkData = this.checkData.bind(this);
        this.qualified = this.qualified.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getEditorData = this.getEditorData.bind(this);
        this.recordChecking = this.recordChecking.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            align:'center',
            width:'25%'
        },{
            title:'检测项目',
            dataIndex:'testItemName',
            key:'testItemName',
            align:'center',
            width:'25%'
        },{
            title:'检测结果',
            dataIndex:'testResult',
            key:'testResult',
            align:'center',
            width:'25%',
            render:(text,record)=>{
                //<Input id={record.id} name='outQuantity' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库数量' onChange={this.save} />
                return <Input id={record.id} name='testResult' placeholder='请输入检测结果' defaultValue={text} style={{width:'100%',height:'30px',border:'none'}} onChange={this.save} />
            }
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'25%'
        },]
    }
    /**点击录检 弹出框显示 */
    handleClick(){
        this.getEditorData();
        this.setState({
            visible:true,
            flag:0,       //1 表示合格 0 表示正常
            fail:0        //1表示不合格 0 表示正常
        })  
    }
    /**通过id获取数据 */
    getEditorData(){
        axios.get(`${this.props.url.rawTestReport.getById}?id=${this.props.value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var details  = [];
            var topData = {};
            var {flag,fail} = this.state;
            if(res)
                var IsQualified = res.testReportRecord?res.testReportRecord.IsQualified:0;
                if(IsQualified) flag = 1; else fail = 1;
                topData={
                    batchNumber: res.serialNumber?res.serialNumber:'',
                    materialName: res.materialName?res.materialName:'',
                    b:res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS){
                    for(var i = 0; i < res.testDTOS.length; i++){
                        var e = res.testDTOS[i];
                            details.push({
                                index:`${i+1}`,
                                id:e.testItemResultRecord.id,
                                testItemId:e.testItemResultRecord.testItemId,
                                testItemName:e.name,
                                testResult:e.testItemResultRecord.testResult?e.testItemResultRecord.testResult:'',
                                unit:'g/ml'
                            })
                    }   
                }
                //console.log(details)
                this.setState({
                    detail:details,
                    topData:topData,
                    flag:flag,
                    fail:fail
                })
        })
    }
    
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**input框内容变化，实现自动保存数据 */
    save(e){
        const value = e.target.value;
        const name = e.target.name;
        const id = e.target.id
        const newData = [...this.state.detail];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        this.setState({
            detail:newData
        })
    }
    /**点击合格 */
    qualified(){
        this.setState({
            flag:1,
            fail:0
        })
    }
    /**点击不合格 */
    failed(){
        this.setState({
            flag:0,
            fail:1
        })
    }
    /**监控申请送审弹出框的visible */
    handleVisibleChange(visible){
        this.setState({
            visible1:visible
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false,
        })
        // this.props.cancle();
    }
    /**点击确定送审 */
    handleOkApply(){
        this.checkData(1);
   }
    /**点击保存按钮 */
    handleSave(){
        this.checkData(0);
    }
    checkData(status){
        var {detail,flag,fail,IsQualified} = this.state;
        // if(flag) IsQualified = 1; else IsQualified = 0;
        if(IsQualified === -1 && flag === 0 && fail === 0){
            message.info('请点击合格或者不合格！');
            return
        }
        if(detail){
            for(var i = 0; i < detail.length; i++){
                if(detail[i].testResult === ''){
                    message.info('所有检测结果不能为空，请填写完整！');
                    return
                }
            }
        } 
        if(flag){
            this.applyOut(status);
        }
        
    }
    /**保存 */
    applyOut(status){
        var {detail,flag,IsQualified} = this.state;
        if(flag) IsQualified = 1; else IsQualified = 0;
        var testDTOS = [];
        for(var i=0; i<detail.length;i++ )
        {
            var e = detail[i];
            testDTOS.push({
                testItemResultRecord:{
                    id:e.id,
                    testResult:e.testResult
                }
            })
        }
        axios.put(`${this.props.url.rawTestReport.rawTestReport}`,{
            testDTOS:testDTOS,
            sampleDeliveringRecord:{
                id:this.props.value
            },
            testReportRecord:{
                isQualified:IsQualified
            }
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }else{
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
        this.setState({
            visible:false,
            visible1:false
        })
        // this.props.cancle();
    }
    /**送审 */
    applyReview(dataId){
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    /**点击录检按钮 */
    recordChecking(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <span className={this.props.status===-1||this.props.status===3?'blue':'notClick'} onClick={this.handleClick}>录检</span>
                <Modal title='数据录检' visible={this.state.visible} style={{top:20}} closable={false}
                maskClosable={false} centered={true}
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key='save' handleSave={this.handleSave} />,
                    <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/> 
                ]}>
                <div style={{height:'500px'}}>
                <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>批号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.topData?this.state.topData.batchNumber:''}</td>
                            <td>{this.state.topData?this.state.topData.materialName:''}</td>
                            <td>{this.state.topData?this.state.topData.b:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.state.topData?this.state.topData.materialName+'样品':''}</span>
                       </div>
                       {/* <Button><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button> */}
                       {/* <Button className='white-button' onClick={this.props.handleCancel}><i className="fa fa-trash-o" style={{fontWeight:'bolder'}}></i><span style={{fontWeight:'bolder'}}> 清空</span></Button> */}
                </div>
                
                <div style={{height:'350px'}}>
                    <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.detail} pagination={false} size='small' bordered scroll={{y:216}}></Table>
                </div>
                <CheckModal flag={this.state.flag} fail={this.state.fail} qualified={this.qualified} failed={this.failed}/>
                </div>
                </Modal>
            </span>
        );
    }
}
export default RecordChecking;