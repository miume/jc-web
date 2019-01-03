import React from 'react';
import axios from 'axios';
import { Divider,message, } from 'antd';
import './productStandard.css';
import Product from './product';
import SelectModal from './model';
import SearchCell from '../BlockQuote/search';
import Blockquote from '../BlockQuote/blockquote';
class ProductStandard extends React.Component{
    url
    componentDidMount(){
        this.getAllProduct();
    }
    constructor(props){
        super(props);
        this.state = {
            add:0,          //add为0显示产品显示 为1表示新增显示
            allProduct:[],  //选择产品界面的所有产品
            flag:1,//决定渲染那个界面 1表示选择产品界面product 2表示选择型号selectModal 3表示设置标准setStardand
        }
        this.clickI = this.clickI.bind(this);
        this.divCilck = this.divCilck.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.showContent = this.showContent.bind(this);
        this.getAllProduct = this.getAllProduct.bind(this);
    }
    /**根据flag显示content */
    showContent(){
        const {flag} = this.state;
        var content = '';
        if(flag===1) content = '选择产品';
        else if(flag===2) content='选择型号';
        else content='设置标准';
        return content;
    }
    /**点击选择产品、选择标准、设置标准时对应的变化 */
    divCilck(e){
        const target = e.target;
        if(target.className === 'product-standrad-top-click'){
            target.className = 'product-standrad-top-notclick';
        }else{
            target.className = 'product-standrad-top-click';
            // document.getElementsByClassName('img')[0].childNodes[id].src = require(`./head.svg`)
        }
    }
    /**获取所有产品 */
    getAllProduct(){
        axios.get(`${this.url.serialNumber.serialNumber}?materialClass=3`,{},{
            headers:{
                Authorization:this.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    allProduct:res
                })
            }
        })
    }
    /**点击产品block */
    blockClick(id){
        const arr = id.split('-');
        if(id==='undefined'){
            this.setState({
                add:1
            })
        }else{
            const docu = document.getElementById(`product-1`);
            docu.classList.add('product-standrad-top-click')
            docu.classList.remove('product-standrad-top-notclick')
            this.setState({
                add:0,
                flag:2,
                selectProduct:arr[1]
            })
        }
    }
    /**点击产品新增 */
    clickI(e){
        /**通过点击新增确定 找到input value值 */
        const value = e.target.parentNode.parentNode.firstElementChild.value;
        if(value===''){
            message.info('请输入产品名称！');
            return
        }
        axios.post(`${this.url.serialNumber.serialNumber}`,{
            materialName:value,
            materialClass:3
        },{
            headers:{
                Authorization:this.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.getAllProduct();
                this.setState({
                    add:0
                })
            }
        }).catch(()=>{
            message.info('新增失败，请联系管理员！')
        })
    }
    /**搜索事件 */
    searchEvent(value){
        const {flag} = this.state;
        if(flag===1){
            this.productSearch(value);
        }
    }
    /**根据产品名称进行搜索 */
    productSearch(value){
        axios.get(`${this.url.serialNumber.serialNumber}/all`,{},{
            headers:{
                Authorization:this.url.Authorization
            },
            params:{
                materialClass:3,
                materialName:value
            }
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                allProduct:res
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}  />
                <div className='productStandard'>  
                    <div className='product-standrad-top'>
                        <div className='product-standrad-top-click' id='product-0'><i className='fa fa-leaf'></i> <span>{this.state.flag===1?'选择产品':this.state.selectProduct}</span></div>
                        <div onClick={this.divCilck} id='product-1' className='product-standrad-top-notclick'><i className='fa fa-cubes'></i><span>选择型号</span></div>
                        <div onClick={this.divCilck} id='product-2' className='product-standrad-top-notclick'><i className='fa fa-stop'></i> <span>设置标准</span></div>
                    </div>
                    <div className='product-standrad-middle'>
                        <div>
                            <span className='product-standrad-middle-text'>{this.showContent()}</span>
                            <SearchCell name='请输入搜索内容' searchEvent={this.searchEvent} fetch={this.getAllProduct} />
                            <Divider type='horizontal' />
                        </div>
                        <div className={this.state.flag===1?'product-standrad-bottom':'hide'}>
                        {
                           <Product data={this.state.allProduct} blockClick={this.blockClick} add={this.state.add} clickI={this.clickI} />
                        }
                        </div>
                        <div  className={this.state.flag===2?'':'hide'}>
                            <SelectModal url={this.url} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductStandard;