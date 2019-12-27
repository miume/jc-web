import React from 'react';
import {Input} from "antd";
const {TextArea} = Input;

class Impurities extends React.Component {

    render() {
        let {data,inputChange} = this.props;
        return (
            <div>
                <div className='process-parameters-add-div'>
                    <div>
                        <span>Ca：</span>
                        <Input name={'ca'} value={data['ca']} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Mg：</span>
                        <Input name={'mg'} value={data['mg']} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Fe：</span>
                        <Input name={'fe'} value={data['fe']} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Zn：</span>
                        <Input name={'zn'} value={data['zn']} onChange={inputChange} style={{width:100}}/>
                    </div>
                    <div>
                        <span>Cd：</span>
                        <Input name={'cd'} value={data['cd']} onChange={inputChange} style={{width:100}}/>
                    </div>
                </div>
                <div style={{marginTop:10}}>
                    <TextArea rows={2} name={`comment`} value={data['comment']} placeholder={'请输入备注'} onChange={inputChange}/>
                </div>
            </div>
        )
    }
}

export default Impurities;
