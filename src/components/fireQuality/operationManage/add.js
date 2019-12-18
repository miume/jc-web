import React ,{Component}from 'react'
import NewButton from "../../BlockQuote/newButton";
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
        this.showModal=this.showModal.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    render(){
        return(
            <span>
                {this.props.editflag?(<span className={'blue'} onClick={this.showModal}>编辑</span>)
                :(<NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.showModal}/>)}
            </span>
        )
    }
}
export default Add