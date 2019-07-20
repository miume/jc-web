import React from "react";
import {size,Table,DatePicker,Input,Button,Divider, Tag} from "antd";
import axios from "axios";
import "./completed.css"
import Detail from "./detailModal";
import DepartTable from "../../departManagement/departTable";
import home from "../../commom/fns";
import SearchCell from "./search";
// let data=[ ];
// for(var i=0;i<100;i++){
//     data.push({
//         index:i,
//         odd_number:'by12345',
//         number:'管道阀门/#1001',
//         department:'制造一部',
//         date:'2019-07-18',
//         time:'2019-07-17 10:00',
//         deadline:'2019-8-17',
//         someone:'ww',
//     })
//
// }

class Right extends React.Component {
    url;
    operation
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            visible:'false',
            data:[],
            searchContent:'',
            searchText: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        }

    }
    onclick=()=>{
        this.setState({
            visible:true,
        })

    }
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            sorter: (a, b) => a.index - b.index,
            key: 'index',
            align:'center',
        },
        {
            title: '保养单号',
            dataIndex: 'odd_number',
            key: 'odd_number',
            align:'center',
            width:'100',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'number',
            sorter: (a, b) => a.number - b.number,
            key: 'number',
            align:'center',
            width:'100',
        },
        {
            title: '所属部门',
            align:'center',
            width: '50',
            key: 'department',
            dataIndex: 'department',
        },
        {
            title: '本次计划执行日期',
            key: 'date',
            align:'center',
            dataIndex: 'date',
        },
        {
            title: '接单时间',
            key: 'time',
            dataIndex: 'time',
        },
        {
            title: '保养完成日期',
            sorter: (a, b) => a.deadline - b.deadline,
            key: 'deadline',
            dataIndex: 'deadline',
            align:'center',
        },
        {
            title: '保养人',
            key: 'someone',
            dataIndex: 'someone',
            align:'center',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex:'action',
            align:'center',
            render:() =>{
                return (
                  <Detail/>
                )

            }
        },

    ];

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div style={{background: 'rgb(255, 255, 255)'} }>
                <div className="head" >
                    </div>
                    <SearchCell
                        name="单号/设备名称/单号"
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}

                    />
                    <div>
                <Table size="small"
                       url={this.url}
                       dataSource={this.data}
                       columns={this.columns}
                       bordered
                       pagination={this.pagination}
                       fetch={this.fetch}
                    handleTableChange={this.handleTableChange}
                       judgeOperation = {home.judgeOperation}
                       operation = {this.operation}
              />
                    </div>

            </div>
        );

    }
    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };


    /** 根据角色名称分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        });
        this.fetch({
            departmentName:this.state.searchContent
        })
    };

    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };
    /**---------------------- */

    fetch = (params ,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios({
            url: `${this.url.department.byNameLikeByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };
}
export default Right