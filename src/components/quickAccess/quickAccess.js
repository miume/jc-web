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
            <div style={{marginTop:'25%',width:'100%'}}>
                <p style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',color:'black'}}>快速访问</p>
                <div style={{margin:'0 10% 20% 30%',textAlign:'center'}}>
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