import React,{Component} from 'react'
import {Select,DatePicker, message} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option} = Select, {RangePicker} = DatePicker;

class Search extends Component {//工序对比分析
    constructor(props){
        super(props);
        this.state = {
            processId: '',
            periodCode: ''
        };
        this.search = this.search.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.periodsChange = this.periodsChange.bind(this);
        this.processIdChange = this.processIdChange.bind(this);
    }
    render() {
        let {staticPeriod,processData,productionLineData} = this.props;
        return (
            <div className={'statis-processCompare-search'}>
                <Select placeholder='请选择周期类型' style={{width:'200px',marginRight:'10px'}} onChange={this.periodsChange}>
                    {
                        staticPeriod ? staticPeriod.map(e => <Option key={e.code} value={e.code}>{e.name}</Option>) : null
                    }
                </Select>

                {
                    processData ?
                        <Select placeholder={'请选择区域'} onChange={this.processIdChange} style={{width:'200px',marginRight:'10px'}}>
                            {
                                processData ? processData.map(e => <Option key={e.code} value={e.code}>{e.processName}</Option>) : null
                            }
                        </Select> :

                        <Select placeholder={'请选择产线'} onChange={this.processIdChange} style={{width:'200px',marginRight:'10px'}}>
                            {
                                productionLineData ? productionLineData.map(e => <Option key={e.code} value={e.code}>{e.name}</Option>) : null
                            }
                        </Select>
                }


                <RangePicker placeholder={['开始时间','结束时间']} style={{width:300,marginRight:'10px'}} onChange={this.timeChange}></RangePicker>
                <NewButton name='确定' handleClick={this.search}/>
            </div>
        );
    }

    timeChange(date,dateString) {
        this.setState({
            startTime: dateString[0],
            endTime: dateString[1]
        })
    }

    periodsChange(value) {
        this.setState({
            periodCode: value
        })
    }

    processIdChange(value) {
        this.setState({
            processId: value
        })
    }

    search() {
        let {processId,periodCode,startTime,endTime} = this.state,
            params = {
                periodCode,
                startTime: startTime + ' 00:00:00',
                endTime: endTime + ' 00:00:00'
            };
        if(!processId || !periodCode || !startTime || !endTime) {
            message.info('请选择完整！');
            return;
        }
        this.props.search(params,processId)
    }
}
export default Search
