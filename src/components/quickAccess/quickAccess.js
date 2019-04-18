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
                {
                    quickAccess?
                    <div className='quick-middle'>
                    <div className='quick-shadow'></div>
                    <div className='quick-text'>快速访问</div>
                    <div className='quick-shadow'></div>
                </div>
                :<p className='quick-contact'>您没有该系统的权限，请联系管理员进行授权</p>
                }
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
