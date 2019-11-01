import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import {Button, Divider,Table, Select, Input} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import {withRouter} from "react-router-dom";


class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[{
                index:1,
                name:"前驱体",
                model:10001,
                batch:102,
                time:"2019-01-07",
                weight:70,
                Ni:5,
                Co:5,
                Mn:5
            }],
            cycle:undefined,
            periods:undefined,
            startTime:undefined,
            endTime:undefined,
        };
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '11.11%',
        },{
            title: '成品名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '11.11%',
        },{
            title: '产品型号',
            dataIndex: 'model',
            key: 'model',
            align:'center',
            width: '11.11%',
        },{
            title: '批号',
            dataIndex: 'batch',
            key: 'batch',
            align:'center',
            width: '11.11%',
        },{
            title: '入库时间',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            width: '11.11%',
        },{
            title: '重量(T)',
            dataIndex: 'weight',
            key: 'weight',
            align:'center',
            width: '11.11%',
        },{
            title: 'Ni(%)',
            dataIndex: 'Ni',
            key: 'Ni',
            align:'center',
            width: '11.11%',
        },{
            title: 'Co(%)',
            dataIndex: 'Co',
            key: 'Co',
            align:'center',
            width: '11.11%',
        },{
            title: 'Mn(%)',
            dataIndex: 'Mn',
            key: 'Mn',
            align:'center',
            width: '11.11%',
        }]
    };
    /**周期 */
    cycleChange = (data)=>{
        this.setState({
            cycle:data
        })
    }
    /**期数 */
    periodsChange = (data)=>{
        this.setState({
            periods:data.target.value
        })
    }
    /** 开始时间*/
    startChange=(data)=>{
        this.setState({
            startTime:data.target.value
        })
    }
    /**结束时间 */
    endChange=(data)=>{
        this.setState({
            endTime:data.target.value
        })
    }
    /**确定 */
    yes=()=>{

    }
    /**重置 */
    reset=()=>{

    }
    /**入库单获取 */
    require=()=>{

    };

    /**点击取消新增*/
    handleCancel=()=> {
        this.props.history.push({pathname: "/productStorage"})
    };

    /**点击保存新增*/
    handleSave=()=>{
        this.handleCancel();
    };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据';
        return(
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-content'}>
                    <div>
                        <span style={{width:"5%",display:"inlineBlock"}}>周期：<Select style={{width:"10%"}} onChange={this.cycleChange} placeholder="请选择周期" value={this.state.cycle}><Select.Option value="0">周</Select.Option>
                        <Select.Option value="1">月</Select.Option>
                        <Select.Option value="2">年</Select.Option>
                        </Select>
                        </span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}>期数：<Input style={{width:"10%"}} value={this.state.periods} onChange={this.periodsChange} placeholder="请输入期数"/></span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}>开始时间：<Input style={{width:"10%"}} value={this.state.startTime} onChange={this.startChange} placeholder="请选择时间"/></span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}>结束时间：<Input style={{width:"10%"}} value={this.state.endTime} onChange={this.endChange} placeholder="请选择时间"/></span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}><Button style={{width:"10%"}} type="primary" onChange={this.yes}>确定</Button></span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}><Button style={{width:"10%"}} onChange={this.reset}>重置</Button></span>
                    </div>
                    <br /><br />
                    <Button type="primary" onChange={this.require}>入库单获取</Button>
                    <br /><br />
                    <Table pagination={this.pagination} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                    <Divider type="horizontal"/>
                    <div className='raw-material-add-footer-bottom'>
                        <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                        <div>
                            <SaveButton key='save'/>
                            <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleSave}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddModal)