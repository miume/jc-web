import React from 'react'
import {Button, message, Modal, Select,Transfer,Table} from "antd";
import difference from "lodash/difference";
import SaveButton from "../BlockQuote/saveButton";
import CancleButton from "../BlockQuote/cancleButton";
import DepTree from "./depTree";
import "./equpimentAssignment.css"
import axios from "axios";
import Transferq from './transferq'
class Allocation extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            Sourceflag1:false,
            Sourceflag2:false,
            deptCode:0,
            visible:false,
            dataSource:[],
            dataSource2:[],
            transferdataleft:[],
            transferdataright:[],
            deviceName:[],
        }
    }

    render() {
        const { targetKeys } = this.state;
        const { Option } = Select;
        console.log()
        return(
            <span>
            <Button type="primary" onClick={this.onclick}>分配</Button>
            <Modal visible={this.state.visible} closable={false}
                   centered={true} maskClosable={false}
                    width="1200px"     height="464"   title="设备工序分配"
                    footer={[ <SaveButton key="save" handleSave={this.handleSave }/>,
                              <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >

                工序选择:&nbsp;&nbsp;&nbsp;
                   <Select style={{width:"315px"}} onChange={this.handleChange2}  value={this.props.clickName} disabled>
                   </Select>
                <div className="equip-allocation">
                    <div  className="equip-allocation-left">
                        <div  className="equpiment-eqblocka">
                            设备工序(请选择）
                    </div>
                    <DepTree
                        getRightData={this.getRightData}
                        url={this.props.url}
                        operation={this.props.operation}
                        handleSelect={this.handleSelect}


                  />
                   </div>
                <div className="equip-allocation-right">
                 <Transferq  dataSource={this.state.dataSource} dataSource2={this.state.dataSource2} gettransferright={this.gettransferright} gettransferleft={this.gettransferleft} Sourceflag1={this.state.Sourceflag1} Sourceflag2={this.state.Sourceflag2} changeSourceflag={this.changeSourceflag}/>
                </div>
            </div>
            </Modal>
</span>
        )
    }

    /** 分配点击事件 */
    onclick=()=>{
        console.log('进行分配');
        this.setState({
            visible:true,
            devicename:this.props.clickName,
            Sourceflag1:false,
            Sourceflag2:false,
        })
        /**默认第一个*/
        //需要给初始第一个的部门的数据
        this.getRightData()
        console.log(this.props.clickName);
        console.log(this.state.devicename);
    };

   /**保存事件*/
   handleSave=()=>{
       console.log('保存按钮')
       this.setState({
           visible:false,
           dataSource:[],
           dataSource2:[],
           Sourceflag1:false,
           Sourceflag2:false,
       })

   }

   /** 取消按钮 */
   onCanCel=()=>{
       console.log('分配取消')
       this.setState({
           visible:false,
           Sourceflag1:false,
           Sourceflag2:false,})
       console.log(this.state.dataSource)
       console.log(this.state.dataSource2)
       console.log(this.state.Sourceflag2)
   }

   /**获取数据*/
   getRightData = (code, deviceName) => {

       code = parseInt(code)
       console.log(code)
       console.log('调用获取数据接口')
       this.setState({
           deptCode:code
       })
       axios({
           url: `${this.props.url.SpotcheckPlan.getDeviceCount}`,
           method: 'get',
           headers: {
               'Authorization': this.props.url.Authorization
           },
           params:{
               deptId:code
           }
       }).then((data) => {
           const res = data.data.data ? data.data.data : [];
           var fakedataSource=[];
           var fakedataSource2=[];
           for(var i=0;i<20;i++)
           {
               fakedataSource.push({
                   code:i,
                   flag:0,
                   index:i+1,
                   Fixedassetscode:i,
                   Devicename:'fake1',
                   specification:'222-111',
               })
               fakedataSource2.push({
                   code:i+20,
                   flag:0,
                   index:i+1,
                   Fixedassetscode:i,
                   Devicename:'fake2',
                   specification:'111-222',
               })
           }
           console.log(fakedataSource)
           console.log(fakedataSource2)
           this.setState({
               dataSource:fakedataSource,
               dataSource2:fakedataSource2,
           })

       }).catch(() => {
           message.info('查询失败，请刷新下页面！')
       });
   };

  /**从子组件获取保存的穿梭框数据*/
  gettransferright=(data)=>{
      var rightchangedata = data.filter(e=>e.flag%2!==0);
      console.log(rightchangedata)
      console.log(data)
      this.setState({
          transferdataright:rightchangedata
      })
  };
  gettransferleft=(data)=>{
      var rightchangedata = data.filter(e=>e.flag%2!==0);
      console.log(rightchangedata)
      console.log(data)
      this.setState({
          transferdataleft:rightchangedata
      })
    }
    /**树选择切换*/
    handleSelect = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isSelect = true;
            this.setState({
                deptCode:code
            })
            this.getRightData()
        } else {
            item.isSelect = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        // item.isSelect = false;
        if (item.children) {
            this.handleSelect(code, item.children)
        }

    });

    /**改变状态*/
    changeSourceflag=()=>{
        this.setState({
            Sourceflag1:true,
            Sourceflag2:true,
        })
    }
    /**下拉列表回调*/
    handleChange2 = (value) =>{
        this.setState({
            deviceName:value
        })
    }
}
export default Allocation