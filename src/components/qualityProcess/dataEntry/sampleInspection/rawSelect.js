import React from "react";
import {Modal,Button,Select,Table,Radio} from "antd";
import axios from "axios";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddButton from '../../../BlockQuote/newButton';

const { Option } = Select;
// const children = [];
// for (let i = 10; i < 36; i++) {
//     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }
class RawSelect extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:[],
            batchRule:"",
            children:[],
            selValue:[]
        }
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '编号',
        dataIndex: 'batch',
        key: 'batch',
        align:'center',
        width: '80%',
        render:(sampleDeliveringDate)=>{
            return <span title={sampleDeliveringDate} className='text-decoration'>{sampleDeliveringDate.substring(0,10)}</span>
        }
    },{
        title: '主检记录',
        dataIndex: 'flag',
        key: 'flag',
        align:'center',
        width: '10%',
        render:(flag,record)=>{
            return <Radio onChange={this.flagChange} id={record.index} checked={flag} className="defaultRadio" />
        }
    }]

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div style={{zIndex:"999"}}>
                <Button onClick={this.batchClick} style={{width:"100%"}}>{this.props.batchRule==""?"多批送检":this.props.batchRule}</Button>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    title="多批送检"
                    width="800px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.onCancel}/>,
                        <AddButton key="submit" handleClick={this.onCenter} name='确定' className='fa fa-check' />
                    ]}
                >
                    <div className="rawSelectTop">
                        <Select
                            mode="tags"
                            size="default"
                            placeholder="Please select"
                            onChange={this.handleSelChange}
                            style={{ width: '85%' }}
                            value={this.state.selValue}
                        >
                            {this.state.children}
                        </Select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.selButton} style={{width:"15%"}}>确认</Button>
                    </div>
                    <div className="rawSelectTable">
                        <Table
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                            size="small"
                            bordered
                            rowKey={record => record.index}
                            // onChange={this.handleTableChange}
                            scroll={{ y: 400 }}
                            pagination={false}
                        />
                    </div>
                </Modal>
            </div>
        )
    }

    flagChange = (e)=>{
        console.log(e.target.id)
        console.log(e.target.checked)
        this.getRadio(e.target.id,e.target.checked);
    }
    getRadio = (index,checked) => {
        console.log(index)
        var dataSource = this.state.dataSource;
        for (let i = 0; i < dataSource.length; i++) {
            if (i === index-1) {
                dataSource[i].flag = true;
            } else {
                dataSource[i].flag = false;
            }
        }
        this.setState({
            dataSource: dataSource,
        })
    }

    handleSelChange = (value) => {
        console.log(`Selected: ${value}`);
        this.setState({
            selValue:value
        })
    }
    selButton = () => {
        const selValue = this.state.selValue;
        var dataSource = this.state.dataSource;
        const len = this.state.dataSource.length;
        for (let i = 0; i < selValue.length; i++) {
            dataSource.push({
                index: len + i + 1,
                id: i,
                batch:selValue[i],
                flag: false
            })
        }
        this.setState({
            dataSource: dataSource,
            selValue: []
        })
    }



    batchClick = ()=>{
        this.fetch();
        this.setState({
            visible:true
        })
    }
    fetch = () =>{
        var children = []
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        this.setState({
            children:children
        })
        // axios({
        //     url:`${this.url.productionBatchRule.getAllInfos}`,
        //     method:"get",
        //     headers:{
        //         'Authorization': this.url.Authorization
        //     },
        // }).then((data)=>{
        //     const res = data.data.data;
        //
        // })

    }
    onCancel = ()=>{
        this.setState({
            visible:false,
            ruyear:undefined,
            rupro:undefined,
            rumon:undefined,
            ruser:undefined,
            ruproNum:undefined,
            ruproLin:undefined,
            rumaterial:undefined,
            ruprocess:undefined,
            ruslot:undefined,
            ruslotNum:undefined,
            batchRule:""
        })
    }
    onCenter = ()=>{
        let batchRule = this.state.ruyear+""+this.state.rupro+""+this.state.rumon+""+this.state.ruser+""+this.state.ruproNum+""+this.state.ruproLin+
        ""+this.state.rumaterial
        // +""+this.state.ruprocess+""+this.state.ruslot+""+this.state.ruslotNum;
        console.log(batchRule)
        this.props.onBatchCenter(batchRule);
        this.setState({
            visible:false,
            ruyear:undefined,
            rupro:undefined,
            rumon:undefined,
            ruser:undefined,
            ruproNum:undefined,
            ruproLin:undefined,
            rumaterial:undefined,
            ruprocess:undefined,
            ruslot:undefined,
            ruslotNum:undefined,
            batchRule:batchRule
        })
    }

}

export default RawSelect
