import React from 'react';
import axios from 'axios';
import {Modal} from 'antd';
import StockTable from './detailTable';
import CancleButton from '../BlockQuote/cancleButton';
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:[]
        }
        this.handleDetial = this.handleDetial.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            // console.log(detail)
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
        return (
            <span>
                <span className='blue' onClick={this.handleDetial}>详情</span>
                <Modal visible={this.state.visible} closable={false} maskCloseable={false}
                width={800} title='出库详情' centered={true}
                footer={[
                    <CancleButton key='back' flag={1} handleCancel={this.handleClick}/>
                ]}
                >
                <StockTable dataSource={this.state.dataSource}/>
                {/* <div style={{height:'300px'}}>
                    <Table rowKey={record=>record.index} dataSource={this.state.dataSource} columns={this.columns} pagination={false} bordered size='small' scroll={{y:200}}></Table>
                </div> */}
                </Modal>
            </span>
        );
    }
}
export default Detail;