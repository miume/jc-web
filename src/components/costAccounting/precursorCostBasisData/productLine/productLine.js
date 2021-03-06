import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Form,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from "axios";
import AddModal from "./addModal";
import Edit from "./edit"
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class statisticalPeriod extends React.Component{
    url
    operation
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            data:[],
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '33%',
        },{
            title: '生产线名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '33%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '33%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return (
                    <span>
                        <Edit code={record.code} fetch={this.fetch} updateFlag={updateFlag} />
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
    }

    handleDelete = (id)=>{
        axios({
            url:`${this.url.precursorProductionLine.delete}`,
            method:"delete",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:id}
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch((error)=>{
            message.info(error.data)
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }

    fetch = ()=>{
        this.setState({
            loading:true
        })
        axios({
            url:`${this.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            if(res.length!==0){
                this.setState({
                    data:res,
                    loading:false
                })
            }
        })
    };
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        return(
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <AddModal fetch = {this.fetch} addFlag={this.state.addFlag}/>
                    {/* <SearchCell flag={true}/> */}
                    <div className='clear' ></div>
                    <Table pagination={false} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(statisticalPeriod);
export default EditableFormTable
