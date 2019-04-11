import React from 'react'
import Menu1List from './menu';
class Left extends React.Component{
    render(){
        return (
            <div className="left">
                <div className="menu1" >
                <Menu1List/>
                </div>
            </div>
        )
    }
}
export default Left;