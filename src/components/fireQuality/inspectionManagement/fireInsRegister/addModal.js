import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {DatePicker, Input, Modal, Select, Divider} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import AddModalTop from "../fireInsRegister/addModalTop";
import AddModalLeft from "../fireInsRegister/addModalLeft";
import AddModalRight from "../fireInsRegister/addModalRight";
import axios from "axios";


const {Option} = Select;


class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            leftDataSource: [],
            checkedList: [],
            username: "",
            deptCode: 0
        };
    }
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    render() {
        let {visible} = this.state;
        let {title,disabled} = this.props;
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
                        <AddModalTop url={this.props.url} leftDataSource={this.state.leftDataSource} leftDataSourceChange = {this.leftDataSourceChange}/>
                        <div className="addModalDown_scala">
                            <AddModalLeft leftDataSource={this.state.leftDataSource}/>
                            <Divider type="vertical" className="addModalDown_divider" />
                            <AddModalRight
                                getCheckedList = {this.getCheckedList}
                                getUsername={this.getUsername}
                                username = {this.state.username}
                                getDeptCode={this.getDeptCode}
                            />
                        </div>
                    </div>

                </Modal>
            </span>
        );
    }

    getDeptCode = (code) => {
        console.log(code)
        this.setState({
            deptCode:code
        })
    }

    getUsername = (username) => {
        console.log(username)
        this.setState({
            username:username
        })
    }

    getCheckedList = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList:checkedList
        })
    }

    leftDataSourceChange = (leftDataSource) => {
        this.setState({
            leftDataSource: leftDataSource
        })
    }


    /**点击新增事件*/
    handleClick = () => {

        this.setState({
            visible: true
        });
    }

    handleSave = () => {
        const {leftDataSource, checkedList,username,deptCode}= this.state;

        let params = this.saveDataProcessing();
        // axios({
        //     url: `url`,
        //     method: 'put',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     }
        // }).then((data) => {
        //     message.info(data.data.message);
        // })
    }

    saveDataProcessing = () => {
        console.log(this.state)
    }

    /**取消事件*/
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
}

export default AddModal;
