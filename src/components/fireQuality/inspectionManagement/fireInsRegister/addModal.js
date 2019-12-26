import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Select, Divider, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import AddModalTop from "../fireInsRegister/addModalTop";
import AddModalLeft from "../fireInsRegister/addModalLeft";
import AddModalRight from "../fireInsRegister/addModalRight";
import axios from "axios";




class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            leftDataSource: [],
            username: "",
            deptCode: 0,
            infos: [],


            indeterminate: true,
            checkAll: false,
            plainOptions:[],
            checkedList: [],
        };
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    render() {
        let {visible} = this.state;
        let {title, disabled} = this.props;
        return (
            <span>
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/>
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={1200}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className="addModal_scala">
                        <AddModalTop url={this.props.url} getItem={this.getItem}
                                     leftDataSource={this.state.leftDataSource}
                                     leftDataSourceChange={this.leftDataSourceChange}/>
                        <div className="addModalDown_scala">
                            <AddModalLeft leftDataSource={this.state.leftDataSource}/>
                            <Divider type="vertical" className="addModalDown_divider"/>
                            <AddModalRight
                                indeterminate={this.state.indeterminate}
                                getIndeterminate={this.getIndeterminate}
                                checkAll={this.state.checkAll}
                                getCheckAll={this.getCheckAll}
                                url={this.props.url}
                                getCheckedList={this.getCheckedList}
                                getUsername={this.getUsername}
                                username={this.state.username}
                                getDeptCode={this.getDeptCode}
                                plainOptions={this.state.plainOptions}
                                checkedList={this.state.checkedList}
                            />
                        </div>
                    </div>

                </Modal>
            </span>
        );
    }


    /**
     * 表格相关
     * @param leftDataSource
     * @param batchItems
     */
    leftDataSourceChange = (leftDataSource, batchItems,flag) => {
        var infos = this.state.infos;
        if (flag === 1) {
            infos.push(JSON.parse(JSON.stringify(batchItems)))
        }
        console.log(infos)
        this.setState({
            leftDataSource: leftDataSource,
            infos: infos
        })
    }

    /** 检测项目有关的函数*/
    getItem = (processCode, productCode) => {
        var checkedList = []
        axios({
            url:`${this.props.url.fireInsRegister.getItemsByCode}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                processCode: processCode,
                productCode: productCode
            }
        }).then((data)=>{

            const res = data.data.data;
            if (res) {
                var dataSource = res;
                for (var i = 0; i < dataSource.length; i++) {
                    checkedList.push(dataSource[i].code)
                }
                this.setState({
                    plainOptions: dataSource,
                    checkedList: checkedList
                })
            }else{
                message.info("检测项目获取为空")
            }
        }).catch(()=>{
            message.info('检测项目获取失败，请联系管理员！');
        });
    }

    getCheckAll = (checkAll) => {
        this.setState({
            checkAll:checkAll
        })
    }
    getIndeterminate = (indeterminate) => {
        this.setState({
            indeterminate: indeterminate
        })
    }
    getCheckedList = (checkedList) => {
        this.setState({
            checkedList: checkedList
        })
    }


    /**
     * 部门相关
     * @param code
     */
    getDeptCode = (code) => {
        this.setState({
            deptCode: code
        })
    }

    /**
     * 送检人相关
     * @param username
     */
    getUsername = (username) => {
        this.setState({
            username: username
        })
    }



    /**点击新增事件*/
    handleClick = () => {
        this.setState({
            visible: true
        });
    }

    //TODO 待测试
    handleSave = () => {
        var infos = this.state.infos;
        var checkedList = this.state.checkedList;

        for (var i = 0; i < infos.length; i++) {
            infos[i]["deptCode"] = this.state.deptCode
            infos[i]["delieryPeople"] = this.state.username
        }
        axios({
            url:`${this.props.url.fireInsRegister.add}?ids=${checkedList}`,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data: infos,
            type: 'json'
        }).then((data)=>{
            const res = data.data;
            if (res.code===0){
                message.info(res.message);
                this.props.getTableParams();
                this.setState({
                    visible: false,
                    leftDataSource: [],
                    infos:[],
                    username:""
                });
            }else{
                message.info('新增失败，请联系管理员！');
            }
        }).catch(()=>{
            message.info('新增失败，请联系管理员！');
        });

    }


    /**取消事件*/
    handleCancel = () => {
        this.setState({
            visible: false,
            leftDataSource: [],
            infos:[],
            username:""
        });
    }
}

export default AddModal;
