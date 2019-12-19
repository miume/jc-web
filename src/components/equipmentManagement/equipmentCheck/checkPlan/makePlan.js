import React from 'react'
import axios from "axios";
import {message, Modal,Checkbox,Radio} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class MakePlan extends React.Component{
constructor(props){
    super(props)
    this.state={
        visible:false,
        data:[],
        code:""
    }
    this.makeplan=this.makeplan.bind(this)
}

    makeplan=(code)=>{
        // console.log(this.props.record.code)
        // console.log(this.props.record.deviceName)
        // console.log(this.state.code[0])
        // console.log(code)
        axios({
            url: `${this.props.url.SpotcheckPlan.SpotcheckPlan1}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deviceCode: this.props.record.code,
                deviceName: this.props.deviceName,
                modelId:this.state.code===""?code:this.state.code
            },
            type: 'json'
        }).then((data) => {
            // console.log(data)
            // this.props.fetch()
            this.props.fetch({
                deptId:this.props.deptId,
                deviceName:this.props.deviceName
            })
            this.props.fresh()
            message.info(data.data.message);
            this.setState({
                visible:false,
                data:[],
                code:""
            })
        }).catch(()=>{
            message.info('编辑失败，请联系管理员！')
        })
    }
    showModal = () =>{
        axios({
            url:`${this.props.url.deviceSpot.getModelByDeviceName}`,
            method:"get",
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: {deptCode:this.props.parentCode,deviceName:this.props.deviceName},
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res);
            if(res.length === 1){
                this.makeplan(res[0]["code"])
            }else{
                this.setState({
                    data:res,
                    visible:true
                })
            }
            // this.makeplan(1)
        })
    }
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:[],
            code:""
        })
    }
    onChange = (value)=>{
        console.log(value.target.value)
        this.setState({
            code:value.target.value
        })
    }
    render(){
        // console.log(this.props.record.code)
        const options = this.state.data.map((item)=>{
            return(
                {label:item.modelName,value:item.code}
            )
        })
        return(
            <span>
            <span className={this.props.flag===2?'blue':'hide'} onClick={this.showModal}>
              新增点检计划
            </span>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                title="选择模板"
                width='1000px'
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key="define" handleSave={this.makeplan} className='fa fa-check' />,
                ]}
            >
                <Radio.Group value={this.state.code} onChange={this.onChange}>
                    {this.state.data.map((item)=>{
                        return <Radio key={item.code} value={item.code}>{item.modelName}</Radio>
                    })}
                </Radio.Group>
            </Modal>
            <span className={this.props.flag===1?'green':'hide'}>
                计划已制定
            </span>
                <span className={this.props.flag===0?'green':'hide'}>
                    无点检模板
                </span>
            </span>
        )

    }
}
export default  MakePlan