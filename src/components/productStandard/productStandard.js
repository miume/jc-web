import React from 'react';
import './productStandard.css';
import Blockquote from '../BlockQuote/blockquote';
class ProductStandard extends React.Component{
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}  />
                <div className='productStandard'></div>
            </div>
        )
    }
}
export default ProductStandard;