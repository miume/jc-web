import React,{Component} from 'react'
import WorkShopPostCost from '../workShopPostCost/workShopPostCost'

class ProductPostCost extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <WorkShopPostCost pageType={3} history={this.props.history}/>
        );
    }
}
export default ProductPostCost;