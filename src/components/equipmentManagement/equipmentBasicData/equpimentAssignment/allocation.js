import React from 'react'
import {Button, message, Modal} from "antd";
import SaveButton from "../../../BlockQuote/saveButton";
import CancleButton from "../../../BlockQuote/cancleButton";
import DepTree from "../../../BlockQuote/department";
import "./equpimentAssignment.css";
import axios from "axios";
import Transferq from './transferq';

class Allocation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            deptCode:0,
            visible:false,
            data1: [],
            data2: [], //为了方便搜索开辟两个数组
            dataSource1:[],
            dataSource2:[],
            deviceName:[],
        };
        this.search = this.search.bind(this);
        this.onclick = this.onclick.bind(this);
        this.onCanCel = this.onCanCel.bind(this);
        this.getRightData = this.getRightData.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.changeSourceData = this.changeSourceData.bind(this);
    }

    /** 分配点击事件 */
    onclick() {
        this.setState({
            visible:true,
            deviceName:this.props.clickName,
        });
    };

    render() {
        return(
            <span>
            <Button type="primary" onClick={this.onclick}>分配</Button>
            <Modal visible={this.state.visible} closable={false}
                   centered={true} maskClosable={false}
                    width="90vw" height="60vh"   title="设备工序分配"
                    footer={[ <SaveButton key="save" handleSave={this.handleSave }/>,
                              <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <p><span>工序名称:&nbsp;&nbsp;&nbsp;</span>{this.props.clickName}</p>
                <div className="equipment">
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.props.url}
                        getTableData={this.getRightData} />
                    <div className="equipment-right">
                        <Transferq  dataSource1={this.state.dataSource1} dataSource2={this.state.dataSource2}
                                    changeSourceData={this.changeSourceData} search={this.search}/>
                    </div>
            </div>
            </Modal>
            </span>
        )
    }

    search(value, flag) {
        let {data1, data2} = this.state;
        let data = flag ? data2 : data1;
        let result = data.filter(item => this.filterOption(value, item) );
        result = this.dataProcessing(result)
        if(flag) {
            this.setState({
                dataSource2: result
            })
        } else {
            this.setState({
                dataSource1: result
            })
        }
    }

    /**根据设备名称或者规格型号进行搜索*/
    filterOption = (inputValue, option) => {
        let i = option.deviceName ? option.deviceName.indexOf(inputValue) > -1: false,
            j = option.specification ? option.specification.indexOf(inputValue) > -1 : false;
        return i || j;
    };

   /**保存事件*/
   handleSave = () => {
       let { dataSource2 } = this.state;
       if(!dataSource2.length) {
           message.info('已分配设备不能为空！');
           return;
       } else {
           let deviceIds = [];
           for( let i = 0; i < dataSource2.length; i++ ) {
               deviceIds.push(dataSource2[i].deviceCode);
           }
           this.saveEvent(deviceIds);
       }
   };

    saveEvent = (deviceIds) => {
       axios({
           url: `${this.props.url.deviceProcess.assign}`,
           method: 'put',
           headers: {
               'Authorization': this.props.url.Authorization
           },
           type: 'json',
           params: {
               deptId: this.state.deptCode,
               proId: this.props.clickId
           },
           data: deviceIds
       }).then( data => {
           if(data.status === 200) {
               message.info('保存成功！');
               this.props.getTableData({
                   proId: this.props.clickId
               })
               this.setState({
                   visible:false,
                   dataSource1:[],
                   dataSource2:[],
                   data1: [],
                   data2: []
               })
           } else {
               message.info(data.data.message);
           }
       }).catch( (error) => {
           message.info( error && error.info ? error.info : '保存失败，请联系管理员！');
       })
    }

   /** 取消按钮 */
   onCanCel() {
       this.setState({
           visible:false,
           dataSource1:[],
           dataSource2:[],
           data1: [],
           data2: []
       })
   }

   /**获取数据*/
   getRightData(params) {
       let code = params && params.deptId ? params.deptId : '';
       if(code) {
           code = parseInt(code);
           this.setState({
               deptCode:code
           });
       }
       axios({
           url: `${this.props.url.deviceProcess.getDeviceAssignment}`,
           method: 'get',
           headers: {
               'Authorization': this.props.url.Authorization
           },
           params:{
               deptId:code,
               proId: this.props.clickId
           }
       }).then((data) => {
           const res = data.data.data ? data.data.data : [];
           const dataSource1 = [], dataSource2 = [], data1 = [], data2 = [];
           if (res && res.length) {
               let i1 = 1, i2 = 1;
               for(let i = 0; i < res.length; i++) {
                   if(res[i].chosen){
                       res[i]['index'] = i1++;
                       res[i]['key'] = res[i].deviceCode.toString();
                       data2.push(res[i]);
                       dataSource2.push(res[i])
                   } else {
                       res[i]['index'] = i2++;
                       res[i]['key'] = res[i].deviceCode.toString();
                       data1.push(res[i]);
                       dataSource1.push(res[i])
                   }
               }
           }
           this.setState({
               dataSource1: dataSource1,
               dataSource2: dataSource2,
               data1: data1,
               data2: data2
           })
       }).catch(() => {
           message.info('查询失败，请刷新下页面！')
       });
   };

   /**处理数据，使数据的index每次都从1开始显示*/
    dataProcessing(data) {
        for(let i = 0; i < data.length; i++) {
            data[i].index = i + 1;
        }
        return data;
    }

    /**改变状态*/
    changeSourceData(flag, ids) {
        let {dataSource1, dataSource2 } = this.state,
            data1 = dataSource1, data2 = dataSource2;  //默认右移操作

        //右移操作
        if(flag) {
            [data1, data2] = [dataSource2, dataSource1];
        }
        if(ids.length && dataSource1 && dataSource2) {
            ids.forEach(id => {
                let temp = data1.find(v => v.deviceCode === id );
                //每次将移动的元素都放在第一个显示
                data2.splice(0,0,temp);  //在数组头部新增一个元素
                data1.splice(data1.findIndex(v => v.deviceCode === temp.deviceCode), 1);
            })
            let d1 = this.dataProcessing(data1), d2 = this.dataProcessing(data2);
            if(flag) {
                this.setState({
                    dataSource1: d2,
                    dataSource2: d1,
                    data1: d1,
                    data2: d2
                })
            } else {
                this.setState({
                    dataSource1: d1,
                    dataSource2: d2,
                    data1: d1,
                    data2: d2
                })
            }
        }
    }
}
export default Allocation
