import React from 'react'
import axios from "axios";
import {message, Modal,Radio} from "antd";
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

    makeplan=()=>{
        let {code} = this.state;
        if (!code) {
            message.info('请先选择！');
            return
        }
        axios({
            url: `${this.props.url.SpotcheckPlan.SpotcheckPlan1}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deviceCode: this.props.record.code,
                deviceName: this.props.deviceName,
                modelId: code
            },
            type: 'json'
        }).then((data) => {
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
            if(res && res.length === 1){
                this.makeplan(res[0]["code"])
            }else{
                this.setState({
                    data:res,
                    visible:true
                })
            }
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
        this.setState({
            code:value.target.value
        })
    }
    render(){
        let {data} = this.state;
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
                    { data && data.length ?data.map((item)=>{
                        return <Radio key={item.code} value={item.code}>{item.modelName}</Radio>
                    }) : null}
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