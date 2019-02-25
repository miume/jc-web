import React from 'react';
import axios from 'axios';
// import {Divider} from 'antd';
class RedList extends React.Component{
    componentDidMount(){
        const dataId = this.props.dataId;
        var url = `${this.props.url.redList.redList1}/batchNumberId?batchNumberId=${dataId}`;
        this.getData(url);
    }
    constructor(props){
        super(props);
        this.state = {
            data:{},
            reply:'',
        }
        this.getData = this.getData.bind(this);
        this.textProcessing = this.textProcessing.bind(this);
        this.toMaterialClass = this.toMaterialClass.bind(this);
    }
    getData(url){
        axios.get(`${url}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data1)=>{
            const res = data1.data.data[0];
            if(res){
                var {data} = this.state;
                data={
                    serialNumber: res.repoBaseSerialNumber?res.repoBaseSerialNumber.serialNumber:'',
                    materialName: res.repoBaseSerialNumber?res.repoBaseSerialNumber.materialName:'',
                    materialClass: res.repoBaseSerialNumber?res.repoBaseSerialNumber.materialClass:'',
                    // quantityLoss: res.repoRedTable?res.repoRedTable.quantityLoss:'',
                    weightLoss: res.repoRedTable?res.repoRedTable.weightLoss:'',
                    note: res.repoRedTable?res.repoRedTable.note:'',
                };
                this.setState({
                    data:data
                })
            }
        })
    }
    /**处理编号的缩写 */
    textProcessing(text){
        if(text){
            if(text.length>24) return <span className='text-decoration' title={text}>{text.substring(0,24)}</span>
            else return <span className='text-decoration' title={text}>{text}</span>
        }
    }
    /**识别materialClass */
    toMaterialClass(text){
        if(text){
            switch(text){
                case 1: return '原材料';
                case 2: return '中间件';
                case 3: return '成品';
                default:return '';
            }
        }
    }
    render(){
        // this.props.getReplyData(this.state.reply);
        const {data} = this.state;
        return (
            <div>
                 {/* 目前接口还没写好，所以没有数据，但可以输入审核意见，点击通过或者不通过按钮 */}
                 <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th className='red-min-width'>编号</th>
                            <th>物料名称</th>
                            <th>物料类型</th>
                            {/* <th>损失数量</th> */}
                            <th>损失重量</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{data?this.textProcessing(data.serialNumber):''}</td>
                            <td>{data?data.materialName:''}</td>
                            <td>{data?this.toMaterialClass(data.materialClass):''}</td>
                            {/* <td>{data?data.quantityLoss:''}</td> */}
                            <td>{data?data.weightLoss:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="redlistDiv">
                       <div>
                           损失说明：<span>{data?data.note:''}</span>
                       </div>
                </div>
                {/* <Divider  />
                <div className={this.props.flag?'hide':'check-footer'} >
                    <textarea onChange={this.textChange} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                </div> */}
            </div>
        );
    }
}
export default RedList;