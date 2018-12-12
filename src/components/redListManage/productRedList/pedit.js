import React ,{Component}from 'react';
import {Form,Input,Button,Modal,Popconfirm,Select,Popover,Switch,InputNumber} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import ProductRedListEditModal from './peditModal';
import axios from 'axios';
const Option=Select.Option;

class Edit extends Component{
    server;
    Authorization;
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            checkSelectData:-1,//最开始下拉框是没选择数据的
            popVisible:false,//送检的气泡弹出
            checkSwitch:-1,//是否紧急那个开关最开始是关闭的
            
        }
        
        this.showModal=this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.hide=this.hide.bind(this);//送审气泡的取消
        this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审事件点击确认按钮
        this.selectChange=this.selectChange.bind(this);//监听下拉框变化，
        
    }
    showModal = () => {
        
        this.setState({ visible: true });
      }
       notShowModal=()=>{
        this.setState({ visible: false });
       }
      handleCancel () {
      
        this.setState({ visible: false });
        
      }
      handleSave () {//编辑一条记录
        const value=this.formRef.getItemsValue();
        value['status']=-1;
        value['id']=this.props.record.

        axios({

        }).then((data)=>{

        }).catch(()=>{
          
        });
        this.setState({ visible: false });
         
        }
      //红单是否紧急
   urgentChange=(checked)=>{//checked指定当前是否选中
    //console.log(`switch to ${checked}`);//选中的话checked为true
    this.setState({
        checkSwitch:checked?0:-1
    });
  }
           //监听流程下拉框变化
    selectChange=(value)=>{
        this.setState({checkSelectData:value});
    }
    hide(){//送审气泡的取消
      
      this.setState({popVisible:false});
    }
    handleVisibleChange=(visible)=>{
      
       this.setState({
         popVisible:visible
       })
   }
    handleSongShenOk(){//送审事件的确认按钮
      this.setState({popVisible:false});
    }
         
    render(){
        return(
            <span>
            <span className={this.props.editFlag?'blue':'grey'} onClick={this.props.editFlag?this.showModal:this.notShowModal} >编辑</span>
            <Modal
                visible={this.state.visible}
                maskClosable={false}
                closable={false}
                title="编辑红单"
                onOk={this.handleSave}
                onCancel={this.handleCancel}
            
             // footer下的每个组件都要有唯一的key
            footer={[
                <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                <SaveButton key='save'   handleSave={this.handleSave}>保存</SaveButton>,
                <Popover key='songshen' title='设置审批细节' width='50%' height='40%'
                maskClosable={false}
                 content={
                     <div style={{width:250 ,height:150}}>
                        <div>
                        <Select placeholder='选择送审流程' style={{width:150}} onChange={this.selectChange}>
                        {
                            this.props.process.map((pro)=>{
                                    return(
                                      <Option key={pro.commonBatchNumber.id} value={pro.commonBatchNumber.id}>{pro.commonBatchNumber.description}</Option>

                                    );
                            })
                        }
                      </Select>
                        </div>
                        <div style={{paddingTop:'10px'}}>
                          <span>是否紧急</span>&nbsp;&nbsp;<Switch onChange={this.urgentChange}/>
                        </div>
                        <div style={{paddingTop:'10px' ,float:'right'}}>
                            <Button onClick={this.hide}>取消</Button>
                            <Button type='primary'  disabled={this.state.checkSelectData>-1?false:true}>确认</Button>
                        </div>
                     </div>
                 }
                 trigger='click'
                 visible={this.state.popVisible}
                 onVisibleChange={this.handleVisibleChange}
                >
                  <Button key='submit' type='primary'>送审</Button>
                </Popover>
            ]}
          >
          <ProductRedListEditModal serialNumber={this.props.serialNumber} record={this.props.record}/>
          </Modal>
          </span>
        );
    }
}
export default Edit;