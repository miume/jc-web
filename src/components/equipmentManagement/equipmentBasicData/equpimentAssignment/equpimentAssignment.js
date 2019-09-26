import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {message} from "antd";
import Eqblock from "./eqblock";
import './equpimentAssignment.css'
import SearchCell from "../../../BlockQuote/search";
import Allocation from './allocation'
import RightTable from './RightTable'
import axios from "axios";
import home from "../../../commom/fns";
class EqupimentAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            processData:[],
            TableDataSource:[],
            clickName:'',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
        }
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
    }

    componentDidMount() {
        this.fetch()
    }

    render() {

        this.url = JSON.parse(localStorage.getItem('url'));
        const baseData = JSON.parse(localStorage.getItem('baseData'));
        const current = JSON.parse(localStorage.getItem('current'));
        const menus = JSON.parse(localStorage.getItem('menus'))
        const operation = menus?menus.filter(e=>e.path===current.path)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === baseData.path)[0].operations;

        return (

            <div>
                <Blockquote menu={current.menuParent} name="设备工序分配" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className="equip-total">
                    {/*左边菜单栏 */}
                <div className="equpiment-left" >
                        <div  className="equpiment-eqblocka">
                        设备名称(请选择）
                        </div>
                    <div className="eqa-eqb">
                       {
                        this.state.processData.map(e=> {
                            // console.log(e)
                            return <Eqblock  colorFlag={e.colorFlag?"ed-blue":"ed-grey"} deviceName={e.deviceName} changeeqname={this.changeeqname} />
                        })
                       }
                    </div>
                </div>

                    {/*右边表格*/}
                    <div className="equpiment-right">
                        {/*分配按钮 */}
                        <Allocation processData={this.state.processData} url={this.url} clickName={this.state.clickName}/>

                        {/*搜索模块*/}
                        <SearchCell
                            name='计划编号/设备编号...'
                            flag={home.judgeOperation(this.operation, 'QUERY')}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.searchReset}
                        />

                        {/*表格模块*/}
                        <RightTable DataSource={this.state.TableDataSource}  pagination={this.pagination} handleTableChange={this.handleTableChange}/>

                    </div>



                </div>
            </div>
        )
    }
    /**左边点击切换页面 */  /**-------需要输入参数部分*/
    changeeqname = (e) =>{
        // console.log(this.clickdeviceName)
        var processData = this.state.processData
        for (var i=0; i< processData.length; i++){
            if(processData[i].deviceName===e){
                processData[i].colorFlag = true
            }else{
                processData[i].colorFlag = false
            }
        }
        this.setState({
            processData:processData
        })
        //需要输入参数
        this.getTabledata()
    }
    /**获取左边数据*/
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
            if(res){
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
                    processData:deviceDatas,
                    clickName:res[0]
                });

                // 默认调用第一个工序内数据
                this.getTabledata()
            }
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }

    /**获取右边表格数据*/ /**-------需要输入参数部分*/
    getTabledata=(params,flag)=>{
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        }
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
            // 调整数据格式即可
            if(res){
                var fakedataSource=[];
                for(var i=0;i<20;i++)
                {
                    fakedataSource.push({
                        code:i,
                        Deptcode:i,
                        index:i+1,
                        Fixedassetscode:i,
                        Devicename:'fake1',
                        specification:'222-111',
                        IDcode:i,
                        startdate:'2019-8-16',
                        status:'运行',
                        name:'运行',
                        color:'green',
                    })
                }
                this.setState({
                    TableDataSource:fakedataSource
                })
            }

        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }
    /**分页和查询*/       /**-------需要输入参数部分*/
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        //需要根据接口输入参数
        if (pageChangeFlag) {
            this.getTabledata({
                size: pagination.pageSize,
                page: pagination.current,
                condition: this.state.searchContent,
            })
        } else {
            this.getTabledata({
                size: pagination.pageSize,
                page: pagination.current,
            })
        }
    };
    /**重置搜索调用*/    /**-------需要输入参数部分*/
    searchReset = () => {
        //需要输入参数，参数为默认的第一个工序
        this.getTabledata({
        }, 1)
    }
    /**搜索*/           /**-------需要输入参数部分*/
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        })
        //需要根据接口输入参数
        this.getTabledata({
            condition: this.state.searchContent,

        });
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }
    /**搜索框回调函数*/
    searchContentChange=(value)=>{
        this.setState({
            searchContent:value
        })
    }
}
export default EqupimentAssignment
