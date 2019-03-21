import React from 'react';
import {Modal,Table} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import axios from 'axios';
import "./difference.css";
import CancleButton from "../BlockQuote/cancleButton";

class Detail extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            data : [],
            data1 : ''
        }
        this.server = localStorage.getItem("remote");
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.fetch = this.fetch.bind(this);
    }
    fetch = (id) => {
        axios({
            url:`${this.url.processManagement.deleteByIds}/`+parseInt(id),
            method:"GET",
        }).then((data) => {
            const res = data.data.data;
            if(res){
                this.setState({
                    data : res.details,
                    data1 : res.commonBatchNumber.description
                })
            }
        })
    }
    /**处理一条详情记录 */
    handleDetail() {
        this.fetch(this.props.value.commonBatchNumber.id)
        this.setState({
          visible: true
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.visible}
                // className='modal-md'
                width="360px"
                closable={false} centered={true}
                maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                    ]}>
                    <div>
                         <div className='Pdescription'>{this.state.data1}</div>
                         <WhiteSpace />
                         <div id="edit" style={{height:'360px'}}>
                         {this.state.data.map( e =>
                             <div>
                                 <span className='Pname'>{e.personName}</span>
                                 <span className='Pres'>{e.responsibility}</span>
                             </div>
                         )}
                         </div>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default Detail
