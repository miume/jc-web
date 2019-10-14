import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,InputNumber,Input,Form } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddButton from '../../../BlockQuote/newButton';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";

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

class ProcessName extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            data:[],
            editingKey:""
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '25%',
        },{
            title: '工序名称',
            dataIndex: 'processName',
            key: 'periodName',
            align:'center',
            width: '25%',
            editable: true,
        },{
            title: '所属类别',
            dataIndex: 'types',
            key: 'types',
            align:'center',
            width: '25%',
            render:(text,record)=>{
                if(text == 1){
                    return "主材"
                }else{
                    return "辅材"
                }
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '25%',
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
    }

    fetch = ()=>{
        axios({
            url:`${this.url.precursorProcessType.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            if(res.length!==0){
                this.setState({
                    data:res
                })
            }
        })
    }
    save = (form,key) =>{
        form.validateFields((error,row)=>{
            if(error){
                return;
            }
            var newData = [...this.state.data];
            var index = newData.findIndex(item=>key===item.key);
            
            if(index >-1){
                const item = newData[index];
                newData.splice(index,1,{
                    ...item,
                    ...row,
                });
                var data = newData[index];
                delete data["index"];
                axios({
                    url:`${this.url.precursorProcessType.update}`,
                    method:"put",
                    headers:{
                        'Authorization':this.url.Authorization
                    },
                    data:data,
                }).then((data)=>{
                    message.info("编辑成功");
                    this.fetch()
                    this.setState({
                        data:newData,
                        editingKey:""
                    });
                })
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
                    <div className='clear' ></div>
                    <EditableContext.Provider value={this.props.form}>
                        <Table components={components} columns={columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(ProcessName);
export default EditableFormTable