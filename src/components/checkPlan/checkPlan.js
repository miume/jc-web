import React from "react";
import {Col, message, Row, Select, Tabs} from "antd";
import axios from "axios";
import Blockquote from "../BlockQuote/blockquote";
import DepTree from "./depTree";
import RightTable from "./rightTable"
import "./checkPlan.css"
import Add from "./add";
import SearchCell from "../BlockQuote/search";
import home from "../commom/fns";

var fakedataSource=[];
for(var i=0;i<15;i++)
{
    fakedataSource.push({
        index: i,
        code:i,
        devicecode:'ii',
        devicename:'等等等',
        status:'',
        workshop:'所属车间',
    });
}


class CheckPlan extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:[],
            rightTopData: [],
            rightTableData: [],
            depCode: -1,
            deviceNamee: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            Tableflag:'',
            parentname:'',
        }

        this.fetch=this.fetch.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSelect=this.handleSelect.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
    }

    componentDidMount() {
        this.fetch()
    }
    renderEquipmentName = (data) => data.map((item) => {

        return (
            <Tabs.TabPane key={item.name} tab={item.name + '(' + item.count + ')'}>
            </Tabs.TabPane>
        )
    });
    //----------------------------------

    handleSelect = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isSelect = true;
            this.setState({
                parentname:item.parentname
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
        axios({
            url: `${this.url.equipmentArchive.device}/${code}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                var rightTopData = [];
                if (JSON.stringify(res) !== '{}') {
                    for (var key in res) {
                        rightTopData.push({
                            name: key,
                            count: res[key]
                        })
                    }
                } else {
                    rightTopData.push({
                        name: '无设备',
                        count: 0
                    })
                }
                this.setState({
                    rightTopData: rightTopData,
                    depCode: code
                }, () => {
                    const rightTopData = this.state.rightTopData;
                    var deviceFlag = true;
                    rightTopData.map((item) => {
                        if (item.name === deviceName) {
                            deviceFlag = false
                        }
                    })
                    if (deviceFlag) {
                        this.getTableData({
                            deptId: parseInt(code),
                            deviceName: rightTopData[0] ? rightTopData[0].name : null
                        }, 0);
                        this.setState({
                            deviceNamee:rightTopData[0].name
                        })
                    } else {
                        this.getTableData({
                            deptId: parseInt(code),
                            deviceName: deviceName
                        }, 0);
                    }
                });
            } else {
                message.info('查询失败，请刷新下页面！')
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };
    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
            // var {pagination} = this.state;
            // pagination.current = 1;
            // pagination.total = 0;
            // this.setState({
            //     pageChangeFlag:0,
            //     searchContent:'',
            //     pagination:pagination
            // })
        }

    }
    handleChange=(value)=>{
        this.setState({
            Tableflag:value
        })
    }
    fetch = (params,flag) => {
        console.log('1111111111111111')
        // this.setState({
        //     dataSource:fakedataSource
        // })
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        // if(flag) {
        //     var {pagination} = this.state;
        //     pagination.current = 1;
        //     pagination.total = 0;
        //     this.setState({
        //         pageChangeFlag:0,
        //         searchContent:'',
        //         pagination:pagination
        //     })
        // }
        // axios({
        //     url: `${this.url}` ,
        //     method: 'get',
        //     headers:{
        //         'Authorization': this.url.Authorization
        //     },
        //     params: params,
        // }).then((data) => {
        //     const res = data.data.data?data.data.data:[];
        //
        //     if(res&&res.list){
        //         for(var i = 1; i<=res.list.length; i++){
        //             res.list[i-1]['index']=(res.prePage)*10+i;
        //         }
        //         const {pagination} = this.state;
        //         pagination.total=res.total;
        //
        //
        //         // 假数据阶段
        //         // this.setState({
        //         //     dataSource: res.list,
        //         //     pagination:pagination,
        //         // });
        //         this.setState({
        //             dataSource:fakedataSource
        //         })
        //     }else{
        //         //假数据
        //         this.setState({
        //             dataSource:fakedataSource
        //         })
        // this.setState({
        //     dataSource: []
        // })

    }
    //---------------------------------
    searchEvent=()=>{
        console.log('调用查询借口并')
    }
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
        console.log(this.state.searchContent)
    }
    returnEquKey = (key) => {
        const params = {
            deptId: parseInt(this.props.depCode),
            deviceName: key
        }
        this.setState({
            deviceNamee:key
        })
        console.log(this.state.deviceNamee)
        this.getTableData(params, {})
    };
}

export default CheckPlan