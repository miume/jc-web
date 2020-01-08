import React,{Component} from 'react'
import {Select,message} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import axios from "axios";

const {Option} = Select;
class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            lineNameData: [],
            lines: []
        };
        this.search = this.search.bind(this);
        this.linesChange = this.linesChange.bind(this);
        this.periodsChange = this.periodsChange.bind(this);
        this.processIdChange = this.processIdChange.bind(this);
    }
    render() {
        let {staticPeriod,productionLineData} = this.props, {lineNameData,lineName} = this.state;
        return (
            <div className={this.props.flag?'statis-processCompare-search':'hide'}>

                <Select placeholder='请选择周期类型' style={{width:'200px',marginRight:'10px'}} onChange={this.periodsChange}>
                    {
                        staticPeriod ? staticPeriod.map(e => <Option key={e.code} value={e.code}>{e.name}</Option>) : null
                    }
                </Select>

                <Select placeholder={'请选择期数'} style={{width:'200px',marginRight:'10px'}} onChange={this.linesChange} value={lineName}
                        dropdownMatchSelectWidth={false} dropdownStyle={{width: 400}}>
                    {
                        lineNameData ?
                            lineNameData.map((e,index) =>
                                <Option key={index} value={`${e.lineName}/${e.startTime}/${e.endTime}`} disabled={e.disabled}>
                                    <div>
                                        <span style={{padding: '0 10',display:'inline-block',width: 40}}>{e.lineName}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 170}}>{e.startTime}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 170}}>{e.endTime}</span>
                                    </div>
                                </Option>
                            ) : null
                    }
                </Select>

                <Select placeholder={'请选择产线'} mode="multiple" onChange={this.processIdChange} style={{width:'200px',marginRight:'10px'}}>
                    {
                        productionLineData ? productionLineData.map(e => <Option key={e.code} value={e.code}>{e.name}</Option>) : null
                    }
                </Select>

                <NewButton name='确定' handleClick={this.search}/>

            </div>
        );
    }

    /**监控统计周期变化*/
    periodsChange(value) {
        this.setState({
            periodCode: value,
            lineNameData: [],
            lineName: undefined,
            params: {}
        });
        this.getPeriodAndTime(value);
    }

    /**监控工序变化*/
    processIdChange(value) {
        this.setState({
            lines: value
        })
    }

    /**监控期数的变化*/
    linesChange(value) {
        value = value.split('/');
        let lineName = parseInt(value[0]),
            params = {
                lineName: lineName,
                startTime: value[1],
                endTime: value[2],
            };
        this.setState({
            params,
            lineName: lineName
        })
    }

    /**根据统计周期获取周期数*/
    getPeriodAndTime(periodId) {
        let {type} = this.props,
            url = type ? `${this.props.url.productStorage.getPeriodAndTime}?peroidId=${periodId}` : `${this.props.url.rawMaterial.getPeriodAndTime}?periodId=${periodId}`;
        axios({
            url: url,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['lineName'] = res[i]['lineName'] ? res[i]['lineName'] : res[i]['periodNum'];
                }
                res.splice(0,0,{
                    "code": -1,
                    "lineName": "期数",
                    "startTime": "开始时间",
                    "endTime": "结束时间",
                    "disabled": true
                });
                this.setState({
                    lineNameData: res
                });
            }
        })
    }

    search() {
        let {periodCode,lines,params,lineName} = this.state;
        if(!periodCode || !lines.length || !lineName) {
            message.info('请选择完整条件！');
            return
        }
        params['periodCode'] = periodCode;
        this.props.search(params,lines)
    }

    componentWillUnmount() {
        this.setState(() => null);
    }
}
export default Search
