import React from "react";
import '../Home/page.css';
import { Table,Popconfirm,Divider,message,InputNumber,Input,Form } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import AddButton from '../BlockQuote/newButton';
import SearchCell from '../BlockQuote/search';

const EditableContext = React.createContext();

class EditableCell extends React.Component{
    getInput = ()=>{
        if(this.props.inputType === "number"){
            return <InputNumber />
        }
        return <Input />;
    };

    renderCell = ({getFieldDecorator})=>{
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {
                    editing?(
                        <Form.Item style={{margin:0}}>
                            {
                                getFieldDecorator(dataIndex,{
                                    rules:[{
                                        required:true,
                                        message:`请输入${title}`
                                    }],
                                    initialValue:record[dataIndex],
                                })(this.getInput())
                            }
                        </Form.Item>
                    ):(
                        children
                    )
                }
            </td>
        )
    };

    render(){
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    }
}

class statisticalPeriod extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            data:[{
                index:1,
                startTime:1,
                periodName:"测试周期",
                defaultTime:7,
            },{
                index:2,
                startTime:2,
                periodName:"测试周期",
                defaultTime:21,
            },{
                index:3,
                startTime:3,
                periodName:"测试周期",
                defaultTime:30,
            }],
            editingKey:""
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '20%',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '20%',
        },{
            title: '周期名称',
            dataIndex: 'periodName',
            key: 'periodName',
            align:'center',
            width: '20%',
        },{
            title: '默认时长(天)',
            dataIndex: 'defaultTime',
            key: 'defaultTime',
            align:'center',
            width: '20%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                const {editing} = this.state;
                const editable = this.isEditing(record)
                return (
                    <span>
                        <span>
                            {editable ? (
                                <span></span>
                            ):(
                                <span className='blue' onClick={() => this.edit(record.index)}>编辑</span>
                            )
                            
                            }
                        </span>
                        <Divider type="vertical" />
                        <span className="blue" onClick={this.delete.bind(this,record)}>删除</span>
                    </span>
                )
            }
        }]
    }
    isEditing = record=>record.index === this.state.editingKey;
    delete = (record)=>{
        // console.log(record)
        var data = this.state.data;
        data.splice(record.index-1,1);
        this.setState({
            data:data
        })
    }
    edit=(key)=>{
        this.setState({
            editingKey:key
        })
    }
    add = ()=>{
        var data = this.state.data;
        var len = data.length;
        data.push({
                index:len+1,
                startTime:1,
                periodName:"测试周期",
                defaultTime:7,
        });
        this.setState({
            data:data
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddButton key="submit" handleClick={this.add} name='新增周期' className='fa fa-plus' />
                    <SearchCell flag={true}/>
                    <div className='clear' ></div>
                    <Table columns={this.columns} rowSelection={{}} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default statisticalPeriod