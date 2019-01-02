import React from 'react';
import './productStandard.css';
import Blockquote from '../BlockQuote/blockquote';
class ProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.divCilck = this.divCilck.bind(this);
    }
    divCilck(e){
        const target = e.target;
        if(target.className === 'product-standrad-top-click'){
            target.className = 'product-standrad-top-notclick';
        }else{
            target.className = 'product-standrad-top-click';
            // document.getElementsByClassName('img')[0].childNodes[id].src = require(`./head.svg`)
        }
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}  />
                <div className='productStandard'>  
                   {/* <div className='img'>
                        <img src={require(`./head.svg`)} alt='图片加载失败' className='img1' />
                        <img src={require(`./head-white.svg`)} alt='图片加载失败' className='img2' />
                        <img src={require(`./head-white.svg`)} alt='图片加载失败' className='img3' />            
                    </div>   */}
                    <div className='product-standrad-top'>
                        <div className='product-standrad-top-click' id='product-0'><i className='fa fa-leaf'></i> <span>选择产品</span></div>
                        <div onClick={this.divCilck} id='product-1' className='product-standrad-top-notclick'><i className='fa fa-cubes'></i><span>选择型号</span></div>
                        <div onClick={this.divCilck} id='product-2' className='product-standrad-top-notclick'><i className='fa fa-stop'></i> <span>设置标准</span></div>
                    </div>
                    <div className='product-standrad-middle'>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductStandard;