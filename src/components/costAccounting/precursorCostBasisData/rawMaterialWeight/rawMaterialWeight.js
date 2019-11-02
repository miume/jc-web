import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";

class RawMaterialWeight extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[{
                index:1,
                materialName:"混合盐溶液",
                source:"补料",
                materialType:"混合盐溶液",
                weightValue:"1#产线  0.2,2#产线  0.3,3#产线   0.3,4#产线   0.2"
            }],
            visible:false,
            selectedRowKeys: [],
            loading:false,
            searchContent:'',
        }
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '16.7%',
        },{
            title: '原材料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '16.7%',
        },{
            title:"材料来源",
            dataIndex: 'source',
            key: 'source',
            align:'center',
            width: '16.7%',
        },{
            title:"材料类别",
            dataIndex: 'materialType',
            key: 'materialType',
            align:'center',
            width: '16.7%',
        },{
            title:"产线/权重",
            dataIndex: 'weightValue',
            key: 'weightValue',
            align:'center',
            width: '16.7%',
            render:(text,record)=>{
                let data = record.weightValue.split(",");
                return(
                    data.map((item,index)=>{
                        return(<div key={index}>
                            {item}
                        </div>)
                    })
                )
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '16.7%',
            render:(text,record)=>{
                return(
                    <span>
                        <span className="blue">编辑</span>
                        <Divider type="vertical" />
                        <span className="blue">删除</span>
                    </span>
                )
            }
        }]
    };
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        //   console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
            // getCheckboxProps: record => ({
            //     disabled: record.commonBatchNumber.status === 2, // Column configuration not to be checked
            //   }),
          };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>

                    <SearchCell name="请输入原材料名称" flag={true}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} pagination={this.pagination} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}


export default RawMaterialWeight