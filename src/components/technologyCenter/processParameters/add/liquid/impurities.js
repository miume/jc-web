import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input} from "antd";
const {TextArea} = Input;

class Impurities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data,inputChange} = this.props;
        return (
            <div>
                <div className='process-parameters-add-div'>
                    <div>
                        <span>Ca：</span>
                        <Input name={'Ca'} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Mg：</span>
                        <Input name={'Mg'} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Fe：</span>
                        <Input name={'Fe'} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Zn：</span>
                        <Input name={'Zn'} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Cd：</span>
                        <Input name={'Cd'} onChange={inputChange} style={{width:100}}/>
                    </div>
                </div>
                <div style={{marginTop:10}}>
                    <TextArea rows={2} name={`moment`} placeholder={'请输入备注'} onChange={inputChange}/>
                </div>
            </div>
        )
    }
}

export default Impurities;
