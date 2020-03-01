/**工序上期初始值*/
import React,{Component} from 'react';
import {Spin,Table,Input,message} from 'antd'
import BlockQuote from '../../../BlockQuote/blockquote'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ProductLastIntial extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            data:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'工序名称',
            dataIndex:'process',
            key:'process',
            width:'25%'
        },{
            title:'上期初始值',
            dataIndex:'lastInitValue',
            key:'lastInitValue',
            width:'25%',
            render:(text,record)=>{
                return(
                    record.flag?<Input defaultValue={text} onChange={this.inputChange}/>:<span>{text}</span>
                )
            }
        },{
            title:'操作',
            dataIndex:'code',
            key:'code',
            render:(text,record)=>{
                return(
                    record.flag?(<span><span className='blue' onClick={()=>this.save(record)}>保存</span>&nbsp;&nbsp;&nbsp;<span className='blue' onClick={()=>this.cancel(record)}>取消</span></span>)
                    :<span className='blue' onClick={()=>this.edit(record.index)}>编辑</span>
                )
            }
        }]
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.edit=this.edit.bind(this);
        this.inputChange=this.inputChange.bind(this)
        this.save=this.save.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,data}=this.state
        return (
           <div>
               <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
               <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                   <Table rowKey={record=>record.code} columns={this.columns} 
                   pagination={false} dataSource={data}
                   size={'small'} bordered/>
               </Spin>
           </div>
        );
    }
    componentDidMount() {
        this.getTableData();
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            updateFlag: judgeOperation(operations,'UPDATE'),
        })
    }
    getTableData(){
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.initValues.all}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] =  i + 1
                    res[i]['flag']=false
                }
                this.setState({
                    data: res
                })
            }
            this.setState({
                loading: false
            })
        })
    }
    edit(index){//传过来的是序号
        let {data}=this.state
        data[index-1]['flag']=true //根据flag判断显示输入框还是文本,判断显示编辑还是（保存，取消）
        this.setState({
            data:data
        })
    }
    inputChange(e){
        let value=e.target.value
        this.setState({
            lastInitValue:value
        })
    }
    save(record){
        let {data,lastInitValue}=this.state
        data[record.index-1]['flag']=false //根据flag判断显示输入框还是文本
        this.setState({
            data:data
        })
        if(lastInitValue===null||lastInitValue===undefined){
            message.error('上期初始值不能为空!')
            return
        }
        let params={
            code:record.code,
            lastInitValue:lastInitValue
        }
        axios({
            url:this.url.initValues.edit,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:params
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.error(data.data.data)
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    cancel(record){
        let {data}=this.state
        data[record.index-1]['flag']=false //根据flag判断显示输入框还是文本
        this.setState({
            data:data
        })
    }
    back(){
        this.props.history.push('/baseProduct')
    }
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProductLastIntial;