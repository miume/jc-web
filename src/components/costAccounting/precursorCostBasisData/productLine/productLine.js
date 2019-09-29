import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,InputNumber,Input,Form } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddButton from '../../../BlockQuote/newButton';
import SearchCell from '../../../BlockQuote/search';

const EditableContext = React.createContext();

class EditableCell extends React.Component{
    getInput = ()=>{
        if(this.props.inputType === "number"){
            return <InputNumber />;
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

class ProductLine extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            data:[{
                key:1,
                index:1,
                productName:"测试生产线",
            },{
                key:2,
                index:2,
                productName:"测试生产线",
            },{
                key:3,
                index:3,
                productName:"测试生产线",
            }],
            editingKey:""
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '33%',
        },{
            title: '生产线名称',
            dataIndex: 'productName',
            key: 'periodName',
            align:'center',
            width: '33%',
            editable: true,
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '33%',
            render:(text,record)=>{
                const editable = this.isEditing(record)
                return (
                    <span>
                        <span>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {
                                            form=>(
                                                <a 
                                                    onClick={()=>this.save(form,record.key)}
                                                    style={{marginRight:8}}
                                                >
                                                保存
                                                </a>
                                            )
                                        }
                                    </EditableContext.Consumer>
                                    <Popconfirm title="确定取消?" onConfirm={()=>this.cancel(record.key)}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
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

    cancel = () =>{
        this.setState({
            editingKey:""
        })
    }
    save = (form,key) =>{
        form.validateFields((error,row)=>{
            if(error){
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item=>key===item.key);
            if(index >-1){
                const item = newData[index];
                newData.splice(index,1,{
                    ...item,
                    ...row,
                });
                this.setState({
                    data:newData,
                    editingKey:""
                });
            }else{
                newData.push(row);
                this.setState({
                    data:newData,
                    editingKey:""
                });
            }
        });
    }

    edit=(key)=>{
        this.setState({
            editingKey:key
        })
    }
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
                key:len+1,
                index:len+1,
                productName:"测试生产线",
        });
        this.setState({
            data:data
        })
    }
    render(){
        const components = {
            body:{
                cell:EditableCell,
            }
        };
        const columns = this.columns.map(col=>{
            if(!col.editable){
                return col;
            }
            return {
                ...col,
                onCell:record=>({
                    record,
                    inputType:col.dataIndex === "defaultTime"?"number":"text",
                    dataIndex:col.dataIndex,
                    title:col.title,
                    editing:this.isEditing(record),
                }),
            };
        });
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddButton key="submit" handleClick={this.add} name='新增生产线' className='fa fa-plus' />
                    <SearchCell flag={true}/>
                    <div className='clear' ></div>
                    <EditableContext.Provider value={this.props.form}>
                        <Table components={components} columns={columns} rowSelection={{}} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(ProductLine);
export default EditableFormTable