import React from 'react';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote'
import {
    Button, Table, Popconfirm, Divider, Pagination, Form, Input, Row, Col, Select, Modal, Icon, message} from 'antd';
import DeleteByIds from '../BlockQuote/deleteByIds';
import Add from './add';
import SearchCell from '../BlockQuote/search';
import home from '../commom/fns'
import Mmodal from './mmodal'
import "./eqMaintenanceDataEntry.css"
import NewButton from "../BlockQuote/newButton";
import CancleButton from "../BlockQuote/cancleButton";
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const Option = Select.Option;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
    getInput = () => {
        return <Input />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    this.form = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `${title}不能为空`,
                                        }],
                                        initialValue:record[dataIndex],
                                    })(this.getInput())
                                    }
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}
class Right extends React.Component{
    url
    operation
    // componentDidMount(){
    //     this.fetch();
    // }
    componentWillUnmount(){
        this.setState = ()=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys : [],     //存取所选中checkbox的ids
            searchContent:'',
            editingKey:'',
            allProductionProcess:[],
            detailData:[],
            pageChangeFlag:0,        //0表示getAllPage分页查询，
            visible:false,
        }
        // this.fetch = this.fetch.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.save = this.save.bind(this);
        this.isEditing = this.isEditing.bind(this)
        this.edit = this.edit.bind(this)
        this.deleteCancel = this.deleteCancel.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        // this.pagination = {
        //     total:this.props.datasource.length,
        //     showSizeChanger: true,
        //     itemRender(current, type, originalElement){
        //         if (type === 'prev') {
        //             return <a>&nbsp;&nbsp;上一页&nbsp;&nbsp;</a>;
        //         }
        //         if (type === 'next') {
        //             return <a>&nbsp;&nbsp;下一页&nbsp;&nbsp;</a>;
        //         }
        //         return originalElement;
        //     },
        //     showTotal(total){
        //         return `共${total}条记录`
        //     },
        //
        // };

        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter:(a, b) => a.id-b.id,
            width: '8%',
            align:'left',
            editable: false
        }, {
            title: '保养项目',
            dataIndex: 'maintenanceItems' ,
            key: 'maintenanceItems',
            width: '20%',
            align:'left',
            editable: false
        }, {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:  'maintenanceContent',
            width: '20%',
            align:'left',
            editable: true
         },{
            title: '操作类型',
            dataIndex: 'optType',
            key: 'optType',
            width: '10%',
            align:'left',
            editable: true
        },{
            title:'频率',
            dataIndex:'maintenanceFrequency',
            key:'maintenanceFrequency',
            align:'left',
            width:'10%',
            editable: false
         },
          {
            title: '操作',
            dataIndex: 'maintenance.operation',
            key:'operation',
            align:'left',
            render: (text,record) => {
                const editable = this.isEditing(record);
                return (
                    <span>
                        <Mmodal clickdeviceName={this.props.clickdeviceName} code={record.code} url={this.props.url} ffetch={this.props.ffetch } fetch={this.props.fetch}
                                maintenanceContent={record.maintenanceContent}
                                maintenanceFrequency={record.maintenanceFrequency}
                                maintenanceItems={record.maintenanceItems}
                                optType={record.optType}
                        />
                        {home.judgeOperation(this.operation,'DELETE')?<Divider type='vertical' />:''}
                        <span className={home.judgeOperation(this.operation,'DELETE')?'':'hide'}><Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                <span className='blue'>删除</span>
                </Popconfirm>
              </span>
                  </span>
                );
            }
        }];
    }
    edit(id) {
        this.setState({ visible: true });
    }
    isEditing (record)  {
        return record.project === this.state.editingKey;
    };
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    save(form, id) {
        //row代表修改后的数据,item代表原始数据
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = this.state.dataSource;
            const index = newData.findIndex(item => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
                /** * splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
                 * arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
                 * arrayObject.splice(index,howmany,item1,.....,itemX)
                 * index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
                 howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
                 item1, ..., itemX	可选。向数组添加的新项目。
                 */
                const data=row;
                /**将id变成字符串 */
                data['id']=id.toString();
                //console.log(data);
            //     axios({
            //         url:`${this.url.deliveryFactory.deliveryFactory}`,
            //         method:'put',
            //         headers:{
            //             'Authorization':this.url.Authorization
            //         },
            //         data:data,
            //         type:'json'
            //     })
            //         .then((data)=>{
            //             // console.log(data);
            //             message.info(data.data.message);
            //             // this.fetch();
            //             this.setState({dataSource:newData});
            //         })
            //         .catch(()=>{
            //             // console.log(error.data);
            //             message.info('编辑失败，请联系管理员！');
            //         });
            //     this.setState({editingKey: '' });
            // } else {
            //     newData.push(row);
            //     this.setState({ dataSource: newData, editingKey: '' });
             }
        });
    }

    deleteCancel(){//批量删除的取消，要将那个checkbox置空
        this.setState({
            selectedRowKeys:[]
        });
    }
    //实现checkbox全选
    /**table变化时 */

    /**批量删除弹出框确认函数 */
    deleteByIds =() =>  {
        const ids = this.state.selectedRowKeys;
        console.log(ids)
        axios({
            url:`${this.props.url.eqMaintenanceDataEntry.deleteIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
              data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.props.ffetch(this.props.clickdeviceName)
                // this.fetch({
                //     size: this.pagination.pageSize,
                //     page: this.pagination.current,
                //     orderField: 'id',
                //     orderType: 'desc',
                // });
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    /**取消批量删除 */
    cancle() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }
    /**实现全选 */
    onSelectChange=(selectedRowKeys)=> {
        this.setState({ selectedRowKeys });
        console.log(this.state.selectedRowKeys)
    }
    /**处理单条记录删除 */
    handleDelete=(id)=>{
        console.log(id)
        axios({
            url:`${this.props.url.eqMaintenanceDataEntry.maintenance}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=> {
            message.info(data.data.message);
            // this.props.fetch()
            this.props.ffetch(this.props.clickdeviceName)
            // this.fetch({
            //     pageSize: this.state.pagination.pageSize,
            //     pageNumber: this.state.pagination.current,
            // })
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        })
        }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**实时跟踪搜索框内容的变化 */
    searchContentChange(e){
        const value = e.target.value;
        //console.log(value)
        this.setState({
            searchContent:value
        })
    }
    /**绑定搜索事件 */
    searchEvent(){
        const condition=this.state.searchContent;
        // // console.log(this.pagination);
        this.props.ffetch3(this.props.clickdeviceName,this.state.searchContent)
    }
    /**通过id查询详情 */
    render() {
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        this.current=this.props.current

        this.operation = this.props.operation
        this.status = JSON.parse(localStorage.getItem('status'));
        const {selectedRowKeys,pagination} = this.state;
        const components={
            body:{
                row:EditableFormRow,
                cell:EditableCell,
            },
        };
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,

        };

        const addFlag = home.judgeOperation(this.operation,'SAVE')
        this.datasource=this.props.datasource
        return (
                <div >
                    <Add deviceDatas={this.props.deviceDatas}  url={this.props.url} ffetch={this.props.ffetch} clickdeviceName={this.props.clickdeviceName} fetch={this.props.fetch}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}
                                 flag={home.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell name='请输入搜索人' searchContentChange={this.searchContentChange} searchEvent={this.searchEvent}
                                fetch={this.fetch} flag={home.judgeOperation(this.operation,'QUERY')}/>

                    <Table rowKey={record => record.code}
                           rowSelection={rowSelection}
                           components={components}
                           columns={this.columns}
                           dataSource={this.datasource}
                           pagination={this.props.pagination}
                           onChange={this.props.handleTableChange}
                           size="small"
                           bordered
                           scroll={{ y: 380 }}
                           style={{paddingTop:'5px'}}
                    />
                </div>
        );
    }
}
export default Right