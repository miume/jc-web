import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Form, Input, message, Spin} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import SearchCell from "../../../BlockQuote/search";
import axios from "axios";
import DeleteByIds from "../../../BlockQuote/deleteByIds";

const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {

    getInput = () => {

        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            record,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    this.form = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `${title}不能为空`,
                                        }],


                                        initialValue: record[dataIndex],

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


class RepoBasicCategory extends React.Component {
    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: [],
            selectedRowKeys: [],//最开始一条记录也没选
            searchContent: '',
            editingKey: '',
            loading: false
        }
        this.pagination = {
            pageSize: 10,
            current: 1
        };
    }


    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('repoBasic'));
        //this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === this.current.path)[0].operations : null;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.deleteCancel}
                                 //flag={this.judgeOperation(this.operation, 'SAVE')}
                                 flag = {1}
                    />
                    <SearchCell name='请输入送样工厂'
                                searchEvent={this.searchEvent}
                                searchContentChange={this.searchContentChange}
                                fetch={this.fetch}
                        //flag={this.judgeOperation(this.operation, 'QUERY')}
                                flag={1}
                    />
                    <div className='clear'></div>
                </Spin>
            </div>
        );
    }

    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: "/repoBasic"});
    }

    judgeOperation = (operation, operationCode) => {
        var flag = operation ? operation.filter(e => e.operationCode === operationCode) : [];
        //console.log(flag);
        return flag.length > 0 ? true : false
    }

    fetch = (flag, data = {}, pagination) => {
        var dataSource = []
        for (var i = 1; i < 20; i++){
            dataSource.push({
                code: i,
                col1: i,
                col2: `${"部门F-"+ i}`,
                col3: `${"原料未包装-" + i}`,
                cole4: 0,
            })
        }
        this.setState({
            dataSource: dataSource
        })
    }

    handleClick = (code) => {

    }

    /**批量删除弹出框确认函数 */
    deleteByIds() {
        const ids = this.state.selectedRowKeys;//删除的几行的id
        // axios({
        //     url:`${this.url.deliveryFactory.deliveryFactory}?ids=${ids}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization' :this.url.Authorization
        //     },
        //     data:ids,//前端要传的参数放在data里面，
        //     type:'json'
        // })
        //     .then((data)=>{
        //         message.info(data.data.message);
        //         if(data.data.code===0){
        //             if(this.pagination.total%10===1){
        //                 this.pagination.current=this.pagination.current-1;
        //             }
        //             this.fetch({
        //                 size:this.pagination.pageSize,
        //                 page:this.pagination.current,
        //                 orderField:'id',
        //                 orderType:'desc'
        //             });//调用getAllByPage,渲染删除后的表格
        //         }
        //
        //         this.setState({
        //             selectedRowKeys:[]
        //         });
        //     })//处理成功
        //     .catch(()=>{
        //         message.info('删除失败，请联系管理员！')
        //     });//处理异常
    }

    deleteCancel() {//批量删除的取消，要将那个checkbox置空
        this.setState({
            selectedRowKeys: []
        });
    }

    /**---------------------- */
        //获取查询时用户名称的实时变化
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent: value});
    }

    //根据用户名称分页查询
    searchEvent = () => {
        const name = this.state.searchContent;
        // axios({
        //     url: `${this.url.deliveryFactory.search}`,//${variable}是字符串模板，es6使用反引号``创建字符串
        //     method: 'get',
        //     headers: {
        //         'Authorization': this.url.Authorization
        //     },
        //     params: {
        //         size: this.pagination.pageSize,
        //         //page:this.pagination.current,
        //         name: name
        //     },
        //     type: 'json'
        // }).then((data) => {
        //         const res = data.data.data;
        //         this.pagination.total = res.total ? res.total : 0;
        //         this.pagination.current = res.pageNum;
        //         if (res && res.list) {
        //             for (var i = 1; i <= res.list.length; i++) {
        //                 res.list[i - 1]['index'] = res.prePage * 10 + i;
        //             }
        //             this.setState({
        //                 dataSource: res.list,//list取到的是所有符合要求的数据
        //                 searchContent: ''
        //             });
        //         }
        //     })
        //     .catch(() => {
        //         message.info('查询失败，请联系管理员！')
        //     });
    }
}

export default RepoBasicCategory;