import React from 'react';
import {Button, Input, Table, Select, DatePicker} from "antd";
import NewButton from "../../../BlockQuote/newButton";
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
            width:'16.6%'
        }, {
            title: '物料名称',
            key: 'materialCode',
            dataIndex: 'materialCode',
            width:'16.6%',
            render: (text,record) => {
                let {rawMaterialData} = this.props;
                return (
                    rawMaterialData ?
                        <Select value={text} onChange={this.props.materialNameChange}>
                            {
                                rawMaterialData.map(e => <Option key={e.code} name={`${record.index}-${e.typeName}`} value={e.code}>{e.typeName}</Option>)
                            }
                        </Select>: null
                )
                // return <Input value={text} placeholder={'物料名称'} name={`materialName-${record.index}`} onChange={this.props.inputChange} />
            }
        }, {
            title: '物料编码',
            key: 'materialBatch',
            dataIndex: 'materialBatch',
            width:'16.6%',
            render: (text,record) => {
                return <Input value={text} placeholder={'物料名称'} name={`materialBatch-${record.index}`} onChange={this.props.inputChange} />
            }
        }, {
            title: '出库时间',
            key: 'outStockTime',
            dataIndex: 'outStockTime',
            width:'16.6%',
            render: (text,record) => {
                return <DatePicker showTime name={'1'} onChange={this.props.outStockTime}/>
        }
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width:'16.6%',
            render: (text,record) => {
                return <Input value={text} placeholder={'重量'} name={`weight-${record.index}`} onChange={this.props.inputChange} />
            }
        }, {
            title: '叫料点',
            key: 'callMaterialPoint',
            dataIndex: 'callMaterialPoint',
            width:'16.6%',
            render: (text,record) => {
                return <Input value={text} placeholder={'叫料点'} name={`callMaterialPoint-${record.index}`} onChange={this.props.inputChange} />
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
        return (
            <div className={'raw-material-add-footer'}>
                <div>
                    <label>NiSO4溶液：</label>
                    <Input placeholder='请输入' name='niConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>CoSO4溶液：</label>
                    <Input placeholder='请输入' name='coConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>MnSO4溶液：</label>
                    <Input placeholder='请输入' name='mnConcentration' style={{width: 200}} onChange={this.props.inputChange}/>
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
