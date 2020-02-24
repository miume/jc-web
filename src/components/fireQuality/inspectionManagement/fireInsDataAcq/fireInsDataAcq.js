/**检验管理-数据采集*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table,DatePicker,Button} from "antd";
import ExportFile from './exportFile'
import ImportFile from './importFile'
import axios from "axios";
import NewButton from '../../../BlockQuote/newButton'
import moment from 'moment'
import {getOperations, judgeOperation} from "../../../commom/getOperations";
class FireInsDataAcq extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'批次',
            dataIndex:'head.batch',
            key:'head.batch',
            width:'25%'
        },{
            title:'工序',
            dataIndex:'head.process',
            key:'head.process',
            width:'15%'
        },{
            title:'检验项目',
            dataIndex:'itemsSpace',
            key:'itemsSpace',
            render:(text)=>{
                let data=text.substring(0, 50)
                return(
                    <span title={text}>{`${data}${'...'}`}</span>
                )
            }
        }]
        this.state={
            loading:false,
            dataSource:[]
        };
        this.pagination={
            showSizeChanger:true,
            showTotal:(total)=>`共${total}条记录`,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.reset=this.reset.bind(this);
        this.dateChange=this.dateChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    componentDidMount() {
        this.getTableData()
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            importFlag: judgeOperation(operations,'UPLOAD'),
            exportFlag: judgeOperation(operations,'DOWNLOAD'),
        })
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }

    getTableData(searchContent){
        this.setState({
            loading:true
        });
        let {current,pageSize}=this.pagination,
        params={
            time:searchContent?searchContent:'',
            page:current?current:1,
            size:pageSize?pageSize:10
        }
    axios({
        url:this.url.dateConllection.page,
        method:'get',
        headers:{
            'Authorization':this.url.Authorization
        },
        params
    }).then(data=>{
        let res=data.data.data
        this.pagination.total=res&&res.total?res.total:0
        if(res&&res.list){
            for(let i=0;i<res.list.length;i++){
                res.list[i]['index']=(res.page-1)*res.size+(i+1)
            }
            this.setState({
                dataSource:res.list,
            })
        }
        this.setState({
            loading:false,
        })
     })
    }
    dateChange(date,dateString){
        this.setState({
            searchContent:dateString
        })
    }
    searchEvent(){
       let {searchContent}=this.state
        this.getTableData(searchContent)
    }
    reset(){
        this.setState({
            searchContent:null
        });
        this.getTableData(null)
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        this.searchEvent();
    }

    back(){
        this.props.history.push({pathname:"/inspectionManagement"})
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url=JSON.parse(localStorage.getItem('url'));
        let {loading,dataSource,searchContent,importFlag,exportFlag}=this.state;
        return(
            <div>
                <BlockQuote name={'数据采集'} menu={this.current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <ExportFile url={this.url} getTableData={this.getTableData} exportFlag={exportFlag}/>
                    <ImportFile url={this.url} getTableData={this.getTableData} importFlag={importFlag}/>

                    <span className={'searchCell'}>
                        <DatePicker placeholder={'请选择日期'} value={searchContent?moment(searchContent):null} onChange={this.dateChange}/>&nbsp;&nbsp;&nbsp;
                        <NewButton handleClick={this.searchEvent} name='确定' />
                        <Button
                            type="primary"
                            style={{marginLeft:10}}
                            onClick={this.reset}
                            className='button'
                        ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
                    </span>
                    <Table  pagination={this.pagination} columns={this.columns} onChange={this.handleTableChange}
                           dataSource={dataSource} rowKey={record => record.head.code} bordered size={'small'} />
                </Spin>
            </div>
        )
    }
}
export default FireInsDataAcq
