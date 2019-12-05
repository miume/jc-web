import React,{Component} from 'react';
import Blockquote from '../../BlockQuote/blockquote';
import '../../qualityProcess/dataEntry/data.css';
import DataPart from '../../qualityProcess/dataEntry/dataPart';
const data=[{
    id:1,
    name:'统计周期',
    path:'/statisticalPeriodCost',
    className:'fa fa-bar-chart fa-5x'
},{
    id:2,
    name:'生产线',
    path:'/productLinePositiveCost',
    className:'fa fa-code-fork fa-5x'
},{
    id:3,
    name:'工序',
    path:'/processPositiveCost',
    className:'fa fa-cogs fa-5x'
},{
    id:4,
    name:'物料种类',
    path:'/materialTypePositive',
    className:'fa fa-bars fa-5x'
},{
    id:5,
    name:'PLC地址表',
    path:'/PLCAddressTable',
    className:'fa fa-address-card fa-5x'
},{
    id:6,
    name:'物料种类PLC仪表对照表',
    path:'/materialTypePLCMeterCom',
    className:'fa fa-ils fa-5x'
},{
    id:7,
    name:'其他基本数据',
    path:'/otherBaseInfo',
    className:'fa fa-file-o fa-5x'
},{
    id:8,
    name:'产品型号',
    path:'/modelPositiveCost',
    className:'fa fa-file-o fa-5x'
}];
class BaseInfoPositiveCost extends Component{
   constructor(props){
        super(props);
        this.click=this.click.bind(this);
   }

   click(e){
    const path=e.currentTarget.id;
    this.props.history.push({pathname:path});
   }
   render(){
       const current=JSON.parse(localStorage.getItem('current'));
       return(
           <div>
               <Blockquote menu={current.menuParent} name={current.menuName}/>
               <div className='dataEntry'>
                    <div className='card-parent'>
                        {data.map(d=>
                         <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}/>)}
                    </div>
               </div>

           </div>
       );
   }
}
export default BaseInfoPositiveCost;
