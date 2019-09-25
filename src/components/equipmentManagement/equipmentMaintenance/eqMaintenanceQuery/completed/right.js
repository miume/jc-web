import React from "react";
import {Table} from "antd";
import "./completed.css"
import Detail from "./detailModal";
import home from "../../../../commom/fns";
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
        }
        this.pagination = {
            showSizeChanger: true,
            showTotal(total){
                return `共${total}条记录`
            }
        };
    }
    onclick=()=>{
        this.setState({
            visible:true,
        })
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            align:'center',
        },
        {
            title: '保养单号',
            dataIndex: 'code',
            key: 'code',
            align:'center',
            width:'100',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            sorter: (a, b) => a.number - b.number,
            key: 'deviceName',
            align:'center',
            width:'100',
        },
        {
            title: '所属部门',
            align:'center',
            width: '50',
            key: 'deptCode',
            dataIndex: 'deptCode',
        },
        {
            title: '本次计划执行日期',
            key: 'planDate',
            align:'center',
            dataIndex: 'planDate',
        },
        {
            title: '接单时间',
            key: 'receiveDate',
            dataIndex: 'receiveDate',
        },
        {
            title: '保养完成日期',
            sorter: (a, b) => a.deadline - b.deadline,
            key: 'finishiDate',
            dataIndex: 'finishiDate',
            align:'center',
        },
        {
            title: '保养人',
            key: 'maintPeople',
            dataIndex: 'maintPeople',
            align:'center',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex:'action',
            align:'center',
            render:(text,record) =>{
                return (
                  <Detail
                      url={this.url}
                      code={record.code}
                      // id={record.id}
                  />
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
                <div className="head" style={{paddingTop:10}} >
                    </div>
                    <SearchCell
                        name="单号/设备名称/编号..."
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                        getTableData={this.props.getTableData}
                        depCode={this.props.depCode}
                        style={{marginTop:10}}
                        getLastMonthTime={this.props.getLastMonthTime}
                    />
                    <div>
                <Table size="small"
                       url={this.url}
                       dataSource={this.props.rightTableData}
                       columns={this.columns}
                       bordered
                       pagination={this.pagination}
                       fetch={this.fetch}
                        handleTableChange={this.handleTableChange}
                       judgeOperation = {home.judgeOperation}
                       operation = {this.operation}
                       style={{marginTop:10}}
              />
                    </div>

            </div>
        );

    }


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
    /**获取所有数据*/
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
        this.props.getTableData(params)
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
            })
        }
    };
}
export default Right
