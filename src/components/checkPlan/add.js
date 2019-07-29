import React from 'react'
import {message, Modal, Table} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import TTable from "./ttable"
import axios from "axios";
import MakePlan from "./makePlan";
class Add extends React.Component{
    constructor(props) {
        super(props);
        this.state={
             visible:false,
            rightTableData:[]
        }
        this.handleAdd=this.handleAdd.bind(this)
        this.onCanCel=this.onCanCel.bind(this)
        this.fresh=this.fresh.bind(this)
    }

    handleAdd = () => {
        this.setState({visible: true
        })
        console.log(this.props.deptCode)
        this.fresh()

    }
    fresh=()=>{
        axios({
            url: `${this.props.url.SpotcheckPlan.getAddMsg}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deptCode:this.props.deptCode,
                deviceName:this.props.deviceName
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            if (res) {
                var rightTableData = [];
                for (var i = 0; i < res.length; i++) {
                    var arr = res[i].deviceDocumentMain;
                    console.log('11111')
                    rightTableData.push({
                        index:i+1,
                        departName:this.props.departName,
                        code:arr['code'],
                        modelCode:arr['modelCode'],
                        fixedassetsCode:arr['fixedassetsCode'],
                        deviceName:arr['deviceName'],
                        deptCode:arr['deptCode'],
                        flag:res[i].flag,
                    })
                }
                console.log('2222222')
                console.log(rightTableData)
                this.setState({
                    rightTableData: rightTableData,
                });
                console.log('kkkkkkkkkkkk')
                console.log(this.state.rightTableData)
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    deviceName: ''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
    onCanCel = () => {
        this.setState({visible: false})
    }
    render(){

        return(
            <span>
            <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                width="1000px"
                height="464"
                title="新增数据"
                footer={[
                    <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <TTable  dataSource={this.state.rightTableData} url={this.props.url} deptId={this.props.deptCode} deviceName={this.props.deviceName}
                         fetch={this.props.fetch} fresh={this.fresh}/>





            </Modal>
            </span>
        )
    }

}
export  default  Add