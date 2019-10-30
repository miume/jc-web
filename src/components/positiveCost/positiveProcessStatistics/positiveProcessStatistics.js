import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
class PositiveProcessStatistics extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
            </div>
        );
    }
}
export default PositiveProcessStatistics