import React from 'react';
import {Input, Modal, Rate} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import AddButton from '../../BlockQuote/newButton';
import WhiteSpace from '../../BlockQuote/whiteSpace';

class RateNum extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible : false
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }
    handleDetail(){
        this.setState({
            visible:true,
        });
    }
    handleCancel() {
        this.setState({
        visible: false,
        });
    }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    onRate = (e) =>{
        console.log(e)
    }
    render(){
        const { TextArea } = Input;
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">评分</span>
                <Modal
                    title="评价维修情况"
                    visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width="300px"
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        <AddButton key="submit" handleClick={this.handleOk} name="确定" className='fa fa-check'/>
                    ]}>
                        <div style={{height:'400px'}}>
                            设备维修完好性 <Rate onChange={this.onRate}/>
                            维修及时性 <Rate />
                            维修后现场清理 <Rate />
                            维修服务态度 <Rate />
                            <WhiteSpace />
                            <TextArea autosize={{minRows:7}}/>
                        </div>
                </Modal>
            </span>
        )
    }
}

export default RateNum
