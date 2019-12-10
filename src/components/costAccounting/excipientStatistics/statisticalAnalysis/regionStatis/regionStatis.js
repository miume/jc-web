import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Search from '../producuLineStatis/productLineSearch'

class ProcessStatis extends Component{//工序统计
    constructor(props) {
        super(props);
        this.state = {
            periodCode: ''
        };
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'周期类型',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'期数',
            dataIndex:'period',
            key:'period'
        },{
            title:'开始时间',
            dataIndex:'beginTime',
            key:'beginTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'区域',
            dataIndex:'region',
            key:'region'
        },{
            title:'小计(T)',
            dataIndex:'count',
            key:'count'
        },{
            title:'氨量(T)',
            dataIndex:'Nimetal',
            key:'Nimetal'
        },{
            title:'碱量(T)',
            dataIndex:'Cometal',
            key:'Cometal'
        }]
    }
    render() {
        let {staticPeriod} = this.props, {periodCode} = this.state;;
        return (
            <div className='rightContent-Div'>
                <Search flag={true} staticPeriod={staticPeriod} periodCode={periodCode}/>
                <Table
                columns={this.columns}
                size='small'
                bordered/>
            </div>
        );
    }

    componentDidMount() {
        let {staticPeriod} = this.props;
        if(staticPeriod.length) {
            this.setState({
                periodCode: staticPeriod[0].code
            })
        }
    }

    periodsChange(value) {
        console.log(value)
        this.setState({
            periodCode: value
        })
    }
}
export default ProcessStatis;
