import React from 'react';
import axios from 'axios';
import {Table} from 'antd';
import HeadTable from '../productStandard/headTable';
class CheckProductStandard extends React.Component{
    componentDidMount(){
        const {flag} = this.props;
        // console.log(flag)
        var url = `${this.props.url.productStandard.productStandard}`;
        if(flag===13) url = `${this.props.url.rawStandard.getStandard}`;
        this.getDataByBatchNumberId(this.props.batchNumberId,url);
    }
    constructor(props){
        super(props);
        this.state = {
            data : [],
            time : []
        }
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            align:'center',
            width:'25%'
        },{
            title:'检测项目',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'25%'
        },{
            title:'检测结果',
            dataIndex:'value',
            key:'value',
            align:'center',
            width:'25%'
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'25%'
        },]
    }

    getDataByBatchNumberId(id,url){
        axios.get(`${url}/${id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            if(res){
                this.detailDataProcessing(res);
            }
        })
    }
    /**对详情、编辑数据进行处理 */
    detailDataProcessing(res){
        var batchNumber = res.commonBatchNumber.batchNumber;
        var time = {
            createTime:res.commonBatchNumber.createTime,
            effectiveTime:this.props.flag===13?res.details.techniqueRawStandardRecord.effectiveTime
            :res.details.techniqueProductStandardRecord.effectiveTime
        }
        var data1 = [
            this.props.flag===13?res.details.rawMaterialName:res.details.productName,this.props.flag===13?res.details.rawManufacturerName:res.details.className
        ]
        var details = this.props.flag===13?res.details.rawStandards:res.details.techniqueProductTestItemDTOs;
        var data = [];
        for(var i = 0; i < details.length; i++){
            var e = details[i];
            var testItems = e.testItem;
            testItems['index'] = `${i+1}`;
            testItems['value'] = this.props.flag===13?e.techniqueRawTestItemStandard.value:e.techniqueProductTestItemStandard.value;
            data.push(testItems)
        }
        this.setState({
            batchNumber:batchNumber,
            allTestItem:data,
            time:time,
            data:data1,
            date:time.effectiveTime
        })
    }
    render(){
        return (
            <div style={{height:450}}>
                <HeadTable flag={1} data={this.state.data} batchNumber={this.state.batchNumber} rawProductFlag={this.props.flag===13?1:0} />
                <div className='modal-add-table' >
                    <Table className='stock-out' rowKey={record=>record.id} 
                    columns={this.columns} dataSource={this.state.allTestItem} 
                    pagination={false} size='small' bordered scroll={{y:240}}>
                    </Table>
                    <div>
                        <div className='modal-detail-p'>
                            <p>{`生效时间：${this.state.time.effectiveTime?this.state.time.effectiveTime:''}`}</p>
                            <p>{`编制日期：${this.state.time.createTime?this.state.time.createTime:''}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CheckProductStandard;