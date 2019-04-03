import React from 'react';
class PermissionMenu1 extends React.Component{
    constructor(props){
        super(props);
        this.judgeMenu = this.judgeMenu.bind(this);
    }
    render(){
        const flag = this.props.flag;
        return (
            this.judgeMenu(flag)
        )   
    }
    judgeMenu(flag){
        switch(flag){
            case 1 : 
                return (
                    <div className='divborder'>
                        <span className='rightBorder menu1Label'><i className="fa fa-bookmark"></i>&nbsp;&nbsp;&nbsp;{this.props.menu1Name}</span><span></span>
                    </div>
                )
            case 2 : 
                return (
                    <div className='divborder'>
                        <span className='rightBorder menu2Label'><i className="fa fa-bookmark"></i>&nbsp;&nbsp;&nbsp;{this.props.menu2Name}</span><span></span>
                    </div>
                )
        }
    }
}
export default PermissionMenu1;