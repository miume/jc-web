import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,InputNumber,Input,Form } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddButton from '../../../BlockQuote/newButton';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from "./addModal";
import Edit from "./edit"

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
            width: '20%',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '20%',
        },{
            title: '周期名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '20%',
        },{
            title: '默认时长(天)',
            dataIndex: 'length',
            key: 'length',
            align:'center',
            width: '20%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                return (
                    <span>
                        <Edit code={record.code} fetch={this.fetch}/>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除？" onConfirm={()=>this.handleDelete(record.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    }

    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.staticPeriod.delete}`,
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
    }

    fetch = ()=>{
        axios({
            url:`${this.url.staticPeriod.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            if(res.length!==0){
                this.setState({
                    data:res
                })
            }
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal fetch = {this.fetch}/>
                    {/* <SearchCell flag={true}/> */}
                    <div className='clear' ></div>
                    <Table columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} size="small" bordered/>
                </div>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(statisticalPeriod);
export default EditableFormTable