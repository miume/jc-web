import React from 'react';
import {Table, Modal, Steps, Popover} from 'antd';
import WhiteSpace from '../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import "./completed.css"

const Step = Steps.Step

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
    }
    acolums=[{
        title:'序号',
        dataIndex:'index',
        key:'index',
        align:'center',
    },{
        title:'保养项目',
        dataIndex:'project',
        key:'project',
        align:'project',
    },{
        title:'保养内容',
        dataIndex:'context',
        key:'context',
        align:'context',
    },{
        title:'保养情况',
        dataIndex:'condition',
        key:'condition',
        align:'condition',
    }
    ]
    bcolums=[{
        title:'序号',
        dataIndex:'index',
        key:'index',
        align:'center',
    },{
        title:'配件名称',
        dataIndex:'name',
        key:'name',
        align:'name',
    },{
        title:'配件规格',
        dataIndex:'standards',
        key:'standards',
        align:'standards',
    },{
        title:'配件数量',
        dataIndex:'number',
        key:'number',
        align:'number',
    }
    ]
    columns= [

        {
            title: '保养单号',
            dataIndex: 'odd_number',
            key: 'odd_number',
            align:'center',
            width:130,
            height:0.5,
        },
        {
            title: '设备名称/编号',
            dataIndex: 'number',
            key: 'number',
            align:'center',
            width:130,
        },
        {
            title: '所属部门',
            align:'center',
            key: 'department',
            dataIndex: 'department',
            width:130,
        },
        {
            title: '本次计划执行日期',
            key: 'date',
            align:'center',
            dataIndex: 'date',
            width:130,
        },
        {
            title: '接单时间',
            key: 'time',
            dataIndex: 'time',
            width:130,
        },
        {
            title: '保养完成日期',
            key: 'deadline',
            dataIndex: 'deadline',
            align:'center',
            width:130,
        },
        {
            title: '保养人',
            key: 'someone',
            dataIndex: 'someone',
            align:'center',
            width:150,
        }]

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
        var adata={ };
        var bdata={ };
        const customDot = (dot,{status,index})=>(
            <Popover visible={this.state.visible1} >
                {dot}
            </Popover>
        )
        const data = [
            {
                odd_number:'by12345',
                number:'管道阀门/#1001',
                department:'制造一部',
                date:'2019-07-18',
                time:'2019-07-17 10:00',
                deadline:'2019-8-17',
                someone:'ww',
            }]
      var adata=[{
          index:1,
          project:'管道阀门',
          context:'畅通、不漏液',
          condition:'异常',
      }]
        var bdata=[{
            index:1,
            name:'配件名称',
            standards:'配件规格',
            number:'配件数量',
        }]
        return(
            <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='保养工单详情' visible={this.state.visible}
                       width="1020px"
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table className="table" size="small" columns={this.columns} dataSource={data} bordered  pagination={false}/>
                        <WhiteSpace />
                        <Steps size="small" current={1} progressDot={customDot}>
                            <Step title="制定计划" description="本次计划执行日期：2012年01月01日" />
                            <Step title="已接单" description="2012年01月01日 22:12:10" />
                            <Step title="已完成" description="2012年01月01日 22:12:10" />
                        </Steps>
                         <Table className="table" size="small" columns={this.acolums} dataSource={adata} bordered pagination={false}
                             footer={() => '1，15日白班9:20，硫酸管道阀门漏，10:00维修好后正常使用。'}
                         />
                        <div className="title">配件使用</div>
                         <Table className="table"
                            size="small" columns={this.bcolums} dataSource={bdata} bordered pagination={false}
                         />
                    </div>

                </Modal>
            </span>
        )
    }
}

export default Detail