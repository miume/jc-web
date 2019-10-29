import React,{Component} from 'react'
import {Row,Col,Input} from 'antd'
import '../statisticalPeriod/add.css'
import SaveButton from '../../../BlockQuote/saveButton'
class ShowInfo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div >
                <div className='fontAttribute'>
                    <span>成品每包重量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px',marginRight:'80px'}}/>
                    <span >粉碎正压输每罐重量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px'}}/>
                </div>      
                <div className='fontAttribute'>
                    <span >装钵重量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px',marginRight:'80px'}}/>
                    <span >预烧正压输送每罐重量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px'}}/>
                </div>
                <div className='fontAttribute'>
                    <span >每排钵数 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px',marginRight:'80px'}}/>
                    <span >二烧正压输送每罐重量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px'}}/>
                </div>
                <div className='fontAttribute'>
                    <span >烧损系数 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px',marginRight:'80px'}}/>
                    <span >高混机每批进料量 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px'}}/>
                </div>
                <div className='fontInfo'>预混配比系数</div>
                <div className='fontAttribute'>
                    <span >前驱体 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px',marginRight:'80px'}}/>
                    <span >碳酸锂 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'250px'}}/>
                </div>
                <div style={{marginLeft:'270px'}}>
                    <span style={{paddingRight:'10px',textAlign:'right'}}>布袋料 :</span>
                    <Input placeholder='请输入' suffix="kg" style={{width:'240px'}}/>
                </div>
                <div style={{textAlign:'center',marginTop:'50px'}}><SaveButton /></div>
            </div>
        );
    }
}
export default ShowInfo