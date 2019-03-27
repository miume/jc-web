import React from 'react';
import { Button, Modal,Form, Input,message,Icon,DatePicker, Col, Row } from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../BlockQuote/cancleButton";
import "./equiptment.css";
import Preview from './preview'

class Detail extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            data:[],
            name:'',
            time:'',
            previewVisible:false,
            previewImage: '',
        };
        this.fetch = this.fetch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.previewCancel = this.previewCancel.bind(this);
        this.previewPreview = this.previewPreview.bind(this);
    }
    
    fetch = (id) => {
        axios({
            url:`${this.url.instructor.instructorAll}/`+ parseInt(id),
            method:"GET",
        }).then((data) => {
            const res = data.data.data;
            if(res){
                this.setState({
                    data : res.content,
                    name : res.instructorName,
                    time : res.effectiveDate
                })
            }
        })
    }

    previewPreview = (e,src) =>{
        // console.log(e,src)
        this.setState({
            previewImage: e,
            previewVisible: true,
        })
    }
    previewCancel = () =>{
        this.setState({ previewVisible: false })
    }

    /**处理一条详情记录 */
    handleDetail() {
        this.fetch(this.props.batchNumberId)
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
                    width="600px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                    ]}
                >
                    <div>
                        <span className='Eqname'>{this.state.name}</span>
                        <span className='Eqtime'>{this.state.time}</span>
                        <WhiteSpace />
                        <div id="Eqedit" style={{height:'360px'}}>
                        {this.state.data.map(e=>
                             <div key={e.id}>
                                 <span className='Eqcontent'>{e.checkContent}</span>
                                 <span className='Eqstandard'>{e.checkStandard}</span>
                                 <span className='Eqfrequency'>{e.checkFrequency}</span>
                                 <img style={{cursor:'pointer'}} onClick={this.previewPreview.bind(this,`http://2p277534k9.iok.la:58718/jc/common/equipmentInstructor/pic/${e.checkPointPicName}`)} alt="图片未显示" className='Eqpicture' src={`http://2p277534k9.iok.la:58718/jc/common/equipmentInstructor/pic/${e.checkPointPicName}`} />
                                 <Preview previewVisible={this.state.previewVisible} previewImage={this.state.previewImage} previewCancel={this.previewCancel}/>
                             </div>
                         )}
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default Detail