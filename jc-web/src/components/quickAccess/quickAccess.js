import React from 'react';
import QuickItem from './quickItem';
import './quickAccess.css'
class QuickAccess extends React.Component{
    render(){
        const quickAccess = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):'' ;
        return (
            <div className='quick-container'>
                <div className='quick-top'>
                    <img src={require(`./u8.svg`)} alt='图片加载失败' style={{width:'447px',height:'212px',borderWidth:'0px'/*position:'absolute',left:'33%',top:'10%'*/}} />
                </div>
                <div className='quick-middle' style={{textAlign:'center',fontSize:'20px',fontWeight:'400'}}>
                    <div className='quick-shadow'></div>
                    <div className='quick-text' style={{color:'#999999'}}>快速访问</div>
                    <div className='quick-shadow'></div>
                </div>
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