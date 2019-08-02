import React from 'react';
import {Modal, Table} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import CancleButton from "../BlockQuote/cancleButton";

class InspectionDetailModal extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        };
        this.fetch = this.fetch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.footer = this.footer.bind(this)
    }


    fetch = () => {

    }

    /**处理一条详情记录 */
    handleDetail() {
        this.setState({visible:true,})
        const params={
            id:this.props.record,
        }
        console.log(params)
    }
    handleCancel() {
        this.setState({visible: false});
    }
    footer = () => {

    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        if(this.props.status===1){
            return(
                <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='设备巡检详情' visible={this.state.visible}
                       width="1120px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.willacolums}
                            bordered
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检项目</div>
                        <div style={{maxHeight:'150px',marginBottom:'2px',marginTop:'2px'}}>
                            <Table
                                className="eqQueryCompleted-table"
                                size="small"
                                columns={this.willbcolums}
                                bordered
                                pagination={false}
                                // style={{tr height:'10'}}
                                scroll={{ y: 150 }}
                                footer={this.footer}
                            />
                        </div>
                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检区域</div>
                        <div style={{maxHeight:'150px',marginTop:'10px'}}>
                            <Table className="eqQueryCompleted-table"
                                   size="small"
                                   columns={this.willccolumus}
                                   bordered
                                   pagination={false}
                                   scroll={{ y: 150 }}
                            />
                        </div>

                    </div>

                </Modal>
            </span>
            )}
            else if(this.props.status===2){
                return(
                    <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='设备巡检详情' visible={this.state.visible}
                       width="1120px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.doingacolums}
                            bordered
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检项目</div>
                        <div style={{maxHeight:'150px',marginBottom:'2px',marginTop:'2px'}}>
                            <Table
                                className="eqQueryCompleted-table"
                                size="small"
                                columns={this.doingbcolums}
                                bordered
                                pagination={false}
                                // style={{tr height:'10'}}
                                scroll={{ y: 150 }}
                                footer={this.footer}
                            />
                        </div>
                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检区域</div>
                        <div style={{maxHeight:'150px',marginTop:'10px'}}>
                            <Table className="eqQueryCompleted-table"
                                   size="small"
                                   columns={this.willccolumus}
                                   bordered
                                   pagination={false}
                                   scroll={{ y: 150 }}
                            />
                        </div>

                    </div>

                </Modal>
            </span>
                )
            }
        else {
            return(
                <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='设备巡检详情' visible={this.state.visible}
                       width="1120px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.acolums}
                            bordered
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检项目</div>
                        <div style={{maxHeight:'150px',marginBottom:'2px',marginTop:'2px'}}>
                            <Table
                                className="eqQueryCompleted-table"
                                size="small"
                                columns={this.bcolums}
                                bordered
                                pagination={false}
                                // style={{tr height:'10'}}
                                scroll={{ y: 150 }}
                                footer={this.footer}
                            />
                        </div>
                        <WhiteSpace />
                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>巡检区域</div>
                        <div style={{maxHeight:'150px',marginTop:'10px'}}>
                            <Table className="eqQueryCompleted-table"
                                   size="small"
                                   columns={this.ccolumns}
                                   bordered
                                   pagination={false}
                                   scroll={{ y: 150 }}
                            />
                        </div>

                    </div>

                </Modal>
            </span>
            )
        }

    }
    acolums=[{
        title:'巡检记录编号',
        key:'recordCode',
        dataIndex:'recordCode',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width:180,
    },{
        title:'所属车间',
        dataIndex:'belongShop',
        key:'belongShop',
        align:'center',
        width:140
    },{
        title:'计划名称',
        dataIndex:'planName',
        key:'planName',
        align:'center',
        width:140
    },{
        title:'巡检模板名称',
        dataIndex:'modalName',
        key:'modalName',
        align:'center',
        width:140
    },{
        title:'检查类型',
        dataIndex:'checkType',
        key:'checkType',
        align:'center',
        width:140
    },{
        title:'计划日期',
        dataIndex:'planTime',
        key:'planTime',
        align:'center',
        width:160
    },{
        title:'接单时间',
        dataIndex:'getTime',
        key:'getTime',
        align:'center',
        width:180
    },{
        title:'接单人',
        dataIndex:'getPeopleName',
        key:'getPeopleName',
        align:'center',
        width:130
    },{
        title:'完成时间',
        dataIndex:'completedTime',
        key:'completedTime',
        align:'center',
        width:180
    }
    ]
    willacolums=this.acolums.slice(0,6);
    doingacolums=this.acolums.slice(0,8);
    bcolums=[{
        title:'序号',
        key:'index',
        dataIndex:'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width:"5%",
    },{
        title:'巡检内容',
        dataIndex:'InspectionContent',
        key:'InspectionContent',
        align:'center',
        width:"50%"
    },{
        title:'巡检结果',
        dataIndex:'inspectionResult',
        key:'inspectionResult',
        align:'center',
        width:"20%"
    },{
        title:'异常原因',
        dataIndex:'reason',
        key:'reason',
        align:'center',
        width:"25%"
    }
    ]
    willbcolums=this.bcolums.slice(0,2);
    doingbcolums=this.bcolums.slice(0,2);
    ccolumns= [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width:"5%",
            height:0.5,
        },
        {
            title: '巡检位置',
            dataIndex: 'inspectionLocation',
            key: 'inspectionLocation',
            align:'center',
            width:"50%",
        },
        {
            title: '打卡时间',
            align:'center',
            key: 'visitedTime',
            dataIndex: 'visitedTime',
            width:"25%"
        }]
    willccolumus=this.ccolumns.slice(0,2)
}

export default InspectionDetailModal