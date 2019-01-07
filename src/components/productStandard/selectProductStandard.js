import React from 'react';
class SelectProductStandard extends React.Component{
    render(){
        
        return (
            <div className='product-standrad-bottom'>
            {
                this.props.data.length?
                <div>展示table</div>:
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;