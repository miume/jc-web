import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {DatePicker, Input, Modal, Select, Divider} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import AddModalTop from "../fireInsRegister/addModalTop";
import AddModalLeft from "../fireInsRegister/addModalLeft";
import AddModalRight from "../fireInsRegister/addModalRight";
import moment from "moment";
const {Option} = Select;

const data = [{
    index: 1,
    code: 1,
    checkContent: '外壳是否完整',
    dataType: 0,
    frequency: '1次/天'
},{
    index: 2,
    code: 2,
    checkContent: '正常',
    dataType: 1,
    frequency: '1次/天'
},{
    index: 3,
    code: 3,
    checkContent: '未开机',
    type: 1,
    frequency: '1次/天'
}];

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
        this.dateChange = this.dateChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
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
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={1200}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className="addModal_scala">
                        <AddModalTop leftDataSource={this.state.leftDataSource} leftDataSourceChange = {this.leftDataSourceChange}/>
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

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {siteName,modelName,frequency,batchNumber,effectiveDate,code} = record;
            this.setState({
                siteName,
                modelName,
                batchNumber,
                effectiveDate,
                frequency,
                code
            })
        }
        this.setState({
            visible: true
        });
    }

    /**监控生效日期的变化*/
    dateChange(date,dateString) {
        this.setState({
            effectiveDate: dateString
        })
    }

    selectChange(value) {
        this.setState({
            siteName: value
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    handleSave() {
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

    saveDataProcessing() {
        console.log(this.state)
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }
}

export default AddModal;
