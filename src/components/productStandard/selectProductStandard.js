import React from 'react';
import NewButton from '../BlockQuote/newButton';
class SelectProductStandard extends React.Component{
    render(){
        
        return (
            <div className='product-standrad-bottom'>
            {
                this.props.data.length?
                <div>展示table</div>:
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                     <div className='product-standrad-img-p'>您还没建立任何标准</div>
                     <div className='product-standrad-img-p1'>
                         需要建立一套标准后才能执行相关操作
                    </div>
                     <div>
                         <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                     </div>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;