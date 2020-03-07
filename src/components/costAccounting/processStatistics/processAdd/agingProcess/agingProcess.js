import React,{Component} from 'react'
import {Table,Input} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import ReadRecipe from '../readRecipe'
import SelectLine from '../selectProductline'
import axios from 'axios'
class AgingProcess extends Component{//陈化工序
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
            width:'5%'
        },{
            title:'物料点名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'13%'
        },{
            title:'体积(m³)/重量(T)',
            dataIndex:'weiOrVol',
            key:'weiOrVol',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){//手工输入数据
                     return(
                         <Input value={record.weiOrVol} name={`${record.index}-${'weiOrVol'}`} onChange={this.inputChange}/>
                        )
                }
                else{
                    return(
                        <span>{record.weiOrVol}</span>
                    )
                }
            }
        },{
            title:'Ni(g/L)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.niPotency} name={`${record.index}-${'niPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(g/L)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.coPotency} name={`${record.index}-${'coPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(g/L)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.mnPotency} name={`${record.index}-${'mnPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent',
            width:'10%',
            render:(text,record)=>{
                return(
                    <span>{record.solidContent}</span>
                )
            }       
        }]
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getSy=this.getSy.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getWeight=this.getWeight.bind(this);
    }
    handleSelect(value,name){//获取下拉框的id
        let selectKey=name.props.name;//监听是第几个下拉框change了
        let selectData=`${selectKey}-${value}`
        this.props.getAge(this.props.processId,'',selectData)
    }
    inputChange(e){
        this.props.getAge(this.props.processId,e,'')
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getSy();
    }
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
    getSy(){ //获取陈化配方
        axios({
            url:this.props.url.processParam.compoundRecipe,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['id']=(i+1)
                }
                this.setState({
                    data:res
                })
            }
        })
    }
    getWeight(){
        this.props.weightAlterData(this.props.processId,'weiOrVol')
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[3]&&this.props.tagTableData[3].materialDetails?this.props.tagTableData[3].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[3]&&this.props.tagTableData[3].lineProDTOS?this.props.tagTableData[3].lineProDTOS:null
        const {selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
            type:'radio'
        };
        return(
            <div>
                <NewButton name='获取体积値' flagConfirm={!this.props.flagConfirm}  handleClick={this.getWeight}/>
                <NewButton name='获取上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <ReadRecipe rowSelection={rowSelection} flag={true} data={this.state.data} handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible} flagConfirm={!this.props.flagConfirm}/>
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
export default AgingProcess