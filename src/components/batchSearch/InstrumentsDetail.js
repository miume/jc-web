import React from 'react';
import {Modal, message, Spin, Table} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import "./batchSearch.css"
import {datas, SearchDetailColums1, SearchDetailColums2, SearchDetailColums3,InstrumentDetailColums} from "../batchInfo/colums";

class InstrumentsDetail extends React.Component{
    url=JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }
    /**处理一条详情记录 */
    handleDetail() {
        const params={
            id:this.props.record.key,
        };
        console.log(params);
        // axios({
        //     url:this.url.devicePatrolQuery.PatrolQueryDetail,
        //     method:"get",
        //     header:{
        //         'Authorization': this.url.Authorization
        //     },
        //     params:params,
        // }).then((data)=>{
        //     //console.log(data);
        //     const result=data.data.data?data.data.data:[];
        //     if(data.data.code===0){
        //         message.info(data.data.message);
        this.setState({visible:true,})
        //     }
        //     else{
        //         message.info("网络错误")
        //     }
        // })
    }
    handleCancel() {
        this.setState({visible: false});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal
                    title='批次追溯-仪器仪表数据详情'
                    visible={this.state.visible}
                    width="600px"
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,]}
                >
                    <div style={{height:"480px"}}>
                        <div style={{margin:"15px"}}>
                            <h4 style={{display:"inline",marginLeft:"15px",marginRight:"100px"}}>批次信息: {this.props.record.batchInfo}</h4>
                            <h4 style={{display:"inline"}}>合成槽号: {this.props.record.Number}</h4>
                        </div>
                        <hr/>
                        <Table
                            className={"InstrumentDetailModal"}
                            columns={InstrumentDetailColums}
                            bordered={true}
                            scroll={{y:160}}
                            dataSource={datas}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
}
export default InstrumentsDetail