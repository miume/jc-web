import React from 'react';
import {Modal,Table} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import "./batchSearch.css"
import AllTester from '../../BlockQuote/allTester';
import IsQualified from "../../BlockQuote/isQualified";
import {
    datas,
    AssayDetailColums,
    AssayDetailColums2
} from "../batchInfo/colums";

class AssayDetail extends React.Component{
    url=JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            sampleName:'sampleName',
            SecondTableData:[],

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
                    title='批次追溯-化验数据详情'
                    visible={this.state.visible}
                    width="600px"
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,]}
                >
                    <div>
                        <Table
                            className={"firstAssayDetailTable"}
                            columns={AssayDetailColums2}
                            bordered={true}
                            size={"small"}
                        />
                        <div style={{margin:"15px"}}>
                            <h4>样品名称: {this.props.record.batchInfo}</h4>
                        </div>
                        <Table
                            className={"secondAssayDetailTable"}
                            columns={AssayDetailColums}
                            bordered={true}
                            scroll={{y:100}}
                            dataSource={datas}
                            size={"small"}
                        />
                         <hr/>
                        <div>
                             <div style={{display:"inline-block",marginLeft:"15px"}}>
                                <h4>检验人: {this.props.record.batchInfo}</h4>
                                <h4>检验日期： {this.props.record.batchInfo}</h4>
                            </div>
                                <IsQualified
                                    style={{display:"inline-block"}}
                                    status={1}
                                />

                        </div>
                        <hr/>
                        <div style={{margin:"15px"}}>
                            <AllTester  />
                            {/*<h4>审核人: {this.props.record.batchInfo}</h4>*/}
                            {/*<h4>审核意见: {this.props.record.batchInfo}</h4>*/}
                            {/*<h4>审核日期: {this.props.record.batchInfo}</h4>*/}
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
}
export default AssayDetail
