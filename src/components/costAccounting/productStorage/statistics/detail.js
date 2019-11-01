import React from 'react';
import {Modal, Table, Divider} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";

class Detail extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '6%'
        }, {
            title: '批次',
            key: 'batch',
            dataIndex: 'batch',
            width: '10%'
        },  {
            title: '入库时间',
            key: 'start',
            dataIndex: 'start',
            width: '14%'
        },{
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        }, {
            title: 'Ni(%)',
            key: 'Ni',
            dataIndex: 'Ni',
            width: '10%'
        }, {
            title: 'Co(%)',
            key: 'Co',
            dataIndex: 'Co',
            width: '10%'
        }, {
            title: 'Mn(%)',
            key: 'Mn',
            dataIndex: 'Mn',
            width: '10%'
        }, {
            title: 'Ni(T)',
            key: 'Ni',
            dataIndex: 'Ni',
            width: '10%'
        }, {
            title: 'Co(T)',
            key: 'Co',
            dataIndex: 'Co',
            width: '10%'
        }, {
            title: 'Mn(T)',
            key: 'Mn',
            dataIndex: 'Mn',
            width: '10%'
        }]
    }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'900px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div>
                        <span><b>成本名称：</b>前驱体</span>
                        <span style={{marginLeft:"100px",display:"inlineBlock"}}><b>产品型号：</b>1001</span>
                        <span style={{marginLeft:"100px",display:"inlineBlock"}}><b>周期：</b>周</span>
                        <span style={{marginLeft:"100px",display:"inlineBlock"}}><b>期数：</b>1</span>
                    </div>
                    <div>
                        <span><b>开始时间：</b>2019-01-01</span>
                        <span style={{marginLeft:"100px",display:"inlineBlock"}}><b>结束时间：</b>2019-01-07</span>
                    </div>
                    <Divider />
                    <Table rowKey={record => record.code} dataSource={[this.props.data]} columns={this.columns}
                               size={"small"} bordered pagination={false}/>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default Detail