import React from 'react';
import axios from 'axios';
import { Divider,message, } from 'antd';
import './productStandard.css';
import Product from './product';
import SelectModal from './model';
import SearchCell from '../BlockQuote/search';
import Blockquote from '../BlockQuote/blockquote';
import SelectProductStandard from './selectProductStandard';
class ProductStandard extends React.Component{
    url
    componentDidMount(){
        this.getAllProduct();
    }
    constructor(props){
        super(props);
        this.state = {
            add:0,          //add为0显示产品显示 为1表示新增显示
            allModal:[],    //选择型号界面的所有型号
            allProduct:[],  //选择产品界面的所有产品
            flag:1,//决定渲染那个界面 1表示选择产品界面product 2表示选择型号selectModal 3表示设置标准setStardand
            allProductStandard:[],  //保存所有标准
        }
        this.fetch = this.fetch.bind(this);
        this.clickI = this.clickI.bind(this);
        this.divCilck = this.divCilck.bind(this);
        this.addClass = this.addClass.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.showContent = this.showContent.bind(this);
        this.getAllProduct = this.getAllProduct.bind(this);
        this.getAllSelectModal = this.getAllSelectModal.bind(this);
        this.getAllProductStandard = this.getAllProductStandard.bind(this);
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
    /**点击选择产品、选择标准时对应的变化 */
    divCilck(e){
        const id = e.target.id.split('-')[1];
        /**只能在flag为2，3时，点击选择产品  只有在flag为3时可以点击选择型号 */
        /**如果点击选则产品 则回到选择产品页面 以及将选择型号和设置标准置灰 */
        if(id==='1'){
            this.setState({
                flag:1
            })
            /**点击选择产品 给选择型号，设置标准 加notclick类 */
            this.addClass('product-2');
            this.addClass('product-3');
            
        }else{
            this.setState({
                flag:2
            })
            /**点击选择型号 给设置标准加notclick类，删click类 */
            this.addClass('product-3');
        }
    }
    /**获取所有产品 */
    getAllProduct(){
        axios.get(`${this.url.serialNumber.serialNumber}?materialClass=3`,{
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
    /**获取所有型号 */
    getAllSelectModal(params){
        axios.get(`${this.url.productStandard.getAll}`,{
            headers:{
                Authorization:this.url.Authorization,
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    allModal:res
                })
            }
        })
    }
    /**点击产品block */
    blockClick(id){
        if(id==='-1'){
            this.setState({
                add:1
            })
        }else{
            const arr = id.split('-');
            this.addClass('product-2',1);
            this.setState({
                add:0,
                flag:2,
                selectProduct:arr
            })
            this.getAllSelectModal({
                parentId:-1
            });
        }
    }
    /**给dom添加类、删除类 */
    addClass(id,flag){
        const docu = document.getElementById(id);
        /**flag为1 加click类，否则删除点击类 */
        if(flag){
            docu.classList.add('product-standrad-top-click');
            docu.classList.remove('product-standrad-top-notclick');
        }else{
            docu.classList.add('product-standrad-top-notclick');
            docu.classList.remove('product-standrad-top-click');
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
        else{
            axios.post(`${this.url.serialNumber.serialNumber}`,{
                materialName:value,
                materialClass:3,
                manufacturerName:'',
                serialNumber:''
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
    }
    /**搜索事件 */
    searchEvent(value){
        const {flag} = this.state;
        if(flag===1){
            this.productSearch(value);
        }else{
            this.getAllSelectModal({
                name:value
            }); 
        }
    }
    /**根据产品名称进行搜索 */
    productSearch(value){
        axios.get(`${this.url.serialNumber.serialNumber}/factors?materialClass=3&materialName=${value}`,{
            headers:{
                Authorization:this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                allProduct:res
            })
        })
    }
    /**搜索重置接口 */
    fetch(){
        const {flag} = this.state;
        if(flag===1){
            this.getAllProduct();
        }else if(flag===2){
            this.getAllSelectModal({
                parentId:-1
            });
        }
    }
    /**根据产品id */
    getAllProductStandard(params){
        const {selectProduct} = this.state;
        /**给设置标准#product-3加点击类 */
        this.addClass('product-3',1);
        params['productId'] = parseInt(selectProduct[0]);
        axios.get(`${this.url.productStandard.productStandard}`,{
            headers:{
                Authorization:this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            //console.log(res)
            this.setState({
                flag:3,
                allProductStandard:res?res:[]
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
                        <div onClick={this.state.flag===2||this.state.flag===3?this.divCilck:null} id='product-1' className='product-standrad-top-click'><i className='fa fa-leaf'></i> <span className='product-standrad-top-span'>{this.state.flag===1?'选择产品':this.state.selectProduct[1]}</span></div>
                        <div onClick={this.state.flag===3?this.divCilck:null} id='product-2' className='product-standrad-top-notclick'><i className='fa fa-cubes'></i><span className='product-standrad-top-span'>选择型号</span></div>
                        <div id='product-3' className='product-standrad-top-notclick'><i className='fa fa-stop'></i> <span className='product-standrad-top-span'>设置标准</span></div>
                    </div>
                    <div className='product-standrad-middle'>
                        <div>
                            <span className='product-standrad-middle-text'>{this.showContent()}</span>
                            <SearchCell name='请输入搜索内容' searchEvent={this.searchEvent} fetch={this.fetch} />
                            <Divider type='horizontal' />
                        </div>
                        <div className={this.state.flag===1?'':'hide'}>
                        {
                           <Product data={this.state.allProduct} blockClick={this.blockClick} add={this.state.add} clickI={this.clickI} />
                        }
                        </div>
                        <div  className={this.state.flag===2?'':'hide'}>
                            <SelectModal url={this.url} data={this.state.allModal} getAllModal={this.getAllSelectModal} getAllProductStandard={this.getAllProductStandard} />
                        </div>
                        <div className={this.state.flag===3?'':'hide'}>
                            <SelectProductStandard data={this.state.allProductStandard} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductStandard;