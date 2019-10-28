import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import "./checkStatistics.css"
import DepTree from "../../equipmentBasicData/equpimentAssignment/depTree";
import axios from "axios";
import {message,Calendar, Badge} from "antd";
function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}
class CheckStatistics extends React.Component{
    constructor(props){
        super(props)
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="点检统计"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div className="check-Sa" style={{padding: '15px'}} >
                    <div  className="check-Sa-tree">
                        <div  className="check-Sa-TT">
                            设备名称(请选择）
                        </div>
                        <DepTree
                            getRightData={this.getRightData}
                            url={this.url}
                            operation={this.operation}
                            handleSelect={this.handleSelect}


                        />
                    </div>


                    <div className="check-Sa-right">
                        <div className="calander">
                        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onPanelChange={this.onPanelChange}/>
                        </div>
                    </div>
            </div>
            </div>
        )
    }

    /**获取右侧数据*/
    getRightData = (code, deviceName) => {

        this.setState({
            deptCode:code
        })
        axios({
            url: `${this.url.SpotcheckPlan.getDeviceCount}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                deptId:code
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };
    onPanelChange=(value,mode)=>{
        console.log(mode);
        console.log(value);
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/statisticAnalysis'})
    }
}

export default CheckStatistics
