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
            visible:false,
            data:[],
            selectedRowKeys:[],
            selectValue:undefined
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
            width:"13%",
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.volume} name={`${record.index}-${'volume'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.solidContent}</span>
                )
            }
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.niPotency} </span>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.coPotency}</span> 
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.mnPotency}</span> 
                )
            }
        }];
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getSy=this.getSy.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
    }
    handleSelect(value,name){//获取下拉框的id
        let selectKey=name.props.name;//监听是第几个下拉框change了
        let selectData=`${selectKey}-${value}`
        this.props.getSynthesis(this.props.processId,'',selectData)
    }
    inputChange(e){
        this.props.getSynthesis(this.props.processId,e,'')
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getSy()
    }
      //实现checkbox选择
    onSelectChange(selectedRowKeys,value) {
        this.setState({ 
            selectedRowKeys:selectedRowKeys,
            selectValue:value 
        });
    }
    handleOk(){
        this.setState({
            visible:false,
            selectedRowKeys:[]
        })
        let {selectValue}=this.state
        this.props.alterData(this.props.processId,selectValue)
    }
    handleCancel(){
        this.setState({
            visible:false,
            selectedRowKeys:[]
        })
    }
    getLastPotency() {//获取上期浓度
        this.props.getLastPotency(this.props.processId)
    }
    getSy(){ //合成获取配方
        axios({
            url:this.props.url.processParam.compoundRecipe,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['id']=(res.page-1)*(res.size)+(i+1)
                }
                this.setState({
                    data:res.list
                })
            }
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
        const {selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        return(
            <div>
                <NewButton name='上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <ReadRecipe  rowSelection={rowSelection}  flag={true} handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible} flagConfirm={!this.props.flagConfirm} data={this.state.data}/>
                <SelectLine handleSelect={this.handleSelect} headerData={this.header}/>
                <div className='clear'></div>
                <div style={{display:'flex'}}> 
                    <Table 
                        dataSource={this.tableData}
                        rowKey={record=>record.code}
                        columns={this.columns}
                        pagination={false}
                        size='small' 
                        scroll={{y:'42vh'}}
                        style={{flex:'1',height:'60vh'}}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
export default SyntheticProcess