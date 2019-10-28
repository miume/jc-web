import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import AddModal from './addModal'
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import SearchCell from '../../../BlockQuote/search'
import EquipmentStatusTable from './equipmentStatusTable'
import home from "../../../commom/fns";
import axios from "axios";
import {message, Spin} from "antd";

class EquipmentStatus extends React.Component{
    url;
    operation
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            searchContent:'',
            searchText: '',
            loading: true
        }
        this.returnEqipmentBasicData = this.returnEqipmentBasicData.bind(this)
        this.deleteByIds = this.deleteByIds.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.cancel = this.cancel.bind(this)
        this.fetch = this.fetch.bind(this)
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.searchEvent = this.searchEvent.bind(this)
        this.searchContentChange = this.searchContentChange.bind(this);
    }

    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }

    componentDidMount() {
        this.fetch();
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <Blockquote menu={current.menuParent} name="设备状态"  menu2='返回' returnDataEntry={this.returnEqipmentBasicData} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal
                        url={this.url}
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'SAVE')}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.deleteByIds}
                        cancel={this.cancel}
                        flag={home.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell
                        name='请输入状态名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                    />
                    <div className='clear' ></div>
                    <EquipmentStatusTable
                        handleDelete={this.handleDelete}
                        url={this.url}
                        rowSelection={rowSelection}
                        judgeOperation = {home.judgeOperation}
                        operation = {this.operation}
                        fetch={this.fetch}
                        data={this.state.dataSource}
                        modifyDataSource={this.modifyDataSource}
                        modifySelectedRowKeys={this.modifySelectedRowKeys}
                    />
                </Spin>
            </div>
        )
    }
    /**返回设备基本数据页面 */
    returnEqipmentBasicData(){
        this.props.history.push({pathname:'/equipmentBasicData'});
    }
    fetch = () => {
        axios({
            url: `${this.url.equipmentStatus.deviceStatus}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res){
                var dataSource = []
                for(var i = 0; i<res.length; i++){
                    dataSource.push({
                        index: i + 1,
                        name: res[i].name,
                        code: res[i].code,
                        color: res[i].color,
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    selectedRowKeys:[],
                    loading: false
                });
            }else{
                this.setState({
                    dataSource: [],
                    selectedRowKeys:[],
                    loading: false
                })
            }
        });
    }
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    deleteByIds = () => {
        const codes = this.state.selectedRowKeys;
        axios({
            url: `${this.url.equipmentStatus.delete}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:codes,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        });

    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    cancel = () => {
        this.setState({
            selectedRowKeys: [],
        });
    }
    searchEvent = () => {
        axios({
            url: `${this.url.equipmentStatus.getByNameLike}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: {
                name: this.state.searchContent
            }
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res){
                var dataSource = []
                for(var i = 0; i<res.length; i++){
                    dataSource.push({
                        index: i + 1 ,
                        name: res[i].name,
                        code: res[i].code
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    selectedRowKeys:[]
                });
            }else{
                this.setState({
                    dataSource: [],
                    selectedRowKeys:[]
                })
            }
        });
    }
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    handleDelete = (code) => {
        axios({
            url:`${this.url.equipmentStatus.deviceStatus}/${code}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch()
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
}

export default EquipmentStatus
