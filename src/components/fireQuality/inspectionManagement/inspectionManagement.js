import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote";
import BasePart from "../../qualityProcess/Base/basePart";

const data=[{
    id:1,
    name:'送检登记',
    path:'/fireInsRegister',
    className:'fa fa-industry fa-5x'
},{
    id:2,
    name:'样品接收',
    path:'/fireInsSamRec',
    className:'fa fa-wrench fa-5x'
},{
    id:3,
    name:'数据采集',
    path:'/fireInsDataAcq',
    className:'fa fa-tint fa-5x'
},{
    id:4,
    name:'数据整理',
    path:'/fireInsDataCol',
    className:'fa fa-sitemap fa-5x'
}]
class InspectionManagement extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this)
    }
    click(e) {
        let path = e.currentTarget.id;
        this.props.history.push({pathname:path})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <BlockQuote menu={current.menuParent} name={current.menuName}/>
                <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
                    <div className='card-parent'>
                        {
                            data.map(d=>
                                <BasePart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}></BasePart>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default InspectionManagement
