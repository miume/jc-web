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
        // this.textChange = this.textChange.bind(this);
        this.getData = this.getData.bind(this);
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
                    quantityLoss: res.repoRedTable?res.repoRedTable.quantityLoss:'',
                    weightLoss: res.repoRedTable?res.repoRedTable.weightLoss:'',
                    note: res.repoRedTable?res.repoRedTable.note:'',
                };
                this.setState({
                    data:data
                })
            }
        })
    }
    /**监控审核意见的变化 */
    // textChange(e){
    //     const value = e.target.value;
    //     this.setState({
    //         reply:value
    //     })
    // }
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
                            <th>损失数量</th>
                            <th>损失重量</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{data?data.serialNumber:''}</td>
                            <td>{data?data.materialName:''}</td>
                            <td>{data?data.materialClass:''}</td>
                            <td>{data?data.quantityLoss:''}</td>
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