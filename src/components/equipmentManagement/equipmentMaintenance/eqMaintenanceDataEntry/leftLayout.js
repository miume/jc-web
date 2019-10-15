import React from "react";
import {Card, message, Spin} from 'antd';
import "./eqMaintenanceDataEntry.css"
import Eqblock from "../../equipmentBasicData/equpimentAssignment/eqblock";
import axios from "axios";
import Right from './right'

class LeftLayout extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    operation

    constructor(props) {
        super(props);
        this.state = {
            deviceName:[],      //点击设备名称
            dataSource:[],      //根据设备名称查询的表格数据
            deviceData: [],     //所有设备数据
            loading: true,      //表示左边树的加载情况
            tableLoading: true, //表格数据的加载情况
        }
        this.fetch = this.fetch.bind(this);
        this.changeEqName = this.changeEqName.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
        this.fetch( );
    }

    /**获取所有设备名称*/
    fetch() {
        axios({
            url: `${this.url.eqMaintenanceDataEntry.queryAll}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            const res=data.data.data;
            let deviceName = res && res[0] ?res[0] : '';
            this.setState({
                loading:false,
                deviceData:res,
                deviceName: deviceName
            });
            this.getTableData({
                deviceName: deviceName
            });
        }).catch(()=>{
            message.info('获取数据失败，请联系管理员！')
        });
    }

    /**切换设备名称 然后根据设备名称更新表格数据*/
    changeEqName(name) {
        this.setState({
            deviceName :name
        })
        this.getTableData({
            deviceName: name
        });
    }

    /**根据设备名称查询表格数据*/
    getTableData(params = {}) {
        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.page}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params: params
        }).then((data)=>{
            const result = data.data.data;
            if(result && result.list){
                for(let i = 1;i <= result.list.length; i++){
                    result.list[i-1]['index']=(result.page-1) * 10 + i;
                    let temp = result.list[i-1]['optType'];
                    result.list[i-1]['optType'] = temp ? '录入' : '勾选';
                }
            }
            this.setState({
                dataSource:result.list,
                tableLoading: false
            });
        }).catch(()=>{
            message.info('获取表格数据失败，请联系管理员！')
        });
    }

    render(){
        this.url = this.props.url;
        this.current=this.props.current
        this.operation = this.props.operation
        return(
                <div className="eqMaintenance-DE-demo" >
                    <Spin spinning={this.state.loading} wrapperClassName='eqMaintenance-DE-left'>
                        <Card
                            bordered={false}
                            style={{width: "100%",height: '100%'}}
                            className='departmentCard'
                            headStyle={{height:'10%'}}
                            bodyStyle={{height:'90%',padding: '6px 12px 0 12px',overflow:'auto'}}
                            title={`设备名称(请选择)`}>
                            <div>
                                {
                                    this.state.deviceData.map(e => {
                                        return <Eqblock key={e} id={e}  colorFlag={e === this.state.deviceName ? "equipment-button ed-blue" : "equipment-button ed-grey"}
                                                        deviceName={e} changeEqname={this.changeEqName} />
                                    })
                                }
                            </div>
                        </Card>
                    </Spin>
                    <div className="eqMaintenance-DE-right">
                        <Right url={this.url}
                               operation={this.operation}
                               current={this.current}
                               deviceData={this.state.deviceData}
                               dataSource={this.state.dataSource}
                               deviceName={this.state.deviceName}
                               getTableData={this.getTableData}
                               fetch={this.fetch}
                               handleTableChange={this.handleTableChange}
                               />
                    </div>
                </div>
        )

    }
}
export  default LeftLayout
