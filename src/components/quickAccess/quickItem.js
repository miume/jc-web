import React from 'react';
import {withRouter} from 'react-router-dom';
import './quickAccess.css'
class QuickItem extends React.Component{
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }
    click(){
        /**实现每次点击快速访问，都将当前访问的二级菜单放在快速访问的最后一个 */
        const path = this.props.path
        var quickAccess = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):'' ;
        var repeat = quickAccess.find(m=>m.path === path)
        if(repeat){
            quickAccess = quickAccess.filter(m => m.path !== path);
            quickAccess.push(repeat)
        }
        localStorage.setItem('quickAccess',JSON.stringify(quickAccess));
        this.props.history.push({pathname:path})
    }
    render(){
        return (
            <div className='quick-tag-wrapper' onClick={this.click}>
                <div className='quick-tag'>

                        <div className='quick-tag-text'>
                            <span>{this.props.name}</span>
                        </div>
                </div>
            </div>
        );
    }
}
export default withRouter(QuickItem) ;
