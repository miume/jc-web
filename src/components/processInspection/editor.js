import React from 'react';
import {Modal,Button,message} from 'antd';
import axios from 'axios';
import WhiteSpace from '../BlockQuote/whiteSpace';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
import Submit from '../BlockQuote/submit';
import Tr from './tr';
class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            visible1:false,
            count : 0,
            dataSource:[],
            data:[],
            addApplyData:[],
            editorData:[],
            allTestItem:[],
            process:-1,
            urgent:0
        }
        this.handleEditor = this.handleEditor.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.getData = this.getData.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.checkData = this.checkData.bind(this);
    }
    /**获取所有检测项目 */
    getAllTestItem(){
        axios({
            url:`${this.props.url.testItems.testItems}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
            }).then(data=>{
            const res = data.data.data;
            this.setState({
                allTestItem : res
            })
    })
    }
    /**处理新增一条记录 */
    handleEditor() {
        this.getDetailData();
        this.getAllTestItem();
        this.setState({
          visible: true,
        });
      }
    /**通过id查询数据 */
    getDetailData(){
        axios.get(`${this.props.url.procedure.procedureTestRecord}/${this.props.value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const details = data.data.data?data.data.data.details:[];
            const count = details?details.length:0;
            for(var i = 0; i < count; i++){
                details[i].id = i+1;
                details[i].procedureTestRecord.testItems = details[i].testItemString;
            }
            this.setState({
                editorData:details?details:[1],
                count:count
            })
            //console.log(details)
        })
     }
    handleOk() {
        this.setState({
            visible: false
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    /**编辑中新增按钮 */
    addData() {
        const {count,editorData} = this.state;
        editorData.push({
            id:count+1,
            procedureTestRecord:{}
        })
        this.setState({
            count: count+1,
            editorData: editorData
        })
        // console.log(editorData)
    }
    /**删除一条 */
    deleteRow(value){
        const {count,editorData,addApplyData} = this.state;
        this.setState({
            count: count-1,
            editorData: editorData.filter(d => d.id.toString()!== value),
            addApplyData:addApplyData.filter(d => d.id.toString()!== value)
        })
        // console.log(this.state.data)
    }
    /**获取每个Tr的值 */
    getData(data){
        const {addApplyData} = this.state;
        if(addApplyData.length === 0) { addApplyData.push(data)};
        var flag = 0;
        for(var i = 0; i < addApplyData.length; i++){
            if(addApplyData[i].id === data.id){
                addApplyData[i] = data;
                flag = 1;
            }
        }
        if(!flag){
            addApplyData.push(data)
        }
        // console.log(addApplyData)
        this.state.addApplyData = addApplyData;
    }
    /**监控送审界面的visible */
    handleVisibleChange(visible){
        this.setState({
            visible1:visible
        })
    }
     /**监控是否紧急 */
     urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false
        })
    }
    /**点击送审 */
    handleOkApply(){
        this.checkData(1);
        // this.applyOut(1);
    }
    /**点击保存送审 */
    handleSave(){
        this.checkData(0);
        // this.applyOut(0);
    }
    /**验证数据是否都不为空 */
    checkData(status){
        const details = this.state.addApplyData;
        //console.log(this.state.addApplyData)
        var flag = 1;
        for(var i = 0; i < details.length; i++){
            //delete details[i].id;
            if(details[i].testItemIds.length===0){
                message.info('检测项目不能为空，请填写完整！');
                return
            }
            var e = details[i].procedureTestRecord;
            for(var j in e){
                if( !e[j] || e[j] === -1 || e[j] === []){
                    message.info('新增数据不能为空，请填写完整！');
                    return
                }
            }
        }
        if(flag){
            this.applyOut(status);
        }
    }
    applyOut(status){
        this.setState({
            visible:false,
            visible1:false
        })
        const details = this.state.addApplyData;
        const commonBatchNumber = {
            id:this.props.value,
            memo:''
        }
        axios.put(`${this.props.url.procedure.procedureTestRecord}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }
            else{
                message.info(data.data.message);
                this.props.fetch();
            }
        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
    }
    /**保存后送审送审 */
    applyReview(dataId){
        //const taskId = this.state.process === -1?'':this.state.process;
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
            this.props.fetch();
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    render() {
        return (
            <span>
                <span className={this.props.status===-1?'blue':'notClick'} onClick={this.props.status===-1?this.handleEditor:null} >编辑</span>
                <Modal title="编辑" visible={this.state.visible} closable={false} centered={true}
                    onCancel={this.handleCancel} maskClosable={false} className='modal-xxlg'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleSave} />,
                        <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/> ,
                    ]}>
                    <div style={{height:'400px'}}>
                         <p className='fr'>已录入{this.state.count}条数据</p>
                         <table style={{width:'100%'}} id='process-table'>
                             <thead className='thead'>
                                 <tr>
                                     <td>产品线</td>
                                     <td>工序</td>
                                     <td>取样点</td>
                                     <td>取样人</td>
                                     <td>检测人</td>
                                     <td style={{minWidth:'135px'}}>检测项目</td><td>频次</td>
                                     <td>受检物料</td>
                                     <td>备注</td><td>操作</td>
                                 </tr>
                             </thead>
                             {
                                this.state.editorData?
                                 <tbody className='tbody'>
                                    {
                                    this.state.editorData.map((m) => { return <Tr key={m.id.toString()} id={m.id.toString()} url={this.props.url} deleteRow={this.deleteRow} id={m.id.toString()} value={m.procedureTestRecord} getData={this.getData} allTestItem={this.state.allTestItem}></Tr> })
                                    }
                             </tbody>:
                             <tbody></tbody>
                             }

                         </table>

                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                    </div>
                </Modal>
            </span>
        );
    }
}
export default Editor;
