import React from 'react'
import {Card, Table, Input} from "antd";
import Button from "antd/lib/button";
import './equpimentAssignment.css'

class Transferq extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys1:[],
            selectedRowKeys2:[],
        }
        this.debounceAjax = this.debounce(this.props.search, 500);
    }

    render(){
        const columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:"15%"
        },{
            title:'固定资产编号',
            dataIndex:'fixedassetsCode',
            key:'fixedassetsCode',
            width:"35%"
        },{
            title:'设备名称',
            dataIndex:'deviceName',
            key:'deviceName',
            width:"25%"
        },{
            title:'规格型号',
            dataIndex:'specification',
            key:'specification',
            width:"25%"
        }]
        const {selectedRowKeys1,selectedRowKeys2} = this.state;
        const rowSelection = {
            selectedRowKeys:selectedRowKeys1,
            onChange:this.onSelectChange,

        };
        const rowSelection2 = {
            selectedRowKeys:selectedRowKeys2,
            onChange:this.onSelectChange2,
        };
        return(
            <div className="eqa-transfer">
                <div className="eqa-transfer-left">
                    <Card title="待分配"
                          style={{width: "100%",height: '100%',display: 'inline-block'}}
                          bodyStyle={{height:'65vh',padding: '12px',overflow:'auto'}}>
                        <div className='eqa-transfer-right-input'>
                            <Input
                                placeholder="设备名称/规格型号"
                                onChange={this.search1}
                            />
                        </div>
                        <Table rowKey={record => record.deviceCode} columns={columns} size="small" dataSource={this.props.dataSource1}  scroll={{ y: 450 }}
                               rowSelection={rowSelection} bordered={false} pagination={false}/>
                    </Card>
                </div>

                <div className="eqa-transfer-mid">
                    <Button type="primary" size='small' className='eqa-leftButton' onClick={this.rightMove} disabled={this.state.selectedRowKeys1.length===0?true:false}>
                        <i className="fa fa-angle-right fa-lg"></i>
                    </Button>
                    <div>
                        <Button type="primary" size='small' className='eqa-rightButton' onClick={this.leftMove} disabled={this.state.selectedRowKeys2.length===0?true:false}>
                            <i className="fa fa-angle-left fa-lg"></i>
                        </Button>
                    </div>
                </div>

                <div className="eqa-transfer-right">
                    <Card title="已分配"
                          bodyStyle={{height:'65vh',padding: '12px',overflow:'auto'}}
                          style={{width: "100%",height: '100%',display: 'inline-block'}}>
                        <div className='eqa-transfer-right-input'>
                            <Input placeholder="设备名称/规格型号" onChange={this.search2} className='eqa-transfer-right-input' />
                        </div>
                        <Table rowKey={record => record.deviceCode} columns={columns} size="small" dataSource={this.props.dataSource2}
                               rowSelection={rowSelection2} bordered={false} pagination={false} scroll={{ y: 450 }}/>
                    </Card>
                </div>
            </div>
        )
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys1:selectedRowKeys });
    }

    onSelectChange2 = (selectedRowKeys) => {
        this.setState({ selectedRowKeys2:selectedRowKeys });
    }

    /** 右移按钮 未分配到已分配*/
    rightMove = () => {
        let {selectedRowKeys1} = this.state;
        this.props.changeSourceData(0, selectedRowKeys1);
        this.setState({
            selectedRowKeys1: []
        })
    }

    /** 左移按钮 已分配到未分配*/
    leftMove = () => {
        let {selectedRowKeys2} = this.state;
        this.props.changeSourceData(1, selectedRowKeys2);
        this.setState({
            selectedRowKeys2: []
        })
    }

    search1 = (event) => {
        let value = event.target.value;
        this.debounceAjax(value);
    }

    search2 = (event) => {
        let value = event.target.value;
        this.debounceAjax(value, 2);
    }

    /**
     * 防抖操作
     * 持续操作不触发回调函数
     * 持续触发后ms，执行回调函数
     * */
    debounce = (fn,ms) => {
        let timer;
        return function() {
            let args = [...arguments],context = this;
            //每次事件被触发,都会清除当前timer，然后重写设置超时调用(实现连续触发时不执行回调函数)
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
                timer = null;
            },ms)
        }
    }


}
export default Transferq;
