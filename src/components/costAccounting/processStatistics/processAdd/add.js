import React,{Component} from 'react'
import {Select,Input,DatePicker,Tabs}  from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
import NewButton from '../../../BlockQuote/newButton'
import AddSearch from './addSearch'
import SingleCrystal from './singleCrystal/singleCrystal'
import MixSalt from './mixSalt/mixSalt'
import AgingProcess from './agingProcess/agingProcess'
import DryProcess from './dryingProcess/dryProcess'
import SyntheticProcess from './syntheticProcess/syntheticProcess'
import Other from './other/other'

const {Option}=Select;
const {TabPane}=Tabs;
class CostProcessAdd extends Component{
    constructor(props){
        super(props);
        this.returnProcess=this.returnProcess.bind(this);
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
    }
    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/processStatistics'})
    }
    startChange(date,dateString){

    }
    endChange(date,dateString){
        
    }
    render(){
        return(
            <div >
                <Blockquote   name='新增数据' menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess}/>
                <div className='rightDiv-content'>
                    <AddSearch flag={true}/>
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab='单晶体配置'> <SingleCrystal/> </TabPane>
                        <TabPane key='2' tab='混合盐配置'> <MixSalt/> </TabPane>
                        <TabPane key='3' tab='合成工序'> <SyntheticProcess/> </TabPane>
                        <TabPane key='4' tab='陈化工序'> <AgingProcess/>  </TabPane>
                        <TabPane key='5' tab='烘干工序'> <DryProcess/> </TabPane>
                        <TabPane key='6' tab='其他'> <Other/>  </TabPane>
                    </Tabs>
                    <span style={{bottom:'10px',position:'absolute',left:'15px'}}>
                    <CancleButton/>
                    </span>
                    <span style={{bottom:'0',position:'absolute',right:'15px'}}>
                        
                        <span >
                            <SaveButton />
                            <NewButton name='提交' />
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}
export default CostProcessAdd;