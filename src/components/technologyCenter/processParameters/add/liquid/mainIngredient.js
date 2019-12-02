import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input} from "antd";

class MainIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
        },{
            title: 'Ni',
            dataIndex: 'niMax',
            key: 'niMax',
            width: '26%',
            render: (text,record) => {
                return (
                    <span style={{display:'flex'}}>
                        <Input name={`zy-niMax-${record.index}`} onChange={this.props.inputChange} placeholder='请输入上限'/>
                        <span className='process-params-table-part-symbol'>~</span>
                        <Input  name={`zy-niMin-${record.index}`} onChange={this.props.inputChange} placeholder='请输入下限'/>
                    </span>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: 'Co',
            dataIndex: 'coMax',
            key: 'coMax',
            width: '26%',
            render: (text,record) => {
                return (
                    <span style={{display:'flex'}}>
                        <Input name={`zy-coMax-${record.index}`} onChange={this.props.inputChange} placeholder='请输入上限'/>
                        <span className='process-params-table-part-symbol'>~</span>
                        <Input  name={`zy-coMin-${record.index}`} onChange={this.props.inputChange} placeholder='请输入下限'/>
                    </span>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: 'Mn',
            dataIndex: 'mnMax',
            key: 'mnMax',
            width: '26%',
            render: (text,record) => {
                return (
                    <span style={{display:'flex'}}>
                        <Input name={`zy-mnMax-${record.index}`} onChange={this.props.inputChange} placeholder='请输入上限'/>
                        <span className='process-params-table-part-symbol'>~</span>
                        <Input  name={`zy-mnMin-${record.index}`} onChange={this.props.inputChange} placeholder='请输入下限'/>
                    </span>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (text,record) => {
                return <span className='blue' onClick={() => this.props.delete(record.index)} >删除</span>
            }
        }]
    }

    render() {
        let {data,liquidChange} = this.props;
        return (
            <div>
                <NewButton handleClick={this.props.add} name='新增' className='fa fa-plus'/>
                <Table dataSource={data} rowKey={record => record.index} columns={this.columns}
                       pagination={false} bordered size={'small'}/>
                <div style={{marginTop:5}}>
                    <span>Zr(g/L)：</span>
                    <Input name={'zrStandard'} onChange={liquidChange} style={{width:100}}/> ± <Input name={'zrBias'} onChange={liquidChange} style={{width:100}}/>
                </div>
            </div>
        )
    }
}

export default MainIngredient;
