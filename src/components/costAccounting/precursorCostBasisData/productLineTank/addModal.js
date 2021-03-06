import React from "react";
import {Modal, Input,message,Select,Checkbox,Col } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import '../tankValue/tank.css'
import { lang } from "moment";
const {Option}=Select
const {Group}=Checkbox
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            productLine:undefined,
            lineName:undefined,
            tank:[],
            line:[],
            materiaNameData:[]
        }
        this.getAllLine=this.getAllLine.bind(this);
        this.getMaterial=this.getMaterial.bind(this);
        this.editFlag=this.getEditData.bind(this);
    }
    componentDidMount(){
        this.getAllLine()
        this.getMaterial()
        
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getAllLine(){
        axios({
            url:`${this.url.precursorProductionLine.all}`,
            method:'get',
            headers:{
              'Authorization':this.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    line:res
                })
            }
          })
    }
    getMaterial(){//获取合成工序下所有物料名称
        axios({
            url:`${this.url.precursorMaterialDetails.getMaterialByProcessType}`,
            method:'get',
            headers:{
              'Authorization':this.url.Authorization
            },
            params:{
                processCode:3
            }
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    materiaNameData:res
                })
            }
          })
    }
    getEditData(){
        axios({
            url:`${this.url.techLineCellMap.getRecordById}`,
            method:'get',
            headers:{
              'Authorization':this.url.Authorization
            },
            params:{
                id:this.props.code
            }
          }).then((data)=>{
            const res = data.data.data;
           if(res){
               let data=res.materialDTOS
               let newData=[]
               for(let i=0;i<res.materialDTOS.length;i++){
                    let da=`${res.materialDTOS[i]['materialCode']}-${res.materialDTOS[i]['materialName']}`
                    newData.push(da)
               }
                this.setState({
                    productLine:res.lineCode,
                    lineName:res.lineName,
                    tank:newData
                })
            }
          })
    }
    showModal = () => {
        this.setState({ visible: true });
        if(this.props.editFlag){
            this.getEditData()
        }
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            productLine:undefined,
            tank:[],
            lineName:undefined,
        })
    }
    handleCreate = () =>{
        
        let {productLine,tank,lineName}=this.state
        if(!productLine||tank.length===0){
            message.error('信息填写不完整!')
            return
        }
        let data={lineCode:productLine,lineName:lineName,materialDTOS:[]}
        
        for(let i=0;i<tank.length;i++){
            let mate={}
            mate['materialCode']=tank[i].split('-')[0]
            mate['materialName']=tank[i].split('-')[1]
            data.materialDTOS.push(mate)
        }
        axios({
            url:this.props.editFlag?`${this.url.techLineCellMap.update}`:`${this.url.techLineCellMap.add}`,
            method:this.props.editFlag?"put":"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
            if(data.data.code===0){
                message.info("操作成功");
                this.props.fetch();
            }
            else{
                message.info(data.data.message);
            }
            this.setState({
                visible:false,
                productLine:undefined,
                lineName:undefined,
                tank:[],
            })
        }).catch(error=>{
           message.error('操作失败，请联系管理员!')
        })
        this.setState({
            visible:false,
        })
    }
    change = (value,name)=>{
        let lineName=name.props.name
        this.setState({
            productLine:value,
            lineName:lineName
        })
    }
    onChange = (e)=>{
        this.setState({
            tank:e
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {addFlag,updateFlag}=this.props
        const options = [
            { label: 'Ni', value: 'Ni' },
            { label: 'Co', value: 'Co' },
            { label: 'Mn', value: 'Mn' },
          ];
        return(
            <span>
                {this.props.editflag?<span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                :<span className={addFlag?'':'hide'}>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                </span>}
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title={this.props.editFlag?"编辑":"新增"}
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                     生产线：<Select onChange={this.change} value={this.state.productLine} placeholder="请选择生产线" style={{width:"400px"}}>
                        {
                            this.state.line?this.state.line.map((data)=>{
                                return(
                                    <Option key={data.code} value={data.code} name={data.name}>{data.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <br /><br />
                    
                    合成槽：
                    <div style={{ display:'inline-block',width: '400px',height:'150px',overflowY:'auto',border:"1px solid #E4E4E4",padding:"10px"}}>
                        <Group  onChange={this.onChange} value={this.state.tank}>
                            {this.state.materiaNameData?this.state.materiaNameData.map(data=>{
                                return(
                                <Col key={data.code} span={8}> <Checkbox  value={`${data.code}-${data.materialName}`}>{data.materialName}</Checkbox></Col>
                                )
                            }

                            ):null}
                        </Group>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default AddModal