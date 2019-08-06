import React from 'react';
import {Modal, Form, Input, message, Col, Select, Row} from 'antd';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import axios from 'axios';

class AddModal extends React.Component {
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
    //提交新增信息
    handleOk = () => {
        const deptCode=this.props.deptCode;
       var theData={
           deptCode:parseInt(deptCode),
           idCode:this.state.idCode,
           locationName:this.state.locationName,
       }
       this.setState({
           code:this.state.code+1,
       })
            axios({
                url : `${this.props.url.locationBasic.addBasicInfo}`,
                method:'post',
                headers:{
                    'Authorization': this.props.url.Authorization
                },
                data: theData,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.fetch(); // 重新调用分页函数
            }).catch(function () {
                message.info('新增失败，请联系管理员！');
            });
            // 将value传给后台
            this.setState({ visible: false });

    };
    fetch = () => {
        /**flag为1时，将分页搜索位置0 */
        console.log(this.props.deptCode)
        // if(flag) {
        //     var {pagination} = this.props.pagination;
        //     pagination.current = 1;//设置当前页面为1
        //     pagination.total = 0;//设置全部页面为0
        //     this.setState({
        //         pageChangeFlag: 0,
        //         pagination:pagination
        //     })
        // }
        var params={
            id:this.props.deptCode,
            page:this.props.pagination.page,
            size:10,
            depName:this.props.deptName,
        }
        console.log(params)
        this.props.getTableData(params);
    };

    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                <NewButton
                    handleClick={this.showModal}
                    name='新增'
                    style='button'
                    className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                <Modal
                    visible={this.state.visible}
                    title="新增数据"
                    closable={false}
                    width='450px'
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            key='back'
                            handleCancel={this.handleCancel}
                        />,
                        <NewButton
                            key="submit"
                            handleClick={this.handleOk}
                            name='确定'
                            style='button'
                            className='fa fa-check'
                        />
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
                                   value={this.state.locationName}
                                   onChange={this.onInputChange}
                                   placeholder="请输入"
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
                                   value={this.state.idCode}
                                   onChange={this.onInputChange}
                                   placeholder="请输入"
                            />
                        </Col>
                    </Row>
                </Modal>
            </span>
        );
    }
}

export default AddModal;