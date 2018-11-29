import React from 'react';
import QuickItem from './quickItem';
import './quickAccess.css'
class QuickAccess extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const quickAccess = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):'' ;
        //console.log(quickAccess)
        return (
            <div>
                <div className='quick-top'>
                    <img src={require(`./u8.svg`)} style={{width:'447px',height:'212px',borderWidth:'0px'/*position:'absolute',left:'33%',top:'10%'*/}} />
                </div>
                <p style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',color:'black', margin:'0'}}><span>快速访问</span></p>
                <div className='quick-tag-parent'>
                    {
                        (quickAccess)? quickAccess.map(menu=>
                            <QuickItem key={menu.path} name={menu.menuName} path={menu.path} />
                        ):  null
                    }
                </div>
            </div>
        );
    }
}
export default QuickAccess;