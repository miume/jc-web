/**检验管理-数据整理*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {message, Spin, Table} from "antd";
import ImportFile from './importFile'
import Detail from './detail'
import axios from "axios";
import SearchCell from "./search";
import moment from "moment";
import NewButton from "../../../BlockQuote/newButton";
import {getOperations, judgeOperation} from "../../../commom/getOperations";

// const departmentData = [{
//     code: 1,
//     name: '部门1'
// },{
//     code: 2,
//     name: '部门2'
// }],
//     productionData = [{
//         code: 1,
//         name: '工序1'
//     },{
//         code: 2,
//         name: '工序2'
//     }],
//     productData = [{
//         code: 1,
//         name: '产品1'
//     },{
//         code: 2,
//         name: '产品2'
//     }];

class FireInsDataCol extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            productData: [],
            departmentData: [],
            productionData: [],
            selectedRowKeys: []
        };
        this.back = this.back.bind(this);
        this.reset = this.reset.bind(this);
        this.export = this.export.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.getProductData = this.getProductData.bind(this);
        this.getDepartmentData = this.getDepartmentData.bind(this);
        this.getProcessData = this.getProcessData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            pageSize: 10,
            current: 1,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };

        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width: '6%'
        },{
            title:'批次',
            dataIndex:'batch',
            key:'batch',
            width: '20%'
        },{
            title:'工序',
            dataIndex:'process',
            key:'process',
            width: '6%'
        },{
            title:'产品型号',
            dataIndex:'product',
            key:'product',
            width: '6%'
        },{
            title:'检验项目',
            dataIndex:'itemsSpace',
            key:'itemsSpace',
            width: '50%'
        },{
            title:'检验状态',
            dataIndex:'status',
            key:'status',
            width: '6%'
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            width: '6%',
            render:(text)=>{
                return(
                    <span>
                        <Detail url={this.url} getTableData={this.getTableData} code={text} editflag={true}/>
                    </span>
                )
            }
        }];
    }

    render(){
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {loading,dataSource,departmentData,productionData,productData,selectedRowKeys,importFlag,exportFlag} = this.state;
        const rowSelection = {
            onChange: this.onSelectChange,
            selectedRowKeys
        }, disabled = selectedRowKeys.length ? false : true;

        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <div>
                        <span className={exportFlag ? '' : 'hide'}>
                            <NewButton name={'导出'} className={'fa fa-plus'} flagConfirm={disabled} handleClick={this.export}/>
                        </span>
                        <ImportFile url={this.url} flag={importFlag} getTableData={this.getTableParams} />
                        <SearchCell flag={true} name={'请输入'} searchEvent={this.searchEvent} reset={this.reset}
                                    departmentData={departmentData} productionData={productionData} productData={productData}/>
                    </div>
                    <div className={'clear'}></div>

                    <Table columns={this.columns} pagination={this.pagination} onChange={this.handleTableChange}
                           dataSource={dataSource} rowKey={record => record.code} bordered size={'small'} rowSelection={rowSelection} />
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        let date = moment(new Date()).format('YYYY-MM-DD');
        this.setState({date});
        this.getTableParams({  //默认查当天的数据
            date
        });
        this.getDepartmentData();
        this.getProcessData();
        this.getProductData();
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            importFlag: judgeOperation(operations,'UPLOAD'),
            exportFlag: judgeOperation(operations,'DOWNLOAD'),
        })
    }

    /**获取所有送检部门数据*/
    getDepartmentData() {
        axios({
            url: `${this.url.fireMageDept.getAll}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    departmentData: res
                })
            }
        })
    }

    /**获取所有工序数据*/
    getProcessData() {
        axios({
            url: `${this.url.fireMageNumber}/detail?position=1`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    productionData: res
                })
            }
        })
    }

    /**获取所有产品数据*/
    getProductData() {
        axios({
            url: `${this.url.fireMageNumber}/detail?position=4`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    productData: res
                })
            }
        })
    }

    /**统一表格数据*/
    getTableParams(data = {}) {
        let {pageSize,current} = this.pagination, {deptCode,process,product,date} = this.state,
            params = {
                size: pageSize,
                page: current,
                deptCode: data['deptCode'] === undefined ? deptCode : data['deptCode'],
                process: data['process'] === undefined ? process : data['process'],
                product: data['product'] === undefined ? product : data['product'],
                date: data['date'] === undefined ? date : data['date']
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        this.setState({
            loading:true
        });
        axios({
            url: `${this.url.dataReorganize.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then(data => {
            let res = data.data.data, head = [];
            if(res && res.list.length) {
                for(let i = 0; i < res.list.length; i++) {
                    let temp = res.list[i]['head'];
                    temp['index'] = (res.page - 1) * 10 + i + 1;
                    temp['status'] = res.list[i]['status'];
                    temp['itemsSpace'] = res.list[i]['itemsSpace'];
                    temp['id'] = temp['code'];
                    temp['code'] = temp['batch'];
                    head.push(temp)
                }
            }
            this.setState({
                dataSource: head,
                loading: false
            })
        })
    }

    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    /**监控表格数据分页情况*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableParams();
    }

    searchEvent(params) {
        let {deptCode, process, product, date} = params;
        this.setState({
            deptCode,
            process,
            product,
            date
        });
        this.pagination.current = 1;
        this.getTableParams(params);
    }

    /**重置*/
    reset() {
        this.setState({
            deptCode: '',
            process: '',
            product: '',
            date: ''
        });
        let params = {
            date: '',
            deptCode: '',
            process: '',
            product: ''
        };
        this.getTableParams(params);
    }

    /**导出*/
    export() {
        let {selectedRowKeys} = this.state;
        axios({
            url: `${this.url.dataReorganize.export}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: selectedRowKeys,
        }).then((data) => {
            let file = data.data.data;
            if(file) {
                let url = `${this.url.equipmentRepair.download}${file}`;
                let a = document.createElement('a');
                a.href = url;
                a.click();
                this.setState({
                    selectedRowKeys: []
                })
            }

            message.info(data.data.message)
        })
    }

    /**返回检验管理*/
    back() {
        this.props.history.push({pathname:"/inspectionManagement"})
    }

    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }
}
export default FireInsDataCol
