import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {Card, message, Spin} from "antd";
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
            tableDataSource:[],  //存取根据工序id，条件模糊查询所有设备的结果
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            loading: true,      //左菜单加载
            tableFlag: true,    //右表格加载
            clickId: -1,        //表示被点击的设备id
            clickName: ''       //表示被点击设备的名称
        }
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
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
                    <Spin spinning={this.state.loading} wrapperClassName='equipment-left'>
                        <Card
                            bordered={false}
                            style={{width: "100%",height: '100%'}}
                            className='departmentCard'
                            headStyle={{height:'10%'}}
                            bodyStyle={{height:'90%',padding: '6px 12px 0 12px',overflow:'auto'}}
                            title={`所属工序`}>
                            <div>
                                {
                                    this.state.processData.map(e=> {
                                        return <Eqblock key={e.code} id={e.code}  colorFlag={e.code === parseInt(this.state.clickId)?"equipment-button ed-blue":"equipment-button ed-grey"}
                                                        deviceName={e.ruleValue} changeEqname={this.changeEqname} />
                                    })
                                }
                            </div>
                        </Card>
                    </Spin>

                    {/*右边表格*/}
                    <Spin spinning={this.state.tableFlag} wrapperClassName='equipment-right'>
                        {/*分配按钮 */}
                        <Allocation url={this.url} clickId={this.state.clickId} clickName={this.state.clickName} />

                        {/*搜索模块*/}
                        <SearchCell
                            name='计划编号/设备编号...'
                            flag={home.judgeOperation(this.operation, 'QUERY')}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.searchReset}
                        />

                        {/*表格模块*/}
                        <RightTable dataSource={this.state.tableDataSource}  pagination={this.pagination} handleTableChange={this.handleTableChange}/>
                    </Spin>
                </div>
            </div>
        )
    }
    /**左边点击切换页面 */  /**-------需要输入参数部分*/
    changeEqname = (code,deviceName) =>{
        this.setState({
            clickId:code,
            clickName: deviceName
        })
        //需要输入参数
        this.getTableData({
            proId: code
        })
    }
    /**获取左边数据*/
    fetch=(params = {})=>{
        axios({
            url: `${this.url.deviceProcess.getAll}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                ...params,
            },
        }).then((data)=>{
            const res=data.data.data;
            let {clickId,clickName} = this.props;
            if(res && res.length){
                for(var i = 0; i < res.length; i++){
                    res[i]["index"] = i + 1;
                    if( i === 0 ) {
                        clickId = res[i].code;
                        clickName = res[i].ruleValue;
                    }
                }
                this.setState({
                    loading:false,
                    processData:res,
                    clickId : clickId,
                    clickName: clickName
                });

                // 默认调用第一个工序内数据
                this.getTableData({
                    proId: clickId
                })
            }
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }

    /**获取右边表格数据*/ /**-------需要输入参数部分*/
    getTableData = (params,flag) => {
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        }
        axios({
            url: `${this.url.deviceProcess.getDeviceByProIdByPage}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params: params
        }).then((data)=>{
            const res=data.data.data;
            let tableDataSource = [], resList = res.list;
            this.pagination.total=res?res.total:0;
            if(resList && resList.length) {
                tableDataSource = this.dataProcessing(res);
            }
            this.setState({
                tableDataSource:tableDataSource,
                tableFlag: false
            })
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }

    /**数据处理*/
    dataProcessing = (res) => {
        const tableDataSource = [], resList = res.list;
        for(let i = 0;i < resList.length; i++) {
            let temp = resList[i];
            tableDataSource.push({
                index: (res.page - 1) * 10 + i + 1,
                deptName: temp.deptName,
                color: temp.color,
                code: temp.productionProcessDeviceMap.code,
                status: temp.status,
                idCode: temp.productionProcessDeviceMap.idCode,
                deptCode: temp.productionProcessDeviceMap.deptCode,
                ruleValue: temp.productionProcessDeviceMap.ruleValue,
                startDate: temp.productionProcessDeviceMap.startDate,
                deviceName: temp.productionProcessDeviceMap.deviceName,
                deviceCode: temp.productionProcessDeviceMap.deviceCode,
                specification: temp.productionProcessDeviceMap.specification,
                ruleDetailCode: temp.productionProcessDeviceMap.ruleDetailCode,
                fixedassetsCode: temp.productionProcessDeviceMap.fixedassetsCode
            })
        }
        return tableDataSource;
    }

    /**分页和查询*/       /**-------需要输入参数部分*/
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        //需要根据接口输入参数
        if (pageChangeFlag) {
            this.getTableData({
                proId: this.props.clickId,
                size: pagination.pageSize,
                page: pagination.current,
                condition: this.state.searchContent,
            })
        } else {
            this.getTableData({
                proId: this.state.clickId,
                size: pagination.pageSize,
                page: pagination.current,
            })
        }
    };
    /**重置搜索调用*/    /**-------需要输入参数部分*/
    searchReset = () => {
        //需要输入参数，参数为默认的第一个工序
        this.getTableData({
            proId: this.state.clickId
        }, 1)
    }
    /**搜索*/           /**-------需要输入参数部分*/
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        })
        //需要根据接口输入参数
        this.getTableData({
            proId: this.state.clickId,
            condition: this.state.searchContent,
            size: this.pagination.pageSize,
            page: this.pagination.current,
        }, 0);
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }
    /**搜索框回调函数*/
    searchContentChange = (event) => {
        this.setState({
            searchContent:event.target.value
        })
    }
}
export default EqupimentAssignment
