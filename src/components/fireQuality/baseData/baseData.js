import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote";
import BasePart from "../../qualityProcess/Base/basePart";

const data=[{
    id:1,
    name:'编号规则',
    path:'/fireSeriRule',
    className:'fa fa-industry fa-5x'
},{
    id:2,
    name:'检验项目',
    path:'/fireTestItem',
    className:'fa fa-wrench fa-5x'
},{
    id:3,
    name:'送检部门',
    path:'/fireInspecDep',
    className:'fa fa-tint fa-5x'
},{
    id:4,
    name:'批号与检验项目',
    path:'/fireSerialTest',
    className:'fa fa-sitemap fa-5x'
},{
    id:5,
    name:'标签与检验项目',
    path: '/fireLabelTest',
    className:'fa fa-sitemap fa-5x'
}]
class FireQuaBase extends Component {
    constructor(props){
        super(props)
        this.click=this.click.bind(this)
    }
    click(e){
        let path=e.target.id
        this.props.history.push({pathname:path})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <BlockQuote menu={current.menuParent} name={current.menuName}/>
                <div className='dataEntry'>
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
export default FireQuaBase