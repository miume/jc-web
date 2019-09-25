import React from "react";
import axios from "axios";
import {message, Modal} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import Tr from "./tr";

class Distribution extends React.Component {
    url
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            appAuth: [],
            userAuth: [],
            authIds: []
        }
    }

    showModal = () => {
        this.fetch();
        this.setState({
            visible: true
        })
    }
    fetch = () => {
        axios({
            url: `${this.url.appUserAuth.getAllAuth}`,
            method: "get",
            headers: {
                'Authorization': this.Authorization
            },
        }).then((data) => {
            // console.log(data)
            const res = data.data.data;
            if (res) {
                this.setState({
                    appAuth: res
                })
            }
        });
        axios({
            url: `${this.url.appUserAuth.getAuthByUserId}`,
            method: "get",
            headers: {
                'Authorization': this.Authorization
            },
            params: {userId: this.props.userId}
        }).then((data) => {
            const res = data.data.data;
            if (res) {
                var authIds = []
                for (var i = 0; i < res.length; i++) {
                    authIds.push(parseInt(res[i].code))
                }
                this.setState({
                    authIds: authIds
                })
            }
        })

    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleCreate = () => {
        axios({
            url: `${this.url.appUserAuth.update}`,
            method: "put",
            headers: {
                'Authorization': this.Authorization
            },
            params: {userId: this.props.userId},
            data: this.state.authIds,
            type: 'json',
        }).then((data) => {
            if (data.data.code === 0) {
                message.info("权限分配成功")
            } else {
                message.info("权限分配失败，请联系管理员")
            }
        }).catch(() => {
            message.info('分配失败，请联系管理员！')
        })


        this.setState({
            visible: false
        })
    }
    selectBox = (e) => {
        const code = parseInt(e.target.value)
        var authIds = this.state.authIds
        const index = authIds.indexOf(code)
        if(index > -1){
            authIds.splice(index,1)
        }else{
            authIds.push(code)
        }
        console.log(authIds)
        this.setState({
            authIds:authIds
        })
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <span onClick={this.showModal} className="blue">分配</span>
                <Modal
                    title='分配' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check'/>,
                    ]}>
                    <table className="batchTable">
                        <thead className="bactchHead">
                            <tr>
                                <th style={{textAlign: "center"}}>序号</th>
                                <th style={{textAlign: "center"}}>权限名称</th>
                                <th style={{textAlign: "center"}}>是否拥有</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appAuth.length !== 0 ? this.state.appAuth.map((value, item) => {
                                    let isChecked = this.state.authIds.indexOf(value.code)>-1 ? true : false
                                    return <Tr selectBox={this.selectBox} checked={isChecked} key={item}
                                               index={item} value={value} authIds={this.state.authIds}/>
                                }) : null
                            }
                        </tbody>
                    </table>
                </Modal>
            </span>
        )
    }
}

export default Distribution
