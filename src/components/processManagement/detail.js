import React from 'react';
import {Modal,Button,Input,Table,Form} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace'

const columns = [{
        title: '负责人',
        dataIndex: 'personName' ,
        key: 'personName',
        width: '30%',
        align:'center',
      },{
        title: '职责',
        dataIndex: 'responsibility' ,
        key: 'responsibility',
        width: '30%',
        align:'center',
}]

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    /**处理一条详情记录 */
    handleDetail() {
        console.log(this.props.value)
        this.setState({
          visible: true
        });
    }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    render(){
        return(
            <span>
                <a onClick={this.handleDetail} >详情</a>
                <Modal title='详情' visible={this.state.visible}
                    onCancel={this.handleCancel} width='1000px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                         <div>
                             流程名称：<Input value={this.props.value.name} style={{width:300}} disabled={true}/>
                             <WhiteSpace />
                             所属工艺：<Input value={"xxx的工艺"} style={{width:300}} disabled={true}/>
                         </div>
                         <WhiteSpace />
                         <Table columns={columns} size='small' pagination={false} bordered dataSource={this.props.value.taskPersonList}></Table>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default Detail