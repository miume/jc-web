import React from 'react';
import axios from 'axios';
import {Modal,Input,Table,DatePicker} from 'antd';
import Submit from '../BlockQuote/submit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
class SelectProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
        this.dataProcessing = this.dataProcessing.bind(this);
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
        this.handleCancel();
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false,
            visible1:false
        });
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false
        })
    }
    /**点击确定送审 */
    handleOkApply(){
        this.handleCancel();
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
        const newData = [...this.state.data];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        this.setState({
            data:newData
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
    dateChange(value){

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
                            <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/> 
                        ]}>
                         <div>
                             <div>
                                 <div>{`产品`}</div>
                                 <div>{`型号`}</div>
                             </div>
                            <div style={{height:'350px'}}>
                                 <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.allTestItem} pagination={false} size='small' bordered scroll={{y:216}}></Table>
                            </div>
                            <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}/>
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