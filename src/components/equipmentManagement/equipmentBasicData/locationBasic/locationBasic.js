import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import axios from "axios";
import {message,Spin} from "antd";
import './locationBasic.css'
import home from "../../../commom/fns";
import AddModal from "./addModal";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import TheTable from './theTable'
import DepTree from "../../../BlockQuote/department";

class LocationBasic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],//存取所选中checkbox的ids
            rightTableData:[],//表格中的数据
            editingKey: '',
            searchContent:'',
            searchText: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
            deptCode:2,
            deptName:'',
            loading: true,
            tableLoading: true
        };

        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.deleteByIds=this.deleteByIds.bind(this)
        this.onSelectChange=this.onSelectChange.bind(this)
        this.cancel=this.cancel.bind(this)
        this.getTableData=this.getTableData.bind(this)
        this.fetch=this.fetch.bind(this)
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (

            <div>
                <Blockquote menu={current.menuParent} name="位置基础信息"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div  className='equipment'>
                    {/*左边树部分*/}
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    {/*右边表格部分*/}
                    <Spin spinning={this.state.tableLoading} wrapperClassName='equipment-right'>
                        <AddModal
                            deptName={this.state.deptName}
                            deptCode={this.state.deptCode}
                            pagination={this.state.pagination}
                            url={this.url}
                            flag={home.judgeOperation(this.operation,'SAVE')}
                            getTableData={this.fetch}
                        />
                        <DeleteByIds
                            selectedRowKeys={this.state.selectedRowKeys}
                            deleteByIds={this.deleteByIds}
                            cancel={this.cancel}
                            flag={home.judgeOperation(this.operation,'DELETE')}
                        />
                        <TheTable
                            url={this.url}
                            pageChangeFlag={this.state.pageChangeFlag}
                            pagination={this.state.pagination}
                            rowSelection={rowSelection}
                            deptName={this.state.deptName}
                            deptCode={this.state.deptCode}
                            fetch = {this.fetch}
                            rightTableData={this.state.rightTableData}
                            getTableData={this.getTableData}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentBasicData'});
    }
    /**************************实现批量删除功能 *******************************/
    deleteByIds = () => {
         const ids =this.state.selectedRowKeys;
        axios({
            url: `${this.url.locationBasic.deleteByIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        });
    };

    fetch = () => {
        /**flag为1时，将分页搜索位置0 */
        var params={
            deptId:this.state.deptCode,
            page:this.state.pagination.page,
            size:10,
            depName:this.state.deptName,
        };
        this.getTableData(params);
    };

    onSelectChange = (selectedRowKeys,a) => {
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }

    /******************************获得表格数据********************************/
    getTableData = (params) => {
        this.setState({
            tableLoading: true,
            deptCode:params.deptId,
            deptName:params.depName
        });
        this.getData(params)
    }

    getData(params) {
        axios({
            url: `${this.url.locationBasic.getPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data: [];

            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i];
                    rightTableData.push({
                        index: i + 1 + (res.page - 1) * res.size,//序号
                        code:arr["code"],
                        deptId:arr["deptCode"],
                        locationName:arr["locationName"],
                        idCode:arr["idCode"],
                        deptName: this.state.deptName,
                    })
                }//新建状态用来获得所需的查询条件
                const{pagination}=this.state;
                pagination.total=res.total;
                pagination.page=res.page;
                this.setState({
                    rightTableData: rightTableData,
                    pagination:pagination,
                    tableLoading: false
                });
            } else {
                this.setState({
                    rightTableData: [],
                    pagination:[],
                    tableLoading: false
                });

            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        })
    }
}

export default LocationBasic
