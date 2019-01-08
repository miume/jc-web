import React from 'react';
import axios from 'axios';
import {Modal,Input,Table,DatePicker,message} from 'antd';
import Submit from '../BlockQuote/submit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
class SelectProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date:'',          //监控新增标准 的生效日期
            visible:false,    //控制新增弹出框
            visible1:false,   //控制送审弹出框
            process:-1,       //监听送审流程
            urgent:0,         //监听送审的状态 0紧急还是1正常   
            allTestItem:[],   //保存所有受检项目
        }
        this.save = this.save.bind(this);
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
    /**点击新增标准 弹出新增标准弹出框 */
    handleAdd(){
        this.setState({
            visible:true
        })
        this.getAllTestItem();
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
        axios.post(`${this.props.url.productStandard.productStandard}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                console.log(dataId)
                // this.applyReview(dataId);
            }else{
                message.info(data.data.message);
                this.handleCancel();
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
        const techniqueProductStandardRecord = {
            effectiveTime:date,
            productClassId:this.props.productName[0],
            serialNumberId:this.props.modalName[0]
        };
        const details = {
            techniqueProductStandardRecord:techniqueProductStandardRecord,
            techniqueProductTestItemDTOs:techniqueProductTestItemDTOs
        }
        this.applyOut(status,commonBatchNumber,details);
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
            this.handleCancel();
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    render(){
        return (
            <div className='product-standrad-bottom'>
            {
                this.props.data.length?
                <div>展示table</div>:
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                     <div className='product-standrad-img-p'>您还没建立任何标准</div>
                     <div className='product-standrad-img-p1'>
                         需要建立一套标准后才能执行相关操作
                    </div>
                     <div>
                         <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                         <Modal title='新增标准' visible={this.state.visible} closable={false}
                         maskClosable={false} 
                         footer={[
                            <CancleButton key='back' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.handleSave} />,
                            <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} 
                            process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply} submitClick={this.submitClick}/> 
                        ]}>
                         <div>
                         <div className='rawStandardTop'>
                            <table>
                                <thead>
                                <tr>
                                    <th>批号</th>
                                    <th>产品</th>
                                    <th>型号</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.batchNumber?this.props.batchNumber:''}</td>
                                        <td>{this.props.productName[1]}</td>
                                        <td>{this.props.modalName[1]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <div className='modal-add-table' >
                                 <Table className='stock-out' rowKey={record=>record.id} 
                                 columns={this.columns} dataSource={this.state.allTestItem} 
                                 pagination={false} size='small' bordered scroll={{y:250}}>
                                 </Table>
                            </div>
                            <DatePicker placeholder='请选择生效日期' onChange={this.dateChange} 
                            size='large' className='modal-add-date' />
                         </div>
                             
                         </Modal>
                     </div>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;