import React,{Component} from 'react'
import {Select,Table,Row,Col,Input} from "antd";
import './acq.css'
class ImportModal extends Component{
    constructor(props){
        super(props)

    }

    render(){

        return(
            <div className={'fire-ins-data-acq'}>
                <div>
                    <span>工序 ：</span>
                    <Select style={{width:'110.25px',marginRight:'10px'}}></Select>
                    <span>产品型号 ：</span>
                    <Select style={{width:'110px',marginRight:'10px'}}></Select>

                </div>
                <div>检验项目：</div>

                    <div className={'fireIns-add-check-group'}>

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