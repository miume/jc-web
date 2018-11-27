import React from 'react';
import {Button,Icon} from 'antd';
import SearchCell from '../../BlockQuote/search';
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
    }   
    render(){
        return (
            <div style={{padding:'0 15px'}}>
                <Button type='primary' size='large' className='button'><i className="fa fa-plus-square" style={{color:'white'}}></i> 申请出库</Button>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称'></SearchCell>
                </span>
            </div>
        );
    }
}
export default RawMaterialApplication;