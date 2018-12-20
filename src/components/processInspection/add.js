import React from 'react';
import {Button,Modal,message} from 'antd';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import WhiteSpace from '../BlockQuote/whiteSpace';
import Tr from './tr';
import Submit from '../BlockQuote/submit';
import SaveButton from '../BlockQuote/saveButton';
import axios from 'axios';
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            visible1:false,
            count: 1,
            data : [],
            urgent:0,
            process:-1,
            addApplyData:[]
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.getData = this.getData.bind(this);
        this.applyReview = this.applyReview.bind(this);
    }
    /**处理新增一条记录 */
    handleAdd = () => {
        this.setState({
          visible: true,
          data:[1]
        });
      }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false,
        data : [1]
        });
    }
    /**新增一条数据 */
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
    }
    /**删除一条数据 */
    deleteRow(value){
        var {count,data,addApplyData} = this.state;
        addApplyData = addApplyData.filter(e=>e.id.toString()!==value);
        this.setState({
            count:count-1,
            data:data.filter(d=>d.toString()!==value),
            addApplyData:addApplyData
        })
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
            urgent:checked?0:-1
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
        this.applyOut(1);
    }
    /**点击保存送审 */
    handleSave(){
        this.applyOut(0);
    }
    applyOut(status){
        const details = this.state.addApplyData;
        //console.log(details)
        for(var i = 0; i < details.length; i++){
            delete details[i].id;
            var e = details[i].procedureTestRecord;
            for(var j in e){
                if( e[j]==='' || e[j] === -1 || e[j] === []){
                    message.info('新增数据不能为空，请填写完整！');
                    return
                }
            }
        }
        this.setState({
            visible:false,
            visible1:false
        })
        const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber = {
            createPersonId:createPersonId,
            // status:status,
            // isUrgent:this.state.urgent
        }
        axios.post(`${this.props.url.procedure.procedureTestRecord}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            // params:{
            //     taskId:taskId
            // }
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
        this.state.addApplyData = addApplyData;
    }
    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                <Modal title="新增" visible={this.state.visible} closable={false} centered={true}
                    onCancel={this.handleCancel} maskClosable={false} className='modal-xxlg'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleSave} />,
                        <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/>
                    ]}>
                    <div style={{height:'400px'}}>
                    <div className='fr'>已录入{this.state.count}条数据</div><br/>
                         <table id='process-table'>
                             <thead className='thead'>
                             <tr>
                                <td>产品线</td>
                                <td>工序</td>
                                <td>取样点</td>
                                <td>取样人</td>
                                <td>检测人</td>
                                <td>检测项目</td>
                                <td>频次</td>
                                <td>受检物料</td>
                                <td>备注</td><td>操作</td>
                              </tr>
                             </thead>
                             <tbody className='tbody'>
                             {
                                this.state.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.deleteRow} id={m.toString()} url={this.props.url} value='' getData={this.getData}></Tr> })
                             }
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>

                    </div>
                </Modal>
            </span>
        );
    }
}
export default Add;
