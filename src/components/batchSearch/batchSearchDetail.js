import React from 'react';
import {Modal, message, Tabs, Spin, Table} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import "./batchSearch.css"
import {datas, SearchDetailColums1, SearchDetailColums2, SearchDetailColums3} from "../batchInfo/colums";

class BatchDetailModal extends React.Component{
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
    returnEquKey = key => {
        if(key==='1'||key==='2'||key==='3'){
            console.log(key);
            // this.setState({
            // //
            // },()=>{
            // //
            // })
        }

    };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
            return(
                <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal
                    title='批次追溯信息'
                    visible={this.state.visible}
                    width="1200px"
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,]}
                >
                    <div style={{minHeight:"500px"}}>
                        <Tabs onChange={this.returnEquKey}>
                            <Tabs.TabPane key={1} tab={(<b>仪器仪表数据</b>)}>
                                <Table
                                    columns={SearchDetailColums1}
                                    size={"small"}
                                    bordered={true}
                                    dataSource={datas}
                                    scroll={{y:360}}

                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key={2} tab={(<b>设备维修保养数据</b>)}>
                                <Table
                                    columns={SearchDetailColums2}
                                    size={"small"}
                                    bordered={true}
                                    dataSource={datas}
                                    scroll={{y:360}}

                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key={3} tab={(<b>化验数据</b>)}>
                                <Table
                                    columns={SearchDetailColums3}
                                    size={"small"}
                                    bordered={true}
                                    dataSource={datas}
                                    scroll={{y:360}}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </Modal>
            </span>
            )
    }
}
export default BatchDetailModal