import React from 'react';
import {Button, Input, Table, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import DateSelect from './dateSelect';
const {Option} = Select;

class AddTable extends React.Component {
    constructor(props) {
        super(props);
        this.getFooter = this.getFooter.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.index - b.index,
            width:'10%'
        }, {
            title: '物料名称',
            key: 'materialCode',
            dataIndex: 'materialCode',
            width:'20%',
            render: (text,record) => {
                let {rawMaterialData} = this.props;
                return (
                    rawMaterialData ?
                        <Select value={text} placeholder={'请选择物料名称'} onChange={this.props.materialNameChange} style={{width:'100%'}}>
                            {
                                rawMaterialData.map(e => <Option key={e.code} name={`${record.index}-${e.materialName}-${e.typesCode}`} value={e.code}>{e.materialName}</Option>)
                            }
                        </Select>: null
                )
            }
        }, {
            title: '物料编码',
            key: 'materialBatch',
            dataIndex: 'materialBatch',
            width:'20%',
            render: (text,record) => {
                return <Input value={text} placeholder={'物料编码'} name={`materialBatch-${record.index}-str`} onChange={this.props.inputChange} />
            }
        }, {
            title: '出库时间',
            key: 'outStockTime',
            dataIndex: 'outStockTime',
            width:'20%',
            render: (text,record) => {
                return <DateSelect index={record.index} date={text} outStockTime={this.props.outStockTime}/>
        }
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width:'15%',
            render: (text,record) => {
                return <Input value={text} placeholder={'重量'} name={`weight-${record.index}`} onChange={this.props.inputChange} />
            }
        }, {
            title: '叫料点',
            key: 'callMaterialPoint',
            dataIndex: 'callMaterialPoint',
            width:'15%',
            render: (text,record) => {
                return <Input value={text} placeholder={'叫料点'} name={`callMaterialPoint-${record.index}-str`} onChange={this.props.inputChange} />
            }
        }]

    }

    render() {
        let {visible,addItem,getPreviousConcentration,getFeedData,data} = this.props;
        return (
            <div className={visible ? 'raw-material-add-table' : 'hide'}>
                <div className={'raw-material-add-margin'}>
                    <NewButton name={'新增'} handleClick={addItem}/>
                    <Button className='white-button' onClick={getPreviousConcentration}>上期浓度</Button>
                    <Button className='white-button' style={{width:86}} onClick={getFeedData}>补料</Button>
                </div>
                <Table size={"small"} columns={this.columns} bordered dataSource={data}
                       pagination={false} rowKey={record => record.index}
                       footer={this.getFooter} scroll={{y:150}}/>
            </div>
        )
    }

    getFooter() {
        let {niConcentration,coConcentration,mnConcentration} = this.props;
        return (
            <div className={'raw-material-add-footer'}>
                <div>
                    <label>Ni(%)：</label>
                    <Input placeholder='请输入' value={niConcentration} name='niConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>Co(%)：</label>
                    <Input placeholder='请输入' value={coConcentration} name='coConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>Mn(%)：</label>
                    <Input placeholder='请输入' value={mnConcentration} name='mnConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddTable;
