import React from 'react';
import axios from 'axios';
import {Modal, message, Popover, Steps, Row, Col, Input} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";

//用于编写弹出框的按钮应用
const Step = Steps.Step

class EditPart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            deptName:'',
            idCode:'',
            locationName:'',
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillMount() {
        this.setState({
            idCode:this.props.idCode,
            locationName:this.props.locationName,
        })
    }

    render=()=> {
        return (
            <div >
                <span className="blue" onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    title="编辑数据"
                    closable={false}
                    width='450px'
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check' />
                    ]}
                >
                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            所属部门 ：{this.props.deptName}
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            位置名称 ：
                        </Col>
                        <Col span={10}>
                            <Input size="small"
                                   style={{width:"313px"}}
                                   key='1'
                                   name='locationName'
                                   defaultValue={this.props.locationName}
                                   // value={this.state.locationName}
                                   onChange={this.onInputChange}
                            />
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >

                        <Col span={1.5} style={{paddingTop:"5px",paddingLeft:"15px"}}>
                            ID卡号 ：
                        </Col>
                        <Col span={10} style={{position:"absolute",right:"170px"}}>
                            <Input size="small"
                                   style={{width:"313px"}}
                                   key='2'
                                   name='idCode'
                                   defaultValue={this.props.idCode}
                                   // value={this.state.idCode}
                                   onChange={this.onInputChange}
                            />
                        </Col>
                    </Row>
                </Modal>

            </div>
        );
    }

    //随着输入的变化而变化
    onInputChange=(e)=>{
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,})
    }
    //展示弹出窗口
    showModal = () => {
        this.setState({
            visible: true,
            deptName:this.props.deptName,
        });
    };
    //取消新增信息
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //提交编辑结果
    handleOk = () => {
        const deptCode=this.props.deptCode;
        var theData={
            code:parseInt(this.props.code),
            deptCode:parseInt(deptCode),
            idCode:this.state.idCode,
            locationName:this.state.locationName,
        }
        axios({
            url : `${this.props.url.locationBasic.updateById}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: theData,
            type:'json'
        }).then((data) => {
            message.info(data.data.message);
            this.fetch(); // 重新调用分页函数
        }).catch(function () {
            message.info('编辑失败，请联系管理员！');
        });
        // 将value传给后台
        this.setState({ visible: false });
    };
    fetch = () => {
        /**flag为1时，将分页搜索位置0 */
        var params={
            id:this.props.deptCode,
            page:this.props.pagination.page,
            size:10,
            depName:this.props.deptName,
        }
        this.props.getTableData(params);
    };
}

export default EditPart
