import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import InterTable from '../intermediateProductTest/intermediateTable';
import SearchCell from '../BlockQuote/search';
import axios from "axios";


class InterProduct extends React.Component {
    url;
    status;
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
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            searchContent:'',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                }
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        // this.pagination = {
        //     total: this.state.dataSource.length,
        //     showSizeChanger: true,
        //     showTotal(total){
        //         return `共${total}条记录`
        //     },
        //     onChange:this.changePage,
        // };
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.status = JSON.parse(localStorage.getItem('status')) ;
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        return(
            <div>
                <BlockQuote name="中间品录检" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入送检工厂名称'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                    <div className='clear' ></div>
                    <InterTable
                        menuList={menuList}
                        url={this.url}
                        status={this.status}
                        data={this.state.dataSource}
                        pagination={this.state.pagination}
                        fetch={this.fetch}
                        modifyDataSource={this.modifyDataSource}
                        handleTableChange={this.handleTableChange}
                    />
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**实现修改state功能 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    /**---------------------- */
    /**获取所有数据功能 */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        })
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                factoryName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
        // this.fetch({
        //     size: pagination.pageSize,
        //     page: pagination.current,
        //     factoryName:this.state.searchContent
        //
        // });
    };
    fetch = (params,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag){
            this.setState({
                pageChangeFlag:0,
                searchContent:''
            })
        };
        axios.get(`${this.url.intermediateProduct}/pages`,{
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            const res = data.data.data?data.data.data:[];
            // this.pagination.total = res?res.total:0;
            if(res&&res.list)
            {
                for(var i = 1; i <= res.list.length;i++){
                    res.list[i-1]['index']=(res.pageNumber-1)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                // this.pagination.current = res.pageNumber;
                this.setState({
                    dataSource:res.list,
                    pagination:pagination,
                    // searchContent:'',
                    // pageChangeFlag:1
                })
            }else{
                this.setState({
                    dataSource: []
                })
            }

        })
    };
    /**---------------------- */
    /** 根据名称分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        });
        this.fetch({
            factoryName:this.state.searchContent
        })
        // this.setState({
        //     searchFlag:0,
        // },()=>{
        //     this.fetch({
        //         factoryName:this.state.searchContent,
        //         pageSize: params.pageSize,
        //         pageNumber: params.pageNumber,
        //     });
        // })
        // this.fetch({
        //     factoryName:this.state.searchContent
        // });
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        });
    }
    /**---------------------- */
}

export default InterProduct;