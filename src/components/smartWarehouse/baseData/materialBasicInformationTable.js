import React,{Component} from 'react';
import axios from 'axios';
import {Spin,Table,message,Divider,Popconfirm} from 'antd';
import BlockQuote from '../../BlockQuote/blockquote';
import SearchCell from '../../BlockQuote/search';
import Add from './add';
// const data=[{
//     id:1,
//     key:1,
//     index:1,
//     materialName:'NiSO4',
//     materialType:'原材料',
//     metal:['Ni','Mn']  //数组转字符串
// }];

class MaterialBasic extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            dataSource: [],
            value: ''
        };
        this.reset = this.reset.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
            width:'10%',
            align:'center'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%',
            align:'center'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType',
            width:'20%',
            align:'center'
        },{
            title:'所含金属',
            dataIndex:'metal',
            key:'metal',
            width:'23%',
            align:'center',
            render: (text) => {
                return text.join(',')
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                       <Add editFlag={true} record={record} url={this.url} getTableData={this.getTableData}/>
                        {this.judgeOperation(this.operation,'UPDATE')?<Divider type='vertical'></Divider>:''}
                        <Popconfirm title='确定删除?' onConfirm={()=>this.deleteById(record.id)} okText='确定' cancelText='再想想'>
                             <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        },]
    }

    onSelectChange(selectedRowKeys){//复选框变化调用的函数
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }

    //判断当前用户拥有该菜单哪些权限
    judgeOperation(operation,operationCode){
       var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
       return flag.length>0?true:false
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                 <Add url={this.url} wrappedComponentRef={(form)=>this.formRef=form} getTableData={this.getTableData}/>
                 <SearchCell name='请输入物料名称' flag={this.judgeOperation(this.operation,'QUERY')} fetch={this.reset}
                             searchContentChange = {this.searchContentChange} searchEvent={this.searchEvent}></SearchCell>
                 <Table
                     rowKey = {record=>record.id}
                     columns = {this.columns}
                     dataSource = {this.state.dataSource}
                     pagination={this.pagination}
                     size='small'
                     bordered />
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.getTableData();
    }

    /**获取所有物料数据*/
    getTableData(params = {
        depthQuery: true, //深度查询
        orderBy: "id",
        orderType: "DESC",
    }) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.materialInfo.page}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: params,
            type: 'json'
        }).then((data) => {
            let res = data.data.data, records = res.records;
            this.pagination.total = data.data.data.total;
            for(let i = 0; i < records.length; i++) {
                let temp = [], completeType = records[i]['completeType'], ni = records[i]['ni'],
                    co = records[i]['co'], mn = records[i]['mn'], metal = [];
                for(let j = 0; j < completeType.length; j++) {
                    temp.push(completeType[j]['typeName']);
                }
                if(ni !== '0') metal.push('ni');
                if(co !== '0') metal.push('co');
                if(mn !== '0') metal.push('mn');
                records[i]['material'] = completeType[completeType.length-1]['typeName'];
                records[i]['materialType'] = temp.join('-');
                records[i]['metal'] = metal;
                records[i]['index'] = (res.current - 1) * 10 + i + 1;
                records[i]['materialTypeId'] = parseInt(completeType[completeType.length - 1].id);
            }
            this.setState({
                loading: false,
                dataSource: records
            });
        })
    }

    /**批量删除*/
    deleteById(id) {
        axios({
            url: `${this.url.materialInfo.materialInfo}/${id}?force=false`,
            method: 'DELETE',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            this.getTableData();
            message.info(data.data.mesg);
        })
    }

    /**搜索事件*/
    searchEvent() {
        let {value} = this.state;
        this.getTableData({
            depthQuery: true, //深度查询
            materialName: value,
            orderBy: "id",
            orderType: "DESC",
        })
    }

    /**监控搜索框内容的变化*/
    searchContentChange(e) {
        let value = e.target.value;
        this.setState({
            value: value
        })
    }

    /**重置*/
    reset() {
        this.setState({
            value: ''
        });
        this.getTableData();
    }

    /**销毁组件*/
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
}
export default MaterialBasic;
