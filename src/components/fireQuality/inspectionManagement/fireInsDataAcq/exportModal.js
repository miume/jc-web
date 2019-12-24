import React,{Component} from 'react'
import {Select,Table,Checkbox,Input} from "antd";
import NewButton from '../../../BlockQuote/newButton'
import './acq.css'
const {Group}=Checkbox
class ExportModal extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            key:'index',
            dataIndex:'index',
        },{
            title:'批次',
            key:'batch',
            dataIndex:'batch',
        }]
        this.state={
            selectedRowKeys:[]
        }
        this.selectChange=this.selectChange.bind(this);
        this.confirm=this.confirm.bind(this);
    }
    selectChange(value,name){

    }
    /**点击确定按钮*/
    confirm(){

    }
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    render(){
        let {selectedRowKeys}=this.state
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        return(
            <div className={'fire-ins-data-acq'}>
                <div>筛选条件(可不选)</div>
                <div>
                    <span>工序 ：</span>
                    <Select placeholder={'请选择工序'} style={{width:'20%',marginRight:'10px'}}></Select>
                    <span>产品型号 ：</span>
                    <Select placeholder={'请选择产品型号'} style={{width:'20%',marginRight:'10px'}}></Select>
                    <span>日期 ：</span>
                    <Select placeholder={'请选择日期'} style={{width:'20%',marginRight:'10px'}}></Select>
                    <NewButton name='确定' handleClick={this.confirm}/>
                </div>
                <div>检验项目：</div>
                <div className={'fireIns-add-display'}>
                    <div className={'fireIns-add-check-group'}>
                        <Group>
                            <Checkbox></Checkbox>
                        </Group>
                    </div>
                    <Table style={{width:'55%'}} rowSelection={rowSelection} columns={this.columns} pagination={false} rowKey={record => record.index} scroll={{y:'200px'}} size={'small'} bordered/>
                </div>
                <div>
                    <span>导出位置 ：</span>
                    <Input style={{width:'200px',marginRight:'10px'}}/>
                </div>

            </div>
        )
    }
}
export  default ExportModal