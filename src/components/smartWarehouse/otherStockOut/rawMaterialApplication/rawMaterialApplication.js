import React from 'react';
import {Icon, Select, Spin, Table, message} from 'antd';
import home from '../../../commom/fns';
import SearchCell from '../../../BlockQuote/search';
import './rawAdd.css';
import Submit from "../../../BlockQuote/checkSubmit";
import axios from "axios";

const {Option} = Select;
const data = [];
for(var i = 1; i<=20; i++){
    data.push({
        index:`${i}`,
        id: i,
        materialName:'钴锰矿',
        materialClass:'钴锰矿一号',
        batchNumberId:'ECT/314314',
        quantity:'122',
        weight:'22',
        serialNumber: i%2 ? `MC/BN180808-WS001-RAW(YS)-K-0001-QDBX-60kg` : `MC/BN180808-WS001-RAW(TS)-K-0001-QDBX-60kg`
    })
}
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent:'',
            selectedRowKeys:[],
            selectedRows: [],
            productionLine: -1,
            endPosition: -1,
            productionLineData: [], //存取所有正极相关产品线数据
            endPositionData: [],    //存取所有出库点数据
        };
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderSerialNumber = this.renderSerialNumber.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.endPositionSelectChange = this.endPositionSelectChange.bind(this);
        this.productionLineSelectChange = this.productionLineSelectChange.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
        this.getProductLine = this.getProductLine.bind(this);
        this.getEndPosition = this.getEndPosition.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'10%'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%'
        },{
            title:'物料类型',
            dataIndex:'materialClass',
            key:'materialClass',
            width:'15%',
            render:(text)=>{
                switch(text){
                    case 1: return '原材料';
                    case 2: return '中间件';
                    case 3: return '成品';
                    default:return '';
                }
            }
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            width:'48%',
            render: (text) => {
                if(this.props.index === 1) {
                    let value = text.split('-');
                    return (
                        value.length > 3 ?
                            <span title={text}>{value.splice(0,4).join('-')+'...'}</span>:
                            text
                    )
                } else {
                    return text;
                }
            }
        }, {
            title:'重量',
            dataIndex:'weight',
            key:'weight',
            width:'9%',
        }]
    }

    render(){
        const {index} = this.props;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            this.renderContent(index,rowSelection)
        );
    }

    componentDidMount() {
        this.getProductLine();   //获取所有正极相关产品线
        this.getEndPosition();   //获取所有出库点
    }

    /**根据表格选中数据来渲染右边送审数据*/
    renderContent(index,rowSelection) {
        if(index === 1) {
            return (
                <Spin spinning={this.props.loading} wrapperClassName='other-stock-out'>
                    <div className='other-stock-out-container'>
                        <div className='other-stock-out-div'>
                            <SearchCell name='请输入物料名称' searchEvent={this.searchEvent} type={this.props.index}
                                        fetch={this.searchEvent} searchContentChange={this.searchContentChange}
                                        flag={home.judgeOperation(this.operation,'QUERY')}></SearchCell>
                            <div className={'clear'}></div>
                            <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.columns} rowSelection={rowSelection}
                                   pagination={false} scroll={{ y: '58vh' }} bordered size='small'></Table>
                        </div>
                        <div className='other-stock-out-right'>
                            <div className='other-stock-out-right-head'>
                                <button onClick={this.clear}>清空</button>
                                <button>查占</button>
                            </div>
                            <div className='other-stock-out-right-list'>
                                <div className='other-stock-out-right-list-overflow'>
                                    <div className='other-stock-out-right-list-overflow1'>
                                        {
                                            this.state.selectedRows.length ? this.state.selectedRows.map((data,index) => {
                                                if(data.length) {
                                                    return (
                                                        <div key={index} className={'other-stock-out-right-list-part'}>
                                                            <div className={'other-stock-out-right-list-part-1 '}>{index+1}</div>
                                                            <div className={'other-stock-out-right-list-part-10 '}>
                                                                {this.renderSerialNumber(index,data)}
                                                            </div>
                                                        </div>
                                                    )}
                                            }) : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='other-stock-out-right-bottom'>
                                <div>
                                    <Select value={this.state.productionLine} className='other-stock-out-right-select' placeholder={'请选择产线'} style={{marginRight: 10}} onChange={this.productionLineSelectChange}>
                                        {
                                            this.state.productionLineData.map(e => <Option key={e.id} value={e.name}>{e.name}</Option>
                                            )
                                        }
                                    </Select>
                                    <Select value={this.state.endPosition} className='other-stock-out-right-select' placeholder={'请选择出库点'} onChange={this.endPositionSelectChange}>
                                        {
                                            this.state.endPositionData.map(e => <Option key={e.id} value={e.endPosition}>{e.endPosition}</Option> )
                                        }
                                    </Select>
                                </div>

                                <Submit url={this.props.url} applySaveAndReview={this.applySaveAndReview}/>
                            </div>
                        </div>
                    </div>
                </Spin>
            )
        } else {
            return (
                <Spin spinning={this.props.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell name='请输入物料名称' searchEvent={this.searchEvent} type={this.props.index}
                                fetch={this.searchEvent} searchContentChange={this.searchContentChange}
                                flag={home.judgeOperation(this.operation,'QUERY')}></SearchCell>
                    <div className={'clear'}></div>
                    <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.columns} rowSelection={rowSelection}
                           pagination={false} bordered size='small'></Table>
                </Spin>
            )
        }
    }

    /**删除右边送审数据的一条数据*/
    delete(parentIndex,index,id) {
        let {selectedRowKeys, selectedRows} = this.state;
        selectedRowKeys = selectedRowKeys.filter(e => e !== id);
        selectedRows[parentIndex].pop(index);
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    /**清空右边送审的数据*/
    clear() {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }

    /**渲染一条编号数据*/
    renderSerialNumber(parentIndex,data) {
        return data.map((e,index) =>
            <div key={e.id} className='other-stock-out-right-list-item'>
                <div className='other-stock-out-right-list-item-5'>{e.serialNumber}</div>
                <div className='other-stock-out-right-list-item-1'><Icon type="close" onClick={() => this.delete(parentIndex,index,e.id)}/></div>
                <div className='other-stock-out-right-list-item-1'><Icon type="check-circle" style={{color: '#00ff00'}}/></div>
            </div>
        )
    }

    /**监控产品线下拉框的变化*/
    productionLineSelectChange(value) {
        this.setState({
            productionLine: value
        })
    }

    /**监控出库点下拉框的变化*/
    endPositionSelectChange(value) {
        this.setState({
            endPosition: value
        })
    }

    /**对选择数据进行送审
     * process代表送审流程
     * urgent代表是否紧急
     * */
    applySaveAndReview(process,urgent) {
        // console.log(process,urgent)
        const userName = JSON.parse(localStorage.getItem('menuList'))?JSON.parse(localStorage.getItem('menuList')).name:null;
        let {productionLine, endPosition, selectedRows} = this.state, data = [], date = new Date().toLocaleDateString().split('/').join('');

        for(let i = 1; i <= selectedRows.length; i++) {
            data.push({
                groupName: date + i,
                content: selectedRows[i-1]
            })
        }
        let params = {
            productionLine: productionLine,
            endPosition: endPosition,
            data: data,
            createPersonName: userName
        };
        this.save(params);
    }

    /**送审右边显示编号数据*/
    save(params) {
        axios({
            url: `${this.props.url.stockOut.faker}`,
            method: 'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: params,
        }).then((data) => {
            message.info(data.data.message);
            this.clear(); //清空右边数据
        });
    }

    /**根据正极名称模糊查询产品线*/
    getProductLine() {
        axios({
            url: `${this.props.url.productLine.search}`,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: {
                productLineName: '正极'
            },
        }).then((data) => {
            let res = data.data.data;
            this.setState({
                productionLineData: res.list,
                productionLine: res.list ? res.list[0].name : -1
            })
        })
    }

    /**获取所有出库点的数据*/
    getEndPosition() {
        axios({
            url: `${this.props.url.endPosition.getAllByOutType}`,
            method: 'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: {
                outType: 1
            },
        }).then((data) => {
            let res = data.data.data;
            this.setState({
                endPositionData: res,
                endPosition: res ? res[0].endPosition : -1
            })
        })
    }

    /**监控搜索框的输入变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }

    /**根据货物名称进行搜索 */
    searchEvent(){
        this.props.fetch({
            materialName:this.state.searchContent
        });
    }

    /**监控checkbox选中的情况 对选中的数据进行处理*/
    onSelectChange(selectedRowKeys,selectedRows) {
        //(YS)代表前驱体 (TS)代表碳酸锂 两个前驱体和一个碳酸锂组合
        let TS = [], YS = [];
        selectedRows.map(e => {
            if(e.serialNumber.includes('(TS)')) {
                TS.push(e);
            }
            if(e.serialNumber.includes('(YS)')) {
                YS.push(e);
            }
        });

        let YSLen = parseInt(YS.length / 2) || YS.length,
            TSLen = TS.length,
            len = YSLen > TSLen ? YSLen : TSLen,
            data = [];
        for(let i = 0; i < len; i++) {
            let temp = [];
            if(TS.length) {
                temp.push(TS.shift());
            }
            if(YS.length >= 2) {
                temp.push(YS.shift());
                temp.push(YS.shift());
            } else if(YS.length === 1 ) {
                temp.push(YS.shift());
            }
            data.push(temp);
        }
        this.setState({
            selectedRowKeys:selectedRowKeys,
            selectedRows: data
        })
    }

    cancel(){
        this.setState({
            selectedRowKeys:[]
        })
    }

}
export default RawMaterialApplication;
