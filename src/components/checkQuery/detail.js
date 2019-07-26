import React from 'react'
import SaveButton from "../BlockQuote/saveButton";
import CancleButton from "../BlockQuote/cancleButton";
import {Modal} from "antd";
import Table from "antd/lib/table";
import SeTable from "./seTable";


class Detail extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
        this.fetch=this.fetch.bind(this)
    }

    clickDetail=()=>{
        this.setState({
            visible:true
        })
        this.fetch()
    }
    onCanCel=()=>{
        this.setState({
            visible:false
        })
    }
    fetch = () => {
        // axios({
        //     url: `${this.url}` ,
        //     method: 'get',
        //     headers:{
        //         'Authorization': this.url.Authorization
        //     },
        //     params: params,
        // }).then((data) => {
        //     const res = data.data.data?data.data.data:[];
        //     if(res&&res.list){
        //         for(var i = 1; i<=res.list.length; i++){
        //             res.list[i-1]['index']=(res.prePage)*10+i;
        //         }
        //         const {pagination} = this.state;
        //         pagination.total=res.total;
        //
        //         this.setState({
        //             dataSource: res.list,
        //             pagination:pagination,
        //         });
        //     }else{
        // this.setState({
        //     dataSource: []
        // })
    }
    render(){

        // 假数据
        var fakedataSource=[];
        for(var i=0;i<15;i++)
        {
            fakedataSource.push({
                index: i,
                checktime:i,
                checkname:'无名氏',
                confirmtime:'2019',
                confirmpeople:'无名氏2',
                sttus:'良好',
            });
        }
        //假数据

        return(
            <span>
           <span className='blue' onClick={this.clickDetail}>详情</span>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                width="1000px"
                height="464"
                title="点检详情"
                footer={[
                         <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <span>
                    <span>设备编号:{this.props.deviceNumber}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>设备名称:{this.props.deviceName}</span>
                <SeTable
                    // dataSource={this.state.dataSource}
                       dataSource={fakedataSource}
                />


                </span>
            </Modal>
                </span>
        )
    }
}

export default Detail