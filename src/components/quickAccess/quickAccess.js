import React from 'react';
import QuickItem from './quickItem';
class QuickAccess extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const quickAccess = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):'' ;
        //console.log(quickAccess)
        return (
            <div>
                <img src={require(`./quickAccess.svg`)} style={{width:'426px',height:'229px',borderWidth:'0px',position:'absolute',left:'33%',top:'10%'}} />
                <div style={{ width:'90%',margin:'30% auto 0px'}}>
                    <p style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',color:'black'}}>快速访问</p>
                    <div style={{margin:'0 10% 20% 24%',textAlign:'center'}}>
                    {
                        (quickAccess)? quickAccess.map(menu=>
                            <QuickItem key={menu.path} name={menu.menuName} path={menu.path} />
                        ):  null
                    }
                    </div>
                </div>
            </div>
        );
    }
}
export default QuickAccess;