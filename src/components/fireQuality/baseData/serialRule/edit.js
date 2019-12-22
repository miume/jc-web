import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Input, message, Table,  Popconfirm,Radio} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class Edit extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            dataSource:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'8%'
        },{
            title:'规则代码',
            dataIndex:'value',
            key:'value',
            width:'30%',
            render:(text,record)=>{
                    return(
                        <Input onChange={this.inputChange} value={record.value} name={`${record.index}-${'value'}`} style={{border:'none',textAlign:'left'}} placeholder={'请输入规则代码'}/>
                    )
            }
        },{
            title:'说明',
            dataIndex:'description',
            key:'description',
            width:'30%',
            render:(text,record)=>{
                return(
                    <Input onChange={this.inputChange} value={record.description} name={`${record.index}-${'description'}`} style={{border:'none',textAlign:'left'}}  placeholder={'请输入说明'}/>
                )
            }
        },{
            title:'是否启用',
            dataIndex:'enable',
            key:'enable',
            width:'20%',
            render:(text,record)=>{
                return (
                    <Radio checked={record.enable}  onChange={()=>this.radioChange(record)}/>
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'10%',
            render:(text,record)=>{
                return(
                      <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.index)} okText="确定" cancelText="再想想" >
                        <span className='blue'>删除</span>
                     </Popconfirm>

                )
            }
        }]
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.getDetail=this.getDetail.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.radioChange=this.radioChange.bind(this)
        this.inputChange=this.inputChange.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getDetail()
    }
    getDetail(){
        let {record}=this.props
        axios({
            url:`${this.props.url.fireMageNumber}/detail`,
            method:'get',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            params:{
                position:record.position
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=i+1
                }
                this.setState({
                    dataSource:res
                })
            }

        })
    }
    /**删除一行*/
    handleDelete(index){
        let {dataSource}=this.state
        dataSource.splice(index-1)
        this.setState({
            dataSource:dataSource
        })
   }
   /**新增一行*/
   handleAdd(){
      let {dataSource}=this.state
       dataSource.push({
           index:dataSource.length+1,
           value:'',
           description:'',
           enable:false
       })
       this.setState({
           dataSource:dataSource
       })
   }
    inputChange(e){
        let value=e.target.value,name=e.target.name.split('-'),
            {dataSource}=this.state,index=name[0]
        name=name[1]
        dataSource[index-1][name]=value
        this.setState({
            dataSource:dataSource
        })
    }
    radioChange(record){
        record.enable=true
         let {dataSource}=this.state
        for(let i=0;i<dataSource.length;i++){
            if(dataSource[i].index===record.index){
                dataSource[i]['enable']=true
            }
            else{
                dataSource[i]['enable']=false
            }
        }
        this.setState({
            dataSource:dataSource
        })
    }
    handleCreate(){
       let {dataSource}=this.state
        this.setState({
            visible:false
        })
        axios({
            url:`${this.url.fireMageNumber}/save`,
            method:"put",
            headers:{
                'Authorization': this.url.Authorization
            },
            data:dataSource
        }).then((data)=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData();
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    cancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        let {visible,changeFlag}=this.state,{editflag,detailFlag,record}=this.props
        return(
            <span>
                <span className={'blue'} onClick={this.showModal}>编辑</span>
                <Modal
                    title={'编辑'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'700px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={detailFlag?true:false}/>,
                        detailFlag?null:(<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                      <Table rowKey={record => record.index}  columns={this.columns} scroll={{y:'250px'}}
                               dataSource={this.state.dataSource}  pagination={false} size="small" bordered
                        />
                      <span className={'blue'} onClick={this.handleAdd} style={{marginTop:'10px'}}><i className={'fa fa-plus'}></i>&nbsp;&nbsp;新增</span>
                </Modal>
            </span>
        )
    }
}
export default Edit