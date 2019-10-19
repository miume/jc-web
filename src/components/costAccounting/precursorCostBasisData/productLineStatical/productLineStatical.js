import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";

class ProductLineStatical extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '15%',
        },{
            title: '所属类别',
            dataIndex: 'types',
            key: 'types',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                if(record.types===1){
                    return "辅材"
                }else{
                    return "主材"
                }
            }
        },{
            title: '所属工序',
            dataIndex: 'processName',
            key: 'processName',
            align:'center',
            width: '20%',
        },{
            title: '产线/权重',
            dataIndex: 'weightValue',
            key: 'weightValue',
            align:'center',
            width: '25%',
            render:(text,record)=>{
                var record = record.weightValue.split(",");
                return(
                    record.map((item,index)=>{
                        return(<div key={index}>
                            {item}
                        </div>)
                    })
                )
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                return(
                    <span>
                        <span className="blue">编辑</span>
                        <Divider type="vertical"/>
                        <span className="blue">删除</span>
                    </span>
                )
            }
        }]
    };
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
            url:`${this.url.precursorMaterialLineWeight.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            for(var i=0;i<res.length;i++){
                res[i].weightValue = res[i].weightDTOS.map((item)=>{
                    return(
                        item.lineName+"  "+item.weightValue
                    )
                }).join(",")
            }
            // console.log(res);
            if(res.length!==0){
                this.setState({
                    data:res,
                    searchContent:'',
                })
            }
        })
    }

    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        //   console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.precursorMaterialLineWeight.page}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                // size: this.pagination.pageSize,
                // page: this.pagination.current,
                condition:ope_name
            },
            type:'json',
        }).then((data)=>{
            // const res = data.data.data;
            // if(res&&res.list){
            //     this.pagination.total=res.total;
            //     for(var i = 1; i<=res.list.length; i++){
            //         res.list[i-1]['index']=(res.prePage)*10+i;
            //     }
            //     this.setState({
            //         dataSource: res.list,
            //     });
            // }
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            for(var i=0;i<res.length;i++){
                res[i].weightValue = res[i].weightDTOS.map((item)=>{
                    return(
                        item.lineName+"  "+item.weightValue
                    )
                }).join(",")
            }
            if(res.length!==0){
                this.setState({
                    data:res
                })
            }
        })
    };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal />
                    <DeleteByIds 
                        selectedRowKeys = {[1]}
                    />
                    <SearchCell name="请输入物料名称" flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table rowSelection={{}} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default ProductLineStatical