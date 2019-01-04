import React from 'react';
import Block from './block';
class Product extends React.Component{
    constructor(props){
        super(props);
        this.blockClick = this.blockClick.bind(this);
    }
    blockClick(e){
        const id = e.target.id;
        // const parentNode = e.target.parentNode;
        // parentNode.style.backgroundColor = '#0091ff';
        // console.log(e.target.parentNode.className)
        this.props.blockClick(id);
    }
    render(){
        return (
            <div className='product-standrad-bottom'>
            {
                this.props.data?this.props.data.map(e=>{
                    return (
                        <Block key={e.id} name={e.materialName} id={`${e.id}-${e.materialName}`} onBlockChange={this.blockClick}/>
                    );
                }):null
            }
                <Block flag={1} name='新增产品' onBlockChange={this.blockClick} add={this.props.add} clickI={this.props.clickI}  id={-1}/>
            </div>
        );
    }
}
export default Product;