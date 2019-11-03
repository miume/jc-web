import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import {Button, Divider,Table, Select, Input,Tabs} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import {withRouter} from "react-router-dom";
import Storage from "./storage/storage";
import Irrigation from "./irrigation/irrigation";
import WorkShop from "./workShop/workShop";
import Consumption from "./consumption/consumption";


const {TabPane} = Tabs;
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            cycle:undefined,
            number:undefined,
            start:undefined,
            end:undefined,
            flag:"1",
            vis:"none"
        }
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
        this.setState({
            vis:"block"
        })
    }
    /**重置 */
    reset=()=>{

    }

    /**标签页切换*/
    tabChange=(key)=>{
        console.log('标签页切换为：',key)
        this.setState({
            flag: key
        });
        // if(key === '1') {
        //     this.getUnSubmittedData();
        // } else {
        //     this.getStatisticsData();
        // }
    }
    /**点击取消新增*/
    handleCancel=()=> {
        this.props.history.push({pathname: "/excipientStatistics"})
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
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}><Button style={{width:"10%"}} type="primary" onClick={this.yes}>确定</Button></span>
                        <span style={{width:"5%",display:"inlineBlock",marginLeft:"20px"}}><Button style={{width:"10%"}} onChange={this.reset}>重置</Button></span>
                    </div>
                    <br /><br />
                    <div style={{display:this.state.vis}}>
                        <Tabs defaultActiveKey={'1'} onChange={this.tabChange}>
                            <TabPane tab={'入库量'} key={'1'}>
                                <Storage/>
                            </TabPane>
                            <TabPane tab={'灌区'} key={'2'}>
                                <Irrigation/>
                            </TabPane>
                            <TabPane tab={'车间'} key={'3'}>
                                <WorkShop/>
                            </TabPane>
                            <TabPane tab={'辅料消耗量'} key={'4'}>
                                <Consumption/>
                            </TabPane>
                        </Tabs>
                    </div>
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

export default AddModal