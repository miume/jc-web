import React from 'react';
import AddProductStandard from './addProductStandard';
class SelectProductStandard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // const data = [['','','批号'],this.props.productName,this.props.modalName];
        return (
            <div className='product-standrad-bottom'>
            {
                // this.props.dataSource.length||this.props.standradFlag?
                // <div>
                //     <ProductStandardDetail data={this.props.dataSource} topData={data} url={this.props.url} />
                // </div>:
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                     <div className='product-standrad-img-p'>您还没建立任何标准</div>
                     <div className='product-standrad-img-p1'>
                         需要建立一套标准后才能执行相关操作
                    </div>
                     <AddProductStandard data={this.props.data} url={this.props.url} getAllProductStandard={this.props.getAllProductStandard}/>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;