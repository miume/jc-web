import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import "./inspectionTemplate.css"
import LeftTree from "./leftTree"
import axios from "axios";
import {message, Select,Button,Icon} from "antd";
import Add from "./add";
import SearchCell from "./searchCell";
import home from "../commom/fns";
import RightTable from "./rightTable";
import DepTree from "../checkPlan/depTree";
import DeleteByIds from "../BlockQuote/deleteByIds";


class InspectionTemplate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            rightTopData: [],
            rightTableData: [],
            deptCode: -1,
            deviceName: '',

            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            Tableflag: '',
            parentname: '',
            name:'',
        }
        this.pagination={
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }

        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSelect=this.handleSelect.bind(this)
        this.firstname=this.firstname.bind(this)
        this.getRightData=this.getRightData.bind(this)
        this.getTableData=this.getTableData.bind(this)
        this.searchEvent=this.searchEvent.bind(this)
        this.searchContentChange=this.searchContentChange.bind(this)
        this.handleTableChange=this.handleTableChange.bind(this)
        this.name=this.name.bind(this)
    }
    render(){
        /*获取日期*/
        var date = new Date();
        var nowMonth = date.getMonth() + 1;
        var strDate = date.getDate();
        var seperator = "-";
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        this.nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        const menuList1=JSON.parse(localStorage.getItem('menuList'))
        this.userName=menuList1.name
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('equipmentInspection')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations;
        const { Option } = Select;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检模板"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div  className="inspection-Tem">

                    <div className="inspection-Tem-leftTree">
                        <LeftTree
                            url={this.url}
                            getRightData={this.getRightData}
                            operation={this.operation}
                            handleSelect={this.handleSelect}
                            firstname={this.firstname}
                            name={this.name}
                            />
                    </div>

                    <div className="inspection-Tem-right">
                        <div>
                            <div className="checkP_buttons">
                                <div className="checkp-left">
                                    <Add deptCode={this.state.deptCode} deviceName={this.state.deviceName}  url={this.url}  departName={this.state.parentname} pagination={this.pagination}
                                         fetch={this.getTableData} parentname={this.state.parentname} name={this.state.name} operation={this.operation} userName={this.userName} nowDate={this.nowDate}/>
                                    {/*<DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}*/}
                                    {/*             flag={home.judgeOperation(this.operation,'DELETE')}*/}
                                    {/*/>*/}
                                </div>
                                <div className="check_right">
                                    <Select defaultValue="全部类型" style={{ width:120}} onChange={this.handleChange} >
                                        <Option value=''>全部类型</Option>
                                        <Option value='0'>机械类</Option>
                                        <Option value='1'>电气类</Option>
                                    </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <SearchCell
                                        name='计划编号/设备编号...'
                                        flag={home.judgeOperation(this.operation, 'QUERY')}
                                        searchEvent={this.searchEvent}
                                        searchContentChange={this.searchContentChange}
                                        fetch={this.getTableData}
                                        deptId={this.state.deptCode}
                                        deviceName={this.state.deviceName}


                                    />
                                </div>
                            </div>
                            <div className="inspection-Tem-table">
                            <RightTable
                                dataSource={this.state.rightTableData}
                                operation={this.operation}
                                pagination={this.pagination}
                                getTableData={this.getTableData}
                                deptCode={this.state.deptCode}
                                deviceName={this.state.deviceName}
                                url={this.url}
                                handleTableChange={this.handleTableChange}
                                name={this.state.name}
                                Tableflag={this.state.Tableflag}
                                deleteByIds={this.deleteByIds}
                            />
                        </div>
                        </div>

                    </div>





                </div>
            </div>
        )
    }
    handleSelect = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isSelect = true;
            this.setState({
                parentname:item.parentname,
                deptCode:code
            })
            console.log(this.state.parentname)
        } else {
            item.isSelect = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        // item.isSelect = false;
        if (item.children) {
            this.handleSelect(code, item.children)
        }
    });

    getRightData = (code, deviceName) => {

        code = parseInt(code)
        console.log(code)
        this.setState({
            deptCode:code
        })
        this.getTableData({deptId: parseInt(code)}, 0);

    };
    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        console.log(params)
        if (flag) {
            var pagination = this.pagination;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag: 0,
                searchContent: '',
                pagination:pagination
            })
        }
        axios({
            url: `${this.url.devicePatrolModel.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            this.pagination.total=res?res.total:0;
            this.pagination.current=res.page;
            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].devicePatrolModelsHead;
                    console.log('11111')
                    if(arr['checkType']===true){
                        arr['checkType']='电气类'
                    }else
                    {
                        arr['checkType']='机械类'
                    }
                    rightTableData.push({
                        index:i+1,
                        code:arr['code'],
                        deptCode:arr['deptCode'],
                        patrolName:arr['patrolName'],
                        tabulatedate:arr['tabulatedate'],
                        checkType:arr['checkType'],
                        setPeople:res.list[i].setPeople,
                        workshop:this.state.name,
                    })
                }
                console.log('2222222')
                console.log(rightTableData)
                this.setState({
                    rightTableData: rightTableData,
                    deviceName: params.deviceName
                });
                console.log('kkkkkkkkkkkk')
                console.log(this.state.rightTableData)
            } else {
            message.info('查询失败，请刷新下页面！')
            this.setState({
                rightTableData: [],
                deviceName: '',
                pagination:pagination
            });
        }
    }).catch(() => {
    message.info('查询失败，请刷新下页面！')
});
    };
    handleChange = (value) => {
        this.setState({
            Tableflag: value
        })
        const params = {
            deptId: parseInt(this.state.deptCode),
            deviceName: this.state.deviceName,
            status:value,
        }
        this.getTableData(params, 0)
    }
    searchEvent = () => {
        console.log('调用查询借口并')
        this.setState({
            pageChangeFlag:1
        });
        this.getTableData({
            condition:this.state.searchContent,
            deptId:this.state.deptCode,

        })
    }
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
        console.log(this.state.searchContent)
    }
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.getTableData({
                deptId:this.state.deptCode,
                status:this.state.Tableflag,
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent
            })
        }else{
            this.getTableData({
                deptId:this.state.deptCode,
                status:this.state.Tableflag,
                size:pagination.pageSize,
                page:pagination.current,
            })
        }
    };
    firstname=(e)=>{
        this.setState({
            parentname:e
        })
    }
    name=(e)=>{
        this.setState({
            name:e
        })
    }
    deleteByIds=(ids)=>{
        axios({
            url:`${this.url.devicePatrolModel.deleteByIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                // this.fetch({
                //     size: this.pagination.pageSize,
                //     page: this.pagination.current,
                //     orderField: 'id',
                //     orderType: 'desc',
                // });
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }
}

export default InspectionTemplate