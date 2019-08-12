import React from 'react'
import {Button, message, Modal, Select,Transfer,Table} from "antd";
import difference from "lodash/difference";
import SaveButton from "../BlockQuote/saveButton";
import CancleButton from "../BlockQuote/cancleButton";
import DepTree from "./depTree";
import "./equpimentAssignment.css"
import axios from "axios";
import App from './transfer'
class Allocation extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            visible:false,

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
                   <Select style={{width:"315px"}} onChange={this.handleChange2}  value={this.state.deviceName}>
                                {
                                    this.props.processData.map(e => {
                                        return (<Option value={e.deviceName}> {e.deviceName}</Option>)
                                    })
                                }
                   </Select>
                <div className="equip-allocation">
                    <div  className="equip-allocation-left">
                        <div  className="equpiment-eqblocka">
                        设备名称(请选择）
                    </div>
                    <DepTree
                        getRightData={this.getRightData}
                        url={this.props.url}
                        operation={this.operation}
                        handleSelect={this.handleSelect}
                        firstname={this.firstname}

                  />
                   </div>
                <div className="equip-allocation-right">
                 <App />
                </div>
            </div>
            </Modal>
</span>
        )
    }

    /** 分配点击事件 */
    onclick=()=>{
        console.log('进行分配');
        this.setState({visible:true})};
   /**保存事件*/
   handleSave=()=>{
       console.log('保存按钮')
       this.setState({visible:false})
   }

   /** 取消按钮 */
   onCanCel=()=>{
       console.log('分配取消')
       this.setState({visible:false})
   }

   /**获取数据*/
   getRightData = (code, deviceName) => {

       code = parseInt(code)
       console.log(code)
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
           if (res) {
               var rightTopData = [];
               if (JSON.stringify(res) !== '{}') {
                   for (var key in res) {
                       rightTopData.push({
                           name: key,
                           count: res[key]
                       })
                   }
               } else {
                   rightTopData.push({
                       name: '无设备',
                       count: 0
                   })
               }
               var updatebackground=[1];
               for(var i=0;i<rightTopData.length-1;i++){
                   updatebackground.push(0);
               }
               this.setState({
                   rightTopData: rightTopData,
                   deptCode: code,
                   updatebackground:updatebackground,
               }, () => {
                   const rightTopData = this.state.rightTopData;
                   var deviceFlag = true;
                   rightTopData.map((item) => {
                       if (item.name === deviceName) {
                           deviceFlag = false
                       }
                       return rightTopData;
                   })
                   // if (deviceFlag) {
                   //     this.getTableData({
                   //         deptId: parseInt(code),
                   //         deviceName: rightTopData[0] ? rightTopData[0].name : null
                   //     }, 0);
                   //     this.setState({
                   //         deviceName: rightTopData[0].name
                   //     })
                   // } else {
                   //     this.getTableData({
                   //         deptId: parseInt(code),
                   //         deviceName: deviceName
                   //     }, 0);
                   // }
               });
           } else {
               message.info('查询失败，请刷新下页面！')
           }
       }).catch(() => {
           message.info('查询失败，请刷新下页面！')
       });
   };
}
export default Allocation