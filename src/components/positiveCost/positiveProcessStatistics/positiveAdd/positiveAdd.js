import React,{Component} from 'react';
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
import NewButton from '../../../BlockQuote/newButton'
import Search from './addSearch'
import  OnlineIngredients from './onlineIngredients/onlineIngredients'
import PremixedCoulterMixed from './pemixedCoulterMixed/premixedCoulterMixed'
import PremixedStorageBin from './pemixedCoulterMixed/premixedCoulterMixed'
import PreBuring from './preBurningKiln/preBurning'
import Crush from './crush/crush'
import SecondMix from './secondMix/secondMix'
import SecondBuring from './secondBurning/secondBuring'
import Package from './package/package'
const {TabPane}=Tabs;
class PositiveAdd extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.back=this.back.bind(this);
    }
    back(){
        this.props.history.push({pathname:'/positiveProcess'})
    }
    render(){
        return(
            <div>
                <Blockquote name='新增数据'  menu='正极成本' menu2='在制品管理' returnDataEntry={this.back}/>
                <div className='rightDiv-content'>
                    <Search/>
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab='在线原料'>< OnlineIngredients/></TabPane>
                        <TabPane key='2' tab='预混(犁刀混)'><PremixedCoulterMixed/></TabPane>
                        <TabPane key='3' tab='预混(暂存仓)'><PremixedStorageBin/></TabPane>
                        <TabPane key='4' tab='预烧(窑炉)'><PreBuring/></TabPane>
                        <TabPane key='5' tab='粉碎(气流粉碎机)'><Crush/></TabPane>
                        <TabPane key='6' tab='二混'><SecondMix/></TabPane>
                        <TabPane key='7' tab='二烧(窑炉)'> <SecondBuring/> </TabPane>
                        <TabPane key='8' tab='包装'> <Package/>  </TabPane>
                        <TabPane key='9' tab='车间待处理物料'></TabPane>
                        <TabPane key='10' tab='仓库待处理物料'></TabPane>
                    </Tabs>
                        <span style={{bottom:'10px',position:'absolute',left:'15px'}}><CancleButton/></span>
                        <span style={{bottom:'0',position:'absolute',right:'15px'}}>
                            <SaveButton/>
                            <NewButton name='提交'/>
                        </span>
                </div>
            </div>
        )
    }
}
export default PositiveAdd