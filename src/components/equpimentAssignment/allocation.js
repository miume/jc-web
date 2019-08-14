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
            visible:false,
            dataSource:[],
            dataSource2:[],
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


                  />
                   </div>
                <div className="equip-allocation-right">
                 <Transferq  dataSource={this.state.dataSource} dataSource2={this.state.dataSource2}/>
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
           var fakedataSource=[];
           var fakedataSource2=[];
           for(var i=0;i<20;i++)
           {
               fakedataSource.push({
                   code:i,
                   index:i+1,
                   Fixedassetscode:i,
                   Devicename:'fake1',
                   specification:'222-111',
               })
               fakedataSource2.push({
                   code:i*100,
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


}
export default Allocation