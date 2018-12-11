import React from 'react';
import {Button,Modal,Select,Popover,Switch,Icon} from 'antd';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import NewButton from '../../BlockQuote/newButton';
import RawMaterialRedListAddModal from './addModal';

const Option=Select.Option;

class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            checkSelectData:-1,//最开始下拉框是没选择数据的
            popVisible:false,//送检的气泡弹出
            checkSwitch:-1,//是否紧急那个开关最开始是关闭的即否
            materialName:'',
            materialClass:'',
        }
        
        this.showModal=this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.hide=this.hide.bind(this);//送审气泡的取消
        this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审事件点击确认按钮
        this.selectChange=this.selectChange.bind(this);//监听下拉框变化，
        
    }
   
    /**处理新增一条记录 */
    showModal = () => {
        this.setState({
          visible: true
        });
      }
    handleSave() {//点击新增保存，未申请状态
        console.log(this.formRef.getItemsValue());
        this.setState({
        visible: false
        });
    }
    handleCancel() {//点击新增的取消
        this.setState({
        visible: false
        });
    }


   
    //监听流程下拉框变化
    selectChange=(value)=>{
        this.setState({checkSelectData:value});
    }
    hide(){//送审气泡的取消
      //console.log('hide')
      //console.log(this.state.popVisible)
      this.setState({popVisible:false});
    }
    handleVisibleChange=(visible)=>{
      // console.log(this.props.data)
       this.setState({
         popVisible:visible
       })
   }
    handleSongShenOk(){//送审事件的确认按钮
      this.setState({popVisible:false});
    }

   //红单是否紧急
   urgentChange=(checked)=>{//checked指定当前是否选中
      //console.log(`switch to ${checked}`);//选中的话checked为true
      this.setState({
          checkSwitch:checked?0:-1
      });
    }

    render() {
        return (
            <span>
                <NewButton   handleClick={this.showModal} className='fa fa-plus'  name='新增' />&nbsp;&nbsp;&nbsp;
                <Modal  visible={this.state.visible}
                        maskClosable={false}
                        closable={false}
                        title="添加红单"
                        onOk={this.handleSave}
                        onCancel={this.handleSave}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save'   handleSave={this.handleSave}>保存</SaveButton>,
                        <Popover key='songshen' title='设置审批细节' width='50%' height='40%'
                        
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
                                    <Button type='primary'  disabled={this.state.checkSelectData>-1?false:true} onClick={this.handleSongShenOk}>确认</Button>
                                </div>
                             </div>
                         }
                         trigger='click'
                         visible={this.state.popVisible}
                         onVisibleChange={this.handleVisibleChange}
                        >
                        <Button key='submit' type='primary'><Icon type='check'/>送审</Button>
                        </Popover>
                    ]}>
                    <RawMaterialRedListAddModal batchNumber={this.props.batchNumber}   wrappedComponentRef={(form)=>this.formRef=form}></RawMaterialRedListAddModal>
                    
                </Modal>
            </span>
        );
    }
}
export default Add;