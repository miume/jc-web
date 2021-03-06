import React from 'react';
import axios from 'axios';
import { Divider,message, } from 'antd';
import './productStandard.css';
import Product from './product';
import SelectModal from './model';
import home from '../../commom/fns';
import SearchCell from '../../BlockQuote/search';
import Blockquote from '../../BlockQuote/blockquote';
import SelectProductStandard from './selectProductStandard';
import ProductStandardDetail from './productStandardDetail';
import Operator from "./operator";
class ProductStandard extends React.Component{
    url
    componentDidMount(){
        this.getAllProduct();
    }
    constructor(props){
        super(props);
        this.state = {
            add:0,                  //add为0显示成品显示 为1表示新增显示
            allModal:[],            //选择型号界面的所有型号
            allProduct:[],          //选择成品界面的所有成品
            flag:1,                 //决定渲染那个界面 1表示选择成品界面product 2表示选择型号selectModal 3表示设置标准setStardand
            allProductStandard:[],  //保存所有标准
            modalArr:[],            //用来存储选择型号 所点击的所有型号
            selectedModal:[],       //用来存取最后一次选择型号的id和name
            selectProduct:[],       //用来存取最后一次选择成品的id和name
            standradFlag:0,            //用来存取设置标准页面来区分是搜索时为空1，还是getAllStandard为空0
            selItemsFlag:true,
            firstFlag: true
        }
        this.fetch = this.fetch.bind(this);
        this.clickI = this.clickI.bind(this);
        this.divCilck = this.divCilck.bind(this);
        this.addClass = this.addClass.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.returnBack = this.returnBack.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.showContent = this.showContent.bind(this);
        this.recentModal = this.recentModal.bind(this);
        this.getAllProduct = this.getAllProduct.bind(this);
        this.getAllSelectModal = this.getAllSelectModal.bind(this);
        this.getAllProductStandard = this.getAllProductStandard.bind(this);
    }
    /**根据flag显示content mode存在就代表输出placeholder里面的数据*/
    showContent(mode){
        const {flag} = this.state;
        var content = '';
        if(flag===1) content = mode?'请输入成品名称':'选择成品';
        else if(flag===2) content= mode?'请输入型号名称':'选择型号';
        else content= mode?'请输入创建人名称':'设置标准';
        return content;
    }
    /**点击选择成品、选择标准时对应的变化 */
    divCilck(e){
        var id = e.target.id ;
        /**id不存在，则点击是子元素，则要找到父元素，然后找齐id */
        if(!id) id = e.target.parentNode.id;
        id = id.split('-')[1];
        /**只能在flag为2，3时，点击选择成品  只有在flag为3时可以点击选择型号 */
        /**如果点击选则成品 则回到选择成品页面 以及将选择型号和设置标准置灰 */
        if(id==='1'){
            this.setState({
                flag:1,
                modalArr:[]
            })
            /**点击选择成品 给选择型号，设置标准 加notclick类 */
            this.addClass('product-2');
            this.addClass('product-3');
            this.getAllProduct();
        }else{
            this.setState({
                flag:2
            })
            /**点击选择型号 给设置标准加notclick类，删click类 */
            this.addClass('product-3');
            this.getSelectModal(parseInt(this.state.selectProduct[0]));
        }
    }
    /**获取所有成品 */
    getAllProduct(){
        axios.get(`${this.url.product.getAllProduct}`,{
            headers:{
                Authorization:this.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    allProduct:res,
                    allProductCopy:res,
                    firstFlag: false
                })
            }
        })
    }


    getSelectModal = (productId) => {
        axios.get(`${this.url.productStandard.getClassesById}?productId=${parseInt(productId)}`,{
            headers:{
                Authorization:this.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    allModal:res
                })
            }
        });
    }

    /**获取所有型号 并保存所有点击的型号*/
    getAllSelectModal(params,ids){
        if(ids){
            /**modalArr保存型号的一个分支 父元素-子元素-子元素。。。 */
            let {modalArr} = this.state,
                arr = {
                    id:ids[0],
                    name:ids[1]
                };
            modalArr.push(arr)
            this.setState({
                modalArr:modalArr,
            });
            this.recentModal(ids);
        }

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
        });
    }
    /**跟踪最新一次点击的型号 */
    recentModal(ids){
        ids[2] = '型号';
        this.setState({
            selectedModal:ids
        })
    }
    /**点击成品block
     * id=-1表示点击了新增 则将add置1 切换为输入框进行可编辑
     * 其它则表示点击了任意成品 则*/
    blockClick(id){
        if(id==='-1'){
            this.setState({
                add:1
            })
        }else{
            const arr = id.split('-');
            arr[2]='成品';
            this.addClass('product-2',1);
            this.setState({
                add:0,              //add置0 确保新增为是按钮不可编辑
                flag:2,             //flag置2 确保界面跳转为选择型号
                selectProduct:arr   //保存点击成品的id和name
            })
            /**点击成品后，查询所有型号，进行界面渲染 */
            this.getSelectModal(arr[0]);
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

    /**点击成品新增 */
    clickI(e){
        /**通过点击新增确定 找到input value值 */
        const value = e.target.parentNode.parentNode.firstElementChild.value;
        if(value===''||value===null){
            message.info('请输入成品名称！');
            return
        }
        else{
            this.addProduct(value);
        }
    }

    /**成品新增事件 */
    addProduct(value){
        axios({
            url: `${this.url.product.product}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                productName:value
            }
        }).then(data => {
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

    /**搜索事件
     * flag=1 表示成品搜索
     * flag=2 表示型号搜索
     * flag=3 表示标准搜索
    */
    searchEvent(value){
        const {flag} = this.state;
        if(flag===1){
            this.productSearch(value);
        }else if(flag===2){
            const {selectedModal} = this.state;
            this.getAllSelectModal({
                name: value,
                parentId: selectedModal[0]?selectedModal[0]:-1
            });
        }else{
            const {selectProduct,selectedModal} = this.state;
             /**设置设置标准 搜素标注位1 */
             this.setState({
                standradFlag:1
            });
            this.getAllProductStandard({
                classId:parseInt(selectedModal[0]),
                productId:parseInt(selectProduct[0]),
                name:value
            },0,1)
        }
    }
    /**根据成品名称进行搜索 */
    productSearch(value){
        let {allProductCopy} = this.state,
            searchProduct = allProductCopy.filter(e => e.name.includes(value));
        this.setState({
            allProduct: searchProduct.length ? searchProduct : allProductCopy
        })
        // axios.get(`${this.url.serialNumber.serialNumber}/factors?materialClass=3&materialName=${value}`,{
        //     headers:{
        //         Authorization:this.url.Authorization
        //     },
        // }).then((data)=>{
        //     const res = data.data.data;
        //     this.setState({
        //         allProduct:res
        //     })
        // })
    }
    /**搜索重置接口
     * flag:1 代表成品搜索
     * flag:2 代表型号搜索
     * flag:3 代表标准搜索
    */
    fetch(){
        const {flag} = this.state;
        if(flag===1){
            this.getAllProduct();
        }else if(flag===2){
            const {selectedModal} = this.state;
            this.getAllSelectModal({
                parentId:selectedModal[0]?selectedModal[0]:-1
            });
        }else{
            const {selectProduct,selectedModal} = this.state;
            /**设置设置标准 搜素标志位 置0 */
            this.setState({
                standradFlag:0
            })
            this.getAllProductStandard({
                classId:parseInt(selectedModal[0]),
                productId:parseInt(selectProduct[0])
            })
        }
    }
    /**根据成品id 型号id查询所对应的标准 */
    getAllProductStandard(params,ids,mode){
        if(ids){
            this.recentModal(ids);
        }
        const {selectProduct} = this.state;
        /**给设置标准#product-3加点击类 使其背景色变蓝*/
        this.addClass('product-3',1);
        params['productId'] = parseInt(selectProduct[0]);
        axios.get(`${this.url.product.getAllStandardByPIdandCId}`,{
            headers:{
                Authorization:this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            var arr = [];
            var flag = mode?4:3;  //代表新增
            if(res&&res.length>0){
                for(var i = 0; i < res.length; i++){
                    res[i]['index'] = `${i+1}`;
                    arr.push(res[i])
                }
                flag = 4; //代表标准界面
            }
            this.setState({
                flag:flag,
                allProductStandard:arr?arr:[]
            })
        })
    }
    /**重新选择上一级 */
    returnBack(e){
        var id = e.target.id ;
        var dom = 'product-3';
        var flag = 2;
        var {modalArr} = this.state;
        /**
         * id===2表示在选择型号界面 则要删除选择型号界面的点击类，添加notClick类  然后将flag置1
         * id===3或4表示在设置标准界面 则要删除设置标准界面的点击类，添加notClick类  然后将flag置2        */
        if(parseInt(id)===2){
            dom = 'product-2';
            flag = 1;
        }
        this.setState({
            flag : flag,
            modalArr:flag===1?[]:modalArr
        })
        this.addClass(dom);
    }

    selectSelItemsFlag = (flag) => {
        if(flag === 3){
            return true
        }else{
            return false
        }
    }


    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        const data = [this.state.selectProduct,this.state.selectedModal];
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const addFlag = home.judgeOperation(this.operation,'SAVE');
        const editorFlag = home.judgeOperation(this.operation,'SAVE');
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}  />
                <div className='productStandard'>
                    <div className='product-standrad-top'>
                        <div onClick={this.state.flag===2||this.state.flag===3||this.state.flag===4?this.divCilck:null} id='product-1' className='product-standrad-top-click'><i className='fa fa-leaf'></i> <span className='product-standrad-top-span'>{this.state.flag===1?'选择成品':this.state.selectProduct[1]}</span></div>
                        <div onClick={this.state.flag===3||this.state.flag===4?this.divCilck:null} id='product-2' className='product-standrad-top-notclick'><i className='fa fa-cubes'></i><span className='product-standrad-top-span'>{this.state.flag===3||this.state.flag===4?this.state.selectedModal[1]:'选择型号'}</span></div>
                        <div id='product-3' className='product-standrad-top-notclick'><i className='fa fa-stop'></i> <span className='product-standrad-top-span'>设置标准</span></div>
                    </div>
                    <div className='product-standrad-middle'>
                        <div className='product-standrad-middle-top'>
                            <span className='product-standrad-middle-text'>{this.showContent()}</span>
                            <span style={{float:"right"}}>
                                {
                                    this.state.flag !== 3 ?
                                        <Operator
                                            fetch={this.fetch}
                                            titleName={this.state.flag===1?"成品":"型号"}
                                            data={this.state.allProduct}
                                            url={this.url}
                                            flag={this.state.flag===1?0:1}
                                            selectProduct={this.state.selectProduct}
                                            getSelectModal={this.getSelectModal}
                                            selectedModal={this.state.selectedModal}
                                        />: null
                                }
                                <SearchCell name={this.showContent(1)} searchEvent={this.searchEvent} fetch={this.fetch}
                                            flag={home.judgeOperation(this.operation,'QUERY')}
                                />
                            </span>
                            <Divider type='horizontal' />
                        </div>
                        <div className={this.state.flag===1?'':'hide'}>
                           <Product data={this.state.allProduct} blockClick={this.blockClick} add={this.state.add} clickI={this.clickI} url={this.url} />
                        </div>
                        <div  className={this.state.flag===2?'':'hide'}>
                            <SelectModal firstFlag={this.state.firstFlag} getSelectModal={this.getSelectModal} selectProduct={this.state.selectProduct} url={this.url} data={this.state.allModal} getAllModal={this.getAllSelectModal}
                            getAllProductStandard={this.getAllProductStandard} modalArr={this.state.modalArr}
                            addFlag={addFlag}
                            />
                        </div>
                        {/**设置标准 flag===3 标准为空 表示新增界面 */}
                        <div className={this.state.flag===3?'':'hide'}>
                            <SelectProductStandard selItemsFlag={this.selectSelItemsFlag(this.state.flag)} url={this.url}  data={data} addFlag={addFlag}
                             getAllProductStandard={this.getAllProductStandard}/>
                        </div>
                        {/**设置标准 flag===4 标准不为空 表示标准显示 */}
                        <div className={this.state.flag===4?'product-standrad-bottom':'hide'}>
                            <ProductStandardDetail selItemsFlag={this.selectSelItemsFlag(this.state.flag)} data={this.state.allProductStandard} topData={data} url={this.url}
                            getAllProductStandard={this.getAllProductStandard} editorFlag={editorFlag}/>
                        </div>
                        <div className={this.state.flag===1?'hide':'product-footer'} onClick={this.returnBack} id={this.state.flag}>{`重新选择上一级`}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductStandard;
