/**工序计算基准*/
import React,{Component} from 'react';
import {Spin,Table,Input} from 'antd'
import BlockQuote from '../../../BlockQuote/blockquote'
const data=[{
    index:1,
    processName:'基数名',
    lastInitial:'计算基准',
    flag:false,
    editFlag:false
}]
class ProductCalculationBase extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            data:data
        }        
       
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'基数名',
            dataIndex:'processName',
            key:'processName',
            width:'25%'
        },{
            title:'计算基准',
            dataIndex:'lastInitial',
            key:'lastInitial',
            width:'25%',
            render:(text,record)=>{
                return(
                    record.flag?<Input defaultValue={text} onChange={this.inputChange}/>:<span>{text}</span>
                )
            }
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            render:(text,record)=>{
                return(
                    record.flag?(<span><span className='blue' onClick={()=>this.save(record)}>保存</span>&nbsp;&nbsp;&nbsp;<span className='blue' onClick={()=>this.cancel(record)}>取消</span></span>)
                    :<span className='blue' onClick={()=>this.edit(record.index)}>编辑</span>
                )
            }
        }]
        this.back=this.back.bind(this);
        this.edit=this.edit.bind(this);
        this.inputChange=this.inputChange.bind(this)
        this.save=this.save.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'))
        let {loading,data}=this.state
        return (
           <div>
               <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
               <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                   <Table dataSource={data} rowKey={record=>record.index} columns={this.columns} size={'small'} bordered/>
               </Spin>
           </div>
        );
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

            lastInitial:value
        })
    }
    save(record){
        let {data}=this.state
        data[record.index-1]['flag']=false //根据flag判断显示输入框还是文本
        this.setState({
            data:data
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
}

export default ProductCalculationBase;