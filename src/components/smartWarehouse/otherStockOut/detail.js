import React from 'react';
import axios from 'axios';
import {Icon, Modal} from 'antd';
import StockTable from './detailTable';
import CancleButton from '../../BlockQuote/cancleButton';

const data = [];
for(var i = 1; i<=5; i++){
    let temp = [];
    for(let j = 1; j <= 3; j++) {
        temp.push({
            index:`${i}`,
            id: `${i}-${j}`,
            materialName:'钴锰矿',
            materialClass:'钴锰矿一号',
            batchNumberId:'ECT/314314',
            quantity:'122',
            weight:'22',
            serialNumber: j%2 ? `MC/BN180808-WS001-RAW(YS)-K-0001-QDBX-60kg` : `MC/BN180808-WS001-RAW(TS)-K-0001-QDBX-60kg`
        })
    }
    data.push(temp);
}

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:[]
        };
        this.renderDetail = this.renderDetail.bind(this);
        this.handleDetial = this.handleDetial.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderSerialNumber = this.renderSerialNumber.bind(this);
    }
    /**点击详情 显示弹出框 */
    handleDetial(){
        axios({
            url:`${this.props.url.stockOut.repoOut}/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data?data.data.data.details:[];
            var detail = [];
            if(res){
                for(var i = 0; i < res.length; i++){
                    var e = res[i];
                    detail.push({
                        index:`${i+1}`,
                        serialNumber:e.repoBaseSerialNumber.serialNumber,
                        materialName:e.repoBaseSerialNumber.materialName,
                        meterialClass:e.repoBaseSerialNumber.materialClass,
                        quantity:e.repoOutApply.quantity,
                        weight:e.repoOutApply.weight
                    })
                }
            }
            this.setState({
                visible:true,
                dataSource:detail
            })
        })
    }
    /**点击详情确认按钮 取消弹出框 */
    handleClick(){
        this.setState({
            visible:false
        })
    }
    render(){
        const dataSource = data;
        return (
            <span>
                <span className='blue' onClick={this.handleDetial}>详情</span>
                <Modal visible={this.state.visible} closable={false} maskCloseable={false}
                width={600} title='出库详情' centered={true}
                footer={[
                    <CancleButton key='back' flag={1} handleCancel={this.handleClick}/>
                ]}
                >
                    {
                        this.renderDetail(dataSource)
                    }
                {/*<StockTable dataSource={this.state.dataSource}/>*/}
                </Modal>
            </span>
        );
    }

    renderDetail(data) {
        return (
            <div className='other-stock-out-detail'>
                <div className='other-stock-out-right-detail-overflow'>
                    {
                        data ? data.map((data,index) => {
                            if(data.length) {
                                return (
                                    <div key={index} className={'other-stock-out-right-list-part'}>
                                        <div className={'other-stock-out-right-list-part-1 '}>{index+1}</div>
                                        <div className={'other-stock-out-right-list-part-10 '}>
                                            {this.renderSerialNumber(data)}
                                        </div>
                                    </div>
                                )}
                        }) : null
                    }
                </div>
            </div>
        )
    }

    renderSerialNumber(data) {
        return data.map((e) =>
            <div key={e.id} className='other-stock-out-right-list-item'>
                {e.serialNumber}
            </div>
        )
    }
}
export default Detail;
