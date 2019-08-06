import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Table, Tabs,message,Spin} from "antd";
import axios from "axios"
import SearchPart from "./searchPart"
import TreeCard from "../BlockQuote/treeSelect"
import "./inspectionQuery.css"
import {column1, column2, column3} from "./columns"

class InspectionQuery extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props)
        this.detailVisible=false;
        this.url=JSON.parse(localStorage.getItem('url'));
        this.state={
            doingStatus:'1',
            TreeData:[],
            RightTableData:[],
            deptId:'2',
            status:'',
            page:1,
            size:10,
            loading:true,
        }
        this.pagination={
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
        this.handleSizeChange=this.handleSizeChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }
    componentDidMount() {
        if(this.state.RightTableData) {
            this.setState({loading:false})
        }
    }
    handleSizeChange=(current,size)=>{
        //console.log(current);
        this.setState({
            size:current.pageSize,
            page:'1',
            loading:true,
        },()=>{
            this.getTableData()
        })
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px',width:"100%"}}>
                    <Tabs onChange={this.returnEquKey} >
                        <Tabs.TabPane key={1} tab={(<b>待巡检</b>)}>
                            <div className="inspectionQueryTree" >
                                <TreeCard
                                    style={{height:"150px"}}
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart
                                handleSearch={this.handleSearch}

                                getTableData={this.getTableData}
                            />

                            <div className="inspectionQueryTable">
                                <Spin spinning={this.state.loading}>
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column1}
                                    scroll={{y: 360}}
                                    dataSource={this.state.RightTableData}
                                    pagination={this.pagination}
                                    onChange={this.handleSizeChange}
                                /></Spin>
                            </div>

                        </Tabs.TabPane>
                        <Tabs.TabPane key={2} tab={(<b>已接单</b>)}>
                            <div className="inspectionQueryTree" >
                                <TreeCard
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart
                                handleSearch={this.handleSearch}
                                getTableData={this.getTableData}/>
                            <div className="inspectionQueryTable">
                                <Spin spinning={this.state.loading}>
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column2}
                                    dataSource={this.state.RightTableData}
                                    scroll={{y: 360}}
                                    pagination={this.pagination}
                                    onChange={this.handleSizeChange}
                                /></Spin>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={3} tab={(<b>已完成</b>)}>
                            <div className="inspectionQueryTree">
                                <TreeCard
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart
                                handleSearch={this.handleSearch}
                                getTableData={this.getTableData}
                            />
                            <div className="inspectionQueryTable">
                                <Spin spinning={this.state.loading}>
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column3}
                                    dataSource={this.state.RightTableData}
                                    scroll={{y: 360}}
                                    pagination={this.pagination}
                                    onChange={this.handleSizeChange}
                                /></Spin>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
    returnEquKey = key => {
        if(key==='1'||key==='2'||key==='3'){
            //console.log(key);
            this.setState({
                doingStatus:key,
                loading:true,
            },()=>{
                this.getTableData();
            })
        }

    };
    getTreeData=()=>{
        ////console.log('----------------------------------------')
        // TODO: 调接口，获取数据
        axios({
            url: `${this.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            var dataSource = [{
                title: '总公司',
                key:'0',
                children: [],
                value:'总公司',
            }];
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        key:arrParent.code,
                        children: [],
                        value: arrParent.name,
                    };
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        parenObj['children'].push({
                            title:arr.name.toString(),
                            key:arr.code,
                            value:  arrParent.name.toString()+'-'+arr.name.toString(),
                            children: []
                        });
                    }
                    dataSource[0].children.push(parenObj);
                }
                //console.log(dataSource)
                this.setState({
                    TreeData: dataSource,
                })
            } else {
                message.info('查询无结果,请联系管理员！')
            }
        });
    };
    getTableData=(param)=>{
        var params={};
        if(param){
           params={
               deptId:this.state.deptId,
               status:this.state.doingStatus,
               condition:param.condition,
               startDate:param.startDate,
               endDate:param.endDate,
               page:this.state.page,
               size:this.state.size,
           };
        } else{
            params={
                deptId:this.state.deptId,
                status:this.state.doingStatus,
                page:this.state.page,
                size:this.state.size,
            }
        }
        axios({
            url:this.url.devicePatrolQuery.PatrolQueryPage,
            method: "get",
            header:{
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            if(data.status===200){
                //console.log(data.status);
                if(data.data.code===0){
                    var result=data.data.data ? data.data.data.list : [];
                    if(result){
                        var tabledata=[];
                        for(var i=0;i<result.length;i++){
                            const devicePatrolPlanRecordHead=result[i].devicePatrolPlanRecordHead;
                            var checktype1;
                            const checktype=devicePatrolPlanRecordHead.checkType;
                            if(checktype===true){checktype1="电气类"}
                            else if(checktype===false){checktype1="机械类"}
                            else {checktype1="null"}
                            const modelName=result[i].modelName;
                            tabledata.push({
                                index:i+1,
                                key:devicePatrolPlanRecordHead.code,
                                planName:devicePatrolPlanRecordHead.planName,
                                modalName:modelName,
                                checkType:checktype1,
                                planDate:devicePatrolPlanRecordHead.planTime,
                                recivedTime:devicePatrolPlanRecordHead.receiveTime,
                                completed:devicePatrolPlanRecordHead.finishTime,
                                editFlag:devicePatrolPlanRecordHead.editFlag,
                                patrolPeople:devicePatrolPlanRecordHead.patrolPeople,
                                receivePeople:devicePatrolPlanRecordHead.receivePeople,
                                patrolComment:devicePatrolPlanRecordHead.patrolComment,
                            })
                        }
                        this.setState({RightTableData:tabledata},()=>{
                            message.info("查询成功！");
                            if(this.state.TreeData!==null){
                                this.setState({loading:false})
                            }
                        })
                    }

                    else {
                        message.info(data.data.message)
                    }
                }else{
                    message.info(data.data.message)
                }
            }
            else{
                // console.log(data)
                message.info("网络错误，请重试");
                this.setState({loading:false})
            }
        })
    };
    getParams=(selectedKey,e)=>{
        this.setState({
            deptId:selectedKey[0],
            loading:true,
        },()=>{
            this.getTableData()
        });

    };
    handleSearch=()=>{
        this.setState({loading:true},()=>{
            if(this.state.TreeData!==null){
                this.setState({loading:false})
            }
        });
    };
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }
}
export default InspectionQuery