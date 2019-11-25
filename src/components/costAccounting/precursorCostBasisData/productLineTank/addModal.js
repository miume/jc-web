import React from "react";
import {Modal, Input,message,Select,Checkbox,Col } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import '../tankValue/tank.css'
const {Option}=Select
const {Group}=Checkbox
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            productLine:'',
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
                processCode:3
            }
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                
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
            productLine:'',
            tank:[],
        })
    }
    handleCreate = () =>{
        
        let {productLine,tank}=this.state
        if(!productLine||tank.length===0){
            message.error('信息填写不完整!')
            return
        }
        let data={lineCode:productLine,materialDTOS:[]}
        let mate={}
        for(let i=0;i<tank.length;i++){
            mate['materialCode']=tank[i].split('-')[0]
            mate['materialName']=tank[i].split('-')[0]
            data.materialDTOS.push(mate)
        }
        axios({
            url:`${this.url.techLineCellMap.add}`,
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
            this.setState({
                visible:false,
                productLine:'',
                tank:[],
            })
        })
        this.setState({
            visible:false,
        })
    }
    change = (data)=>{
        this.setState({
            productLine:data
        })
    }
    onChange = (e)=>{
        this.setState({
            tank:e
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const options = [
            { label: 'Ni', value: 'Ni' },
            { label: 'Co', value: 'Co' },
            { label: 'Mn', value: 'Mn' },
          ];
        return(
            <span>
                {this.props.editFlag?<span onClick={this.showModal} className='blue'>编辑</span>
                :<AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />}
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title={this.props.editFlag?"编辑":"新增"}
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                     生产线：<Select onChange={this.change}  placeholder="请选择生产线" style={{width:"400px"}}>
                        {
                            this.state.line?this.state.line.map((data)=>{
                                return(
                                    <Option key={data.code} value={data.code}>{data.name}</Option>
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