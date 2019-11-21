import React,{Component} from 'react'
import {Table,Input} from 'antd'
import ReadRecipe from '../readRecipe'
import NewButton from '../../../../BlockQuote/newButton'
import SelectLine from '../selectProductline'
import axios from 'axios'
class SyntheticProcess extends Component{//合成工序
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:"5%"
        },{
            title:'合成槽号',
            dataIndex:'materialName',
            key:'materialName',
            width:"13%"
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume',
            width:'15%',
            // render:(text,record)=>{
            //     if(record.dataType===1){
            //          return(
            //              <Input name={`${record.index}-${'volume'}`} onChange={this.inputChange}/>
            //          )
            //     }
            //  }
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent',
            width:'15%',
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            // render:(text,record)=>{
            //     return(
            //         <Input name={`${record.index}-${'niPotency'}`} onChange={this.inputChange}/>
            //     )
            // }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            // render:(text,record)=>{
            //     return(
            //         <Input name={`${record.index}-${'coPotency'}`} onChange={this.inputChange}/>
            //     )
            // }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            // render:(text,record)=>{
            //     return(
            //         <Input name={`${record.index}-${'mnPotency'}`} onChange={this.inputChange}/>
            //     )
            // }
        }];
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
    }
    handleSelect(value,name){//获取下拉框的id
        let selectKey=name.props.name;//监听是第几个下拉框change了
        let selectData=`${selectKey}-${value}`
        this.props.getSynthesis(this.props.processId,'',selectData)
    }
    inputChange(e){
        let value=e.target.value //获取到输入框填的值
        let inputData=`${e.target.name}-${value}`
        this.props.getSynthesis(this.props.processId,inputData,'')
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    getLastPotency(){//获取上期浓度
       
        axios({
            url:`${this.props.url.precursorGoodIn.getLastPotencyByProcessId}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                processId:this.props.processId
            }
        }).then(data=>{
           // console.log(data.data)
        })
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[2]&&this.props.tagTableData[2].materialDetails?this.props.tagTableData[2].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[2]&&this.props.tagTableData[2].lineProDTOS?this.props.tagTableData[2].lineProDTOS:null
        return(
            <div>
                <NewButton name='上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <ReadRecipe handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible} flagConfirm={!this.props.flagConfirm}/>
                <SelectLine handleSelect={this.handleSelect} headerData={this.header}/>
                <div className='clear'></div>
                <div style={{display:'flex'}}> 
                    <Table 
                        dataSource={this.tableData}
                        rowKey={record=>record.code}
                        columns={this.columns}
                        pagination={false}
                        size='small' 
                        scroll={{y:'250px'}}
                        style={{flex:'1',height:'60vh'}}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
export default SyntheticProcess