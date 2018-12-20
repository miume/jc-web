import React from 'react';
import axios from 'axios';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import './interProduct.css';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `g/mL`,
    });
}

class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            detailData:[],
        };
        this.handleDetail = this.handleDetail.bind(this);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleDetail} >详情</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'415px'}}  onClick={this.handleCancel}>返回</Button>,
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            url={this.props.url}
                            data={this.state.detailData}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
        this.setState({
            visible: true,
        });
    }
    /**通过id查询详情 */
    getDetailData(){
        axios.get(`${this.props.url.intermediateProduct.details}?id=${this.props.id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const details = data.data.data;
            console.log(details)
            this.setState({
                detailData:details,
            })
        })
    }
}

export default DetailSpan;