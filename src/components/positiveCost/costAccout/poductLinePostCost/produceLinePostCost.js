import React,{Component} from 'react'
import WorkShopPostCost from '../workShopPostCost/workShopPostCost'
class ProductLinePostCost extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <WorkShopPostCost pageType={2} history={this.props.history}/>
        );
    }
}
export default ProductLinePostCost;