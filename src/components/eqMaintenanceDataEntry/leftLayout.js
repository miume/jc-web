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
            searchContent:'',
            firstdeviceName:'',
            deviceDatas: []
        }
        this.clickdeviceName=''
        this.searchEvent=this.searchEvent.bind(this)
        this.fetch=this.fetch.bind(this)
        this.changeeqname=this.changeeqname.bind(this)
        this.ffetch=this.ffetch.bind(this)
        this.searchContentChange=this.searchContentChange.bind(this)
        this.handleTableChange=this.handleTableChange.bind(this)
        this.pagination = {
            showSizeChanger: true,
            itemRender(current, type, originalElement){
                if (type === 'prev') {
                    return <a>&nbsp;&nbsp;上一页&nbsp;&nbsp;</a>;
                }
                if (type === 'next') {
                    return <a>&nbsp;&nbsp;下一页&nbsp;&nbsp;</a>;
                }
                return originalElement;
            },
            showTotal(total){
                return `共${total}条记录`
            },

        };

    }
    componentDidMount() {
        this.fetch( );
        // this.ffetch(this.state.firstdeviceName)
    }

    searchEvent=()=>{
        console.log(this.state.searchContent)
            axios({
                url: `${this.url.eqMaintenanceDataEntry.getAllByDeviceName}`,
                method:'get',
                headers:{
                    'Authorization':this.url.Authorization
                },
                params:{
                    deviceName:this.state.searchContent
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
                    },()=>{
                        console.log(this.state.deviceName)
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
                var deviceDatas = []
                for(var i=0; i<res.length; i++){
                    if(i===0){
                        deviceDatas.push({
                            deviceName: res[i],
                            colorFlag:true
                        })
                    }else{
                        deviceDatas.push({
                            deviceName: res[i],
                            colorFlag:false
                        })
                    }
                }
                // }//是序号从1开始
                this.setState({
                    loading:false,
                    deviceDatas:deviceDatas,
                });

                this.ffetch(res[0])

                console.log('22222222')

            }
        });
    }
    changeeqname=( eqname)=>{
        this.clickdeviceName=eqname;
        var deviceDatas = this.state.deviceDatas
        for (var i=0; i< deviceDatas.length; i++){
            if(deviceDatas[i].deviceName===eqname){
                deviceDatas[i].colorFlag = true
            }else{
                deviceDatas[i].colorFlag = false
            }
        }
        this.setState({
            deviceDatas:deviceDatas
        },()=>{
            this.ffetch(eqname)
        })
    }
    ffetch=(clickdeviceName)=>{
        // if(flag)
        //     this.setState({
        //         pageChangeFlag:0,
        //         searchContent:''
        //     })
        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.page}`,
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
            this.pagination.total=result?result.total:0;
            this.pagination.current=result.page;
            console.log('------------------')
             console.log(result.page)
            console.log('------------------')
            if(result&&result.list){
                for(let i=1;i<=result.list.length;i++){
                    result.list[i-1]['index']=(result.page-1)*10+i;
                    console.log(result.page)
                    console.log(result.list[i-1]['index'])
                }
            }
            this.setState({
                datasource:result.list
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
    handleTableChange(pagination){
        this.pagination = pagination;
        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.page}`,
            method:'get',
            headers:{
                'Authorizatiton':this.url.Authorization},
            params:{
                deviceName: this.clickdeviceName,
                size:pagination.pageSize,
                page:pagination.current
            },}
        ).then((data)=>{
            console.log('sssssssssss')
            const result = data.data.data
            console.log(result)
            this.pagination.total=result?result.total:0;
            this.pagination.current=result.page;
            console.log('------------------')
            console.log(result.page)
            console.log('------------------')
            if(result&&result.list){
                for(let i=1;i<=result.list.length;i++){
                    result.list[i-1]['index']=(result.page-1)*10+i;
                    console.log(result.page)
                    console.log(result.list[i-1]['index'])
                }
            }
            this.setState({
                datasource:result.list
            })
        });
    }

    searchContentChange=(e) =>{
        const value = e.target.value;
        this.setState({searchContent:value});
        if(this.searchContent===null){
            this.fetch();
        }
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
                                <Col span={24} style={{paddingLeft:"10px",paddingRight:'10px'}} >
                                    <Search

                                        placeholder="请输入设备名称"
                                        onSearch={this.searchEvent}
                                        onChange={this.searchContentChange}
                                    />
                                </Col>
                            </Row>
                            {
                                this.state.deviceDatas.map(e=> {
                                    console.log(e)
                                return <Eqblock  colorFlag={e.colorFlag?"ed-blue":"ed-grey"} deviceName={e.deviceName} changeeqname={this.changeeqname} />
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
                               ffetch={this.ffetch}
                               fetch={this.fetch}
                               pagination={this.pagination}
                               handleTableChange={this.handleTableChange}
                               />

                    </div>
                </div>
        )

    }
}
export  default LeftLayout