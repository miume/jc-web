import React from 'react';
import axios from 'axios';
import {Modal,Input,Table,DatePicker,message} from 'antd';
import HeadTable from './headTable';
import Submit from '../BlockQuote/submit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
class AddProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date:'',          //监控新增标准 的生效日期
            visible:false,    //控制新增弹出框
            visible1:false,   //控制送审弹出框
            process:-1,       //监听送审流程
            urgent:0,         //监听送审的状态 0紧急还是1正常   
            allTestItem:[],   //保存所有受检项目
            batchNumber:'',   //用来存取详情、编辑时的batchNumber
            time:{}           //用来存储详情、编辑时的生效时间和创建时间
        }
        this.save = this.save.bind(this);
        this.judge = this.judge.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.submitClick = this.submitClick.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.addDataProcessing = this.addDataProcessing.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            align:'center',
            width:'25%'
        },{
            title:'检测项目',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'25%'
        },{
            title:'检测结果',
            dataIndex:'testResult',
            key:'testResult',
            align:'center',
            width:'25%',
            render:(text,record)=>{
                if(record.flag){
                    return text;
                }else 
                    return <Input id={record.id} name='testResult' placeholder='请输入检测结果' style={{width:'100%',height:'30px',border:'none'}} onChange={this.save} className='stock-out-input' />
            }
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'25%'
        },]
    }
    /**判断是新增 编辑 还是详情 */
    judge(flag){
        switch(flag){
            case 1 : return <span className='blue' onClick={this.handleAdd}>详情</span>; break;
            case 2 : return <span className='blue' onClick={this.handleAdd}>编辑</span>; break;
            default: return <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />; break;
        }
    }
    /**点击新增标准 弹出新增标准弹出框 */
    handleAdd(){
        const flag = this.props.flag;
        const id = this.props.batchNumberId;
        this.setState({
            visible:true
        })
        if(flag) this.getDataByBatchNumberId(id);
        else this.getAllTestItem();
    }
    /**详情或者编辑 通过batchNumberId查询数据 */
    getDataByBatchNumberId(id){
        axios.get(`${this.props.url.productStandard.productStandard}/${id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.detailDataProcessing(res);
            }
        })
    }
    /**对详情、编辑数据进行处理 */
    detailDataProcessing(res){
        var batchNumber = res.commonBatchNumber.batchNumber;
        var time = {
            createTime:res.commonBatchNumber.createTime,
            effectiveTime:res.details.techniqueProductStandardRecord.effectiveTime
        }
        var details = res.details.techniqueProductTestItemDTOs;
        var data = [];
        for(var i = 0; i < details.length; i++){
            var e = details[i];
            var testItems = e.testItem;
            testItems['index'] = `${i+1}`;
            testItems['value'] = e.techniqueProductTestItemStandard.value;
            data.push(testItems)
        }
        console.log(data)
        this.setState({
            batchNumber:batchNumber,
            allTestItem:data,
            time:time
        })
    }
    /**点击保存按钮 */
    handleSave(){
        this.addDataProcessing(0);
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false,
            visible1:false
        });
    }
    /**点击送审按钮 弹出送审界面 */
    submitClick(){
        this.setState({
            visible1:true
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false
        })
    }
    /**点击确定送审 */
    handleOkApply(){
        this.addDataProcessing(1);
    }
    /**监听送审界面 送审流程的变化 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**监听送审界面switch 正常 紧急与否 */
    urgentChange(value){
        this.setState({
            urgent:value?1:0
        })
    }
    /**监听table数据的变化 */
    /**input框内容变化，实现自动保存数据 */
    save(e){
        const value = e.target.value;
        const name = e.target.name;
        const id = e.target.id
        const newData = [...this.state.allTestItem];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        this.setState({
            allTestItem:newData
        })
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
          if(res){
              this.dataProcessing(res);
          }
      })
      }
    /**对数据进行处理 */
    dataProcessing(data){
        for(var i = 0; i < data.length; i++){
            data[i].unit = 'kg';
            data[i]['index']=`${i+1}`;
            data[i]['testResult']=''
        }
        this.setState({
            allTestItem:data
        })
    }
    /**监控新增标准 生效时间的选取 */
    dateChange(date,dateString){
        this.setState({
            date:dateString
        })
    }
    /**保存 */
    applyOut(status,commonBatchNumber,details){
        const productId = this.props.data[1][0];
        const classId = this.props.data[2][0];
        axios.post(`${this.props.url.productStandard.productStandard}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status===1&&data.data.code===0){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                // console.log(dataId)
                this.applyReview(dataId,classId,productId);
            }else{
                message.info(data.data.message);
                this.handleCancel();
                this.props.getAllProductStandard({
                    classId:classId,
                    productId:productId
                })
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    }
    /**对保存或送审的数据进行处理 */
    addDataProcessing(status){
        const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber = {
            createPersonId:createPersonId
        }
        var techniqueProductTestItemDTOs = [];
        const {date} = this.state;
        if(date===''){
            message.info('生效日期不能为空！');
            return 
        }
        const data = this.state.allTestItem;
        for(var i=0; i<data.length;i++ )
        {
            techniqueProductTestItemDTOs.push({
                techniqueProductTestItemStandard:{
                    testItemId:data[i].id,
                    value:data[i].testResult
                }
            })
        }
        const productId = this.props.data[1][0];
        const classId = this.props.data[2][0];
        const techniqueProductStandardRecord = {
            effectiveTime:date,
            productClassId:classId,
            serialNumberId:productId
        };
        const details = {
            techniqueProductStandardRecord:techniqueProductStandardRecord,
            techniqueProductTestItemDTOs:techniqueProductTestItemDTOs
        }
        this.applyOut(status,commonBatchNumber,details);
    }
    /**送审 */
    applyReview(dataId,classId,productId){
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getAllProductStandard({
                classId:classId,
                productId:productId
            })
            this.handleCancel();
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    render(){
        /**flag用来区分 是详情还是新增 默认为新增，编辑 1表示详情*/
        const footer = this.props.flag?
           [<CancleButton key='back' flag={1} handleCancel={this.handleCancel}/>]:
           [
            <CancleButton key='back' handleCancel={this.handleCancel}/>,
            <SaveButton key='save' handleSave={this.handleSave} />,
            <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} 
            process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply} submitClick={this.submitClick}/> 
           ];
        const flag = this.props.flag;
        return (
            <span>
                {this.judge(flag)}
                <Modal title='新增标准' visible={this.state.visible} closable={false}
                maskClosable={false} 
                footer={footer}>
                <div>
                    <HeadTable data={this.props.data} batchNumber={this.state.batchNumber} />
                    <div className='modal-add-table' >
                        <Table className='stock-out' rowKey={record=>record.id} 
                        columns={this.columns} dataSource={this.state.allTestItem} 
                        pagination={false} size='small' bordered scroll={{y:250}}>
                        </Table>
                    </div>
                    <div>
                    {
                        this.props.flag===1?
                        <div className='modal-detail-p'>
                            <p>{`生效时间：${this.state.time.effectiveTime}`}</p>
                            <p>{`编制日期：${this.state.time.createTime}`}</p>
                        </div>:
                        <DatePicker placeholder='请选择生效日期' onChange={this.dateChange} 
                        size='large' className='modal-add-date' />
                    }
                    </div>

                </div> 
                </Modal>
            </span>
        )
    }
}
export default AddProductStandard;