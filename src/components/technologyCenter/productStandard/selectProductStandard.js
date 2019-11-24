import React from 'react';
import SelectItems from "./selectItems";

class SelectProductStandard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let height1 = document.body.clientHeight-350, {data,url,addFlag} = this.props;
        return (
            <div className='product-standrad-bottom' style={{height:height1}}>
            {
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                     <div className='product-standrad-img-p'>您还没建立任何标准</div>
                     <div className='product-standrad-img-p1'>
                         需要建立一套标准后才能执行相关操作
                    </div>
                    <span className={addFlag?'':'hide'}>
                        <SelectItems url={url}  data={data} getAllProductStandard={this.props.getAllProductStandard}/>
                        {/*<AddProductStandard option={this.state.option} allTestItem={this.state.allTestItem} data={this.props.data} url={this.props.url} getAllProductStandard={this.props.getAllProductStandard}/>*/}
                    </span>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;
