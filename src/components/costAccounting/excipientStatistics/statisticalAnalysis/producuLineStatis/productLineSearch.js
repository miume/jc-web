import React,{Component} from 'react'
import {Select} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let {staticPeriod,periodsChange} = this.props;
        return (
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select defaultValue='周' style={{width:'120px',marginRight:'10px'}} onChange={periodsChange}>
                    {
                        staticPeriod ? staticPeriod.map(e => <Option value={e.code}>{e.name}</Option>) : null
                    }
                </Select>

                <Select defaultValue='周' style={{width:'120px',marginRight:'10px'}}>
                    <Option value='1'>周</Option>
                    <Option value='2'>月</Option>
                    <Option value='3'>年</Option>
                </Select>

                <NewButton name='确定' handleClick={this.search}/>
            </div>
        )
    }
}
export default Search;
