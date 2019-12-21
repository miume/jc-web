/**检验管理-数据整理*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, message} from "antd";
import ExportFile from './exportFile'
import ImportFile from './importFile'
import Detail from './detail'
import axios from "axios";
import SearchCell from "./search";

const departmentData = [{
    code: 1,
    name: '部门1'
},{
    code: 2,
    name: '部门2'
}],
    productionData = [{
        code: 1,
        name: '工序1'
    },{
        code: 2,
        name: '工序2'
    }],
    productData = [{
        code: 1,
        name: '产品1'
    },{
        code: 2,
        name: '产品2'
    }];

class FireInsDataCol extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            productData: [],
            departmentData: [],
            productionData: [],
        };
        this.back = this.back.bind(this);
        this.reset = this.reset.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.getProductData = this.getProductData.bind(this);
        this.getDepartmentData = this.getDepartmentData.bind(this);
        this.getProductionLineData = this.getProductionLineData.bind(this);
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
            key:'index'
        },{
            title:'批次',
            dataIndex:'batch',
            key:'batch'
        },{
            title:'工序',
            dataIndex:'process',
            key:'process'
        },{
            title:'产品型号',
            dataIndex:'type',
            key:'type'
        },{
            title:'检验项目',
            dataIndex:'item',
            key:'item'
        },{
            title:'检验状态',
            dataIndex:'status',
            key:'status'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <Detail url={this.url} getTableData={this.getTableData} record={record} editflag={true}/>
                    </span>
                )
            }
        }];
    }

    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {loading,dataSource,departmentData,productionData,productData} = this.state;

        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <div>
                        <ExportFile url={this.url} getTableData={this.getTableParams}/>
                        <ImportFile url={this.url} getTableData={this.getTableParams} />
                        <SearchCell flag={true} name={'请输入'} searchEvent={this.searchEvent} reset={this.reset}
                                    departmentData={departmentData} productionData={productionData} productData={productData}/>
                    </div>
                    <div className={'clear'}></div>

                    <Table  columns={this.columns} pagination={this.pagination} onChange={this.handleTableChange}
                            dataSource={dataSource} rowKey={record => record.code} bordered size={'small'} />
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.getTableParams();
        this.getDepartmentData();
        this.getProductionLineData();
        this.getProductData()
    }

    /**获取所有送检部门数据*/
    getDepartmentData() {
        this.setState({
            departmentData: departmentData
        })
    }

    /**获取所有工序数据*/
    getProductionLineData() {
        this.setState({
            productionData: productionData
        })
    }

    /**获取所有产品数据*/
    getProductData() {
        this.setState({
            productData: productData
        })
    }

    /**统一表格数据*/
    getTableParams(data) {
        let {pageSize,current} = this.pagination, {departmentId,productionLine,product,searchContent} = this.state,
            params = {
                size: pageSize,
                page: current
            };
        if(!data) {
            data = {
                departmentId,
                productionLine,
                product,
                searchContent
            }
        }
        this.getTableData(params,data);
    }

    /**获取表格数据*/
    getTableData(params,data) {
        console.log(params,data)
        // this.setState({
        //     loading:true
        // })
    }

    /**监控表格数据分页情况*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableParams();
    }

    searchEvent(params) {
        let {departmentId, productionLine, product, date} = params;
        this.setState({
            departmentId,
            productionLine,
            product,
            date
        });
        this.getTableParams(params);
    }

    /**重置*/
    reset() {
        this.setState({
            departmentId: '',
            productionLine: '',
            product: '',
            date: ''
        });
        let params = {
                date: null,
                departmentId: -1,
                productionLine: -1,
                product: -1
            };
        this.getTableParams(params);
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
