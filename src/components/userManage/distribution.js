import React from "react";
import axios from "axios";
import {Table,Modal} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import Tr from "./tr";

class Distribution extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            visible:false,
            appAuth:[],
            userAuth:[],
        }
    }
    showModal = () => {
        this.fetch();
        this.setState({
            visible:true
        })
    }
    fetch = ()=>{
        axios({
            url:`${this.url.appUserAuth.getAllAuth}`,
            method:"get",
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            // console.log(data)
            const res = data.data.data;
            if(res){
                this.setState({
                    appAuth:res
                })
            }
        });
        axios({
            url:`${this.url.appUserAuth.getAuthByUserId}`,
            method:"get",
            headers:{
                'Authorization':this.Authorization
            },
            params:{userId:this.props.userId}
        }).then((data)=>{
            // console.log(data)
            const res = data.data.data;
            if(res){
                this.setState({
                    userAuth:res
                })
            }
        })
        
    }
    handleCancel = ()=>{
        this.setState({
            visible:false
        })
    }
    handleCreate = ()=>{
        this.setState({
            visible:false
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span onClick={this.showModal} className="blue">分配</span>
                <Modal
                title='分配' visible={this.state.visible}
                closable={false} centered={true}
                maskClosable={false}
                width='500px'
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                ]}>
                    <table className="batchTable">
                        <thead className="bactchHead">
                            <tr>
                                <th style={{textAlign:"center"}}>序号</th>
                                <th style={{textAlign:"center"}}>权限名称</th>
                                <th style={{textAlign:"center"}}>是否拥有</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appAuth.length!==0?this.state.appAuth.map((value,item)=>{
                                    return <Tr key={item} index={item} value={value} userAuth={this.state.userAuth}/>
                                }):null
                            }
                        </tbody>
                    </table>
                </Modal>
            </span>
        )
    }
}

export default Distribution