import React from "react";
import {Layout, Menu, Breadcrumb, Icon, Card, Select, Input, Row, Col, Table} from 'antd';
import  "./eqMaintenanceDataEntry.css"
import Eqblock from "./eqblock"
import axios from "axios";
import home from '../commom/fns'
import SearchCell from '../BlockQuote/search';
import Right from './right'

class LeftLayout extends React.Component{
    operation

    constructor(props) {
        super(props);
        this.state = {
            deviceName:[],
            pageChangeFlag:0,
            datasource:[],
        }
        this.clickdeviceName=''
        this.searchEvent=this.searchEvent.bind(this)
        this.fetch=this.fetch.bind(this)
        this.changeeqname=this.changeeqname.bind(this)
        this.ffetch=this.ffetch.bind(this)
    }
    componentDidMount() {
        this.fetch( );
    }

    searchEvent(value){
        console.log({value})
            axios({
                url: `${this.url.eqMaintenanceDataEntry.getAllByDeviceName}`,
                method:'get',
                headers:{
                    'Authorization':this.url.Authorization
                },
                params:{
                    deviceName:value
                },
            }).then((data)=>{
                const res=data.data.data;
                console.log(res);
                // this.pagination.total=res.total?res.total:0;
                // this.pagination.current=res.pageNum;
                if(res){
                    // for(var i = 1; i<=res.list.length; i++){
                    //     res.list[i-1]['index']=res.prePage*10+i;
                    // }//是序号从1开始
                    this.setState({
                        loading:false,
                        deviceName:res,
                    });

                }
            });

    }
     fetch=(params = {})=>{
        axios({
            url: `${this.url.eqMaintenanceDataEntry.queryAll}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                ...params,
            },
        }).then((data)=>{
            const res=data.data.data;
            console.log(res);
            // this.pagination.total=res.total?res.total:0;
            // this.pagination.current=res.pageNum;
            if(res){
                // for(var i = 1; i<=res.list.length; i++){
                //     res.list[i-1]['index']=res.prePage*10+i;
                // }//是序号从1开始
                this.setState({
                    loading:false,
                    deviceName:res,
                });
                console.log('22222222')

            }
        });
    }
    changeeqname=( eqname)=>{
        this.clickdeviceName=eqname;
        {this.ffetch(eqname)}
    }
    ffetch=(clickdeviceName)=>{
        // if(flag)
        //     this.setState({
        //         pageChangeFlag:0,
        //         searchContent:''
        //     })
        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.getAll}`,
            method:'get',
            headers:{
                'Authorizatiton':this.url.Authorization},
            params:{
                deviceName:clickdeviceName
            },}
        ).then((data)=>{
            console.log('sssssssssss')
            const result = data.data.data
            console.log(result)
            // this.pagination.total=result?result.total:0;
            // this.pagination.current=result.pageNum;
            console.log('------------------')
            // console.log(result.pageNum)
            console.log('------------------')
            // if(result&&result.list){
            //     // for(let i=1;i<=result.list.length;i++){
            //     //     result.list[i-1]['index']=result.prePage*10+i;
            //     // }
            // }
            this.setState({
                datasource:result
            });
            // const res = data.data.data;
            // if(res&&res.list)
            // {
            //     for(var i = 1; i <= res.list.length;i++){
            //         var e = res.list[i-1];
            //         e['index'] = res.prePage*10+i
            //     }
            //     this.pagination.total = res?res.total:0;
            //     this.setState({
            //         dataSource:res.list,
            //     })
            // }
        });
    }
    render(){

        this.url = this.props.url;
        this.current=this.props.current
        const {Search} = Input;
        this.operation = this.props.operation
        return(
                <div className="eqMaintenance-DE-demo" >
                    <div className="eqMaintenance-DE-left" >
                            <div  className="eqMaintenance-eqblocka">
                                设备名称(请选择）
                            </div>
                            <Row>
                                <Col span={24} style={{paddingleft:"20px"}} >
                            <SearchCell placeholder='请输入搜索内容' onSearch={value =>this.searchEvent(value) }
                                        onChange={this.handleonChange}
                            />
                                </Col>
                            </Row>
                            {
                                this.state.deviceName.map(e=> {
                                return <Eqblock deviceName={e} changeeqname={this.changeeqname} />
                            })
                            }

                        {/*    this.props.statusCode.map(es => {*/}
                        {/*    return (*/}
                        {/*    <Select.Option key={es.code} value={es.code}>{es.name}</Select.Option>*/}
                        {/*    )*/}
                        {/*})*/}
                    </div>
                    <div className="eqMaintenance-DE-right">
                        <Right url={this.url}
                               operation={this.operation}
                               current={this.current}
                               deviceName={this.state.deviceName}
                               datasource={this.state.datasource}
                               clickdeviceName={this.clickdeviceName}
                               ffech={this.ffetch}
                               />

                    </div>
                </div>
        )

    }
}
export  default LeftLayout