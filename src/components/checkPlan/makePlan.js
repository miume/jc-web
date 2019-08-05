import React from 'react'
import axios from "axios";
import {message} from "antd";

class MakePlan extends React.Component{
constructor(props){
    super(props)

    this.makeplan=this.makeplan.bind(this)
}

    makeplan=()=>{
        console.log(this.props.record.code)
        console.log(this.props.record.deviceName)
        console.log('2321321312321312')
        axios({
            url: `${this.props.url.SpotcheckPlan.SpotcheckPlan1}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deviceCode: this.props.record.code,
                deviceName: this.props.record.deviceName,
            },
            type: 'json'
        }).then((data) => {
            // this.props.fetch()
            this.props.fetch({
                deptId:this.props.deptId,
                deviceName:this.props.deviceName
            })
            this.props.fresh()
            console.log('调用成功')
            message.info(data.data.message);
        }).catch(()=>{
            message.info('编辑失败，请联系管理员！')
        })
    }
    render(){
        return(
            <span>
            <span className={this.props.flag===2?'blue':'hide'} onClick={this.makeplan}>
              新增点检计划
            </span>
            <span className={this.props.flag===0?'green':'hide'}>
                计划已制定
            </span>
                <span className={this.props.flag===1?'green':'hide'}>
                    无点检模板
                </span>
            </span>
        )

    }
}
export default  MakePlan