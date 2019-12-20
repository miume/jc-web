import React from 'react';
import {InputNumber,Button,Popover} from 'antd';
import WhiteSpace from '../../../BlockQuote/whiteSpace'
import "./difference.css"

class Difference extends React.Component{
    state = {
        visible : false,

    };
    showModal = ()=>{
        this.setState({visible: true});
    };

    handleCancel = ()=>{
        this.setState({visible : false});
    }

    handleCreate = () =>{
        this.setState({visible : false});
    }

    handleDetail = ()=>{
        console.log(this.props.value)
        this.setState({
          visible: true
        });
    }

    handleOk = () =>{
        this.setState({
            visible: false
        });
    }
    render(){
        const content = (
            <div style={{ width: '200px' }}>
                <input className='difference' type="number" placeholder="请输入数量差异"/>
                <WhiteSpace />
                <input className='difference' type="number" placeholder="请输入重量差异"/>
                <WhiteSpace />
                <span>
                <Button key="submit" type="primary" onClick={this.handleOk}>确 定</Button>&nbsp;&nbsp;&nbsp;
                <Button key="back" type="ghost" onClick={this.handleCancel}>返 回</Button>
                </span>
            </div>
        )
        return(
            <span>
                {/* <span onClick={this.handleDetail} className="blue">提交差异</span>
                <Modal title="输入差异量" visible={this.state.visible}
                    onCancel={this.handleCancel} width='213px' height='200px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}
                >
                    <div>
                        <div>
                            <InputNumber placeholder="请输入数量差异" width='191px' height='40px'/>
                            <WhiteSpace/>
                            <InputNumber placeholder="请输入重量差异" width='191px' height='40px'/>
                        </div>
                    </div>
                </Modal> */}
                <Popover
                visible={this.state.visible}
                placement="leftTop"
                onVisibleChange={this.handleDetail}
                style={{ width: '700px' }}
                content={content} title="输入差异量" trigger="click">
                <span className="blue">提交差异</span>
                </Popover>
            </span>
        )
    }
}

export default Difference
