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
            selectValue:undefined,
            name:['产品型号','产品型号','产品型号','产品型号'],
            modelBtnId:1
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
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.weight} name={`${record.index}-${'weight'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.niPotency} name={`${record.index}-${'niPotency'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.coPotency}  name={`${record.index}-${'coPotency'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.mnPotency} name={`${record.index}-${'mnPotency'}`}  onChange={this.inputChange}/>
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
    showModal(e){
        this.setState({
            visible:true,
            modelBtnId:e.target.id//获取选中按钮的id，绑定的是产线的code
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
        let {selectValue,modelBtnId,name}=this.state
        name[modelBtnId-1]=selectValue[0].product
        this.setState({
            visible:false,
            selectedRowKeys:[],
            name:name,
        })
        let selectData=`${modelBtnId}-${selectValue[0].product}`//按钮id以及选的产品型号
        this.props.getSynthesis(this.props.processId,'', selectData)
        axios({
            url:this.props.url.precursorGoodIn.getByLineByProcess,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                lineCode:modelBtnId,
                processCode:this.props.processId,
                paramId:selectValue[0].paramId,
            },
            data:this.tableData
        }).then(data=>{
            this.props.alterData(this.props.processId,data.data.data)
        })
        //this.props.alterData(this.props.processId,selectValue)
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
            url:this.props.url.processParam.recipe,
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
            type:'radio'
        };
        return(
            <div>
                <NewButton name='上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <span style={{float:'right'}}>
                    {
                        this.header?this.header.map((data,index)=>{
                            return(
                                <ReadRecipe key={data.line.code} buttonId={data.line.code} lineName={data.line.name} rowSelection={rowSelection} handleCancel={this.handleCancel} handleOk={this.handleOk}
                                 showModal={this.showModal} visible={this.state.visible} 
                                flagConfirm={!this.props.flagConfirm} data={this.state.data}
                                 name={data.product===null?'产品型号':data.product}/>
                          )
                        }):null
                    }
                </span>
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