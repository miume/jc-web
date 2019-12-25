import React,{Component} from 'react'
import {Select, Table, Row, Col, Input, Checkbox} from "antd";
import './acq.css'
import axios from 'axios'
const {Group}=Checkbox
const {Option}=Select
class ImportModal extends Component{
    constructor(props){
        super(props)
        this.selectChange=this.selectChange.bind(this);
    }
    selectChange(value, name) {
        let {processCode,modelCode}=this.state
        name=name.props.name
        this.setState({
            [name]:value
        })
        if((name==='processCode'&&modelCode)||(name==='modelCode'&&processCode)){
            axios({
                url:`${this.props.url.fireMageNumber}/detail`,
                method:'get',
                headers:{
                    'Authorizaion':this.props.url.Authorizaion
                },
            }).then(data=>{
                
            })
        }
    }
    render(){
        let {processData,modelData}=this.props
        return(
            <div >
                <div className={'fire-ins-data-acq'}>
                    <span>工序 ：</span>
                    <Select onChange={this.selectChange} style={{width:'110.25px',marginRight:'10px'}}>
                        {
                            processData?processData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='processCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <span>产品型号 ：</span>
                    <Select onChange={this.selectChange} style={{width:'110px',marginRight:'10px'}}>
                        {
                            modelData?modelData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='modelCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                </div>
                <div className={'fire-ins-data-acq'}>检验项目：</div>
                <div className={'fireIns-add-check-group fireIns-add-check-group-width2 fire-ins-data-acq'}>
                    <Group>
                        <Checkbox></Checkbox>
                    </Group>
                </div>
                <div>
                    <span>导入文件 ：</span>
                    <Input style={{width:'100px',marginRight:'10px'}}/>
                </div>

            </div>
        )
    }
}
export  default ImportModal