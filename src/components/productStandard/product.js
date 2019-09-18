import React from 'react';
import axios from 'axios';
import {Select} from 'antd';
import Block from './block';

const Option = Select.Option;

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNumberChildren: []
        }
        this.blockClick = this.blockClick.bind(this);
        this.getAllSerialNumber = this.getAllSerialNumber.bind(this);
    }

    blockClick(e) {
        const id = e.target.id;
        this.props.blockClick(id);
        this.getAllSerialNumber();
    }

    getAllSerialNumber() {//获取所有编号
        axios({
            url: `${this.props.url.serialNumber.serialNumber}`,
            method: 'get',
            headers: {
                'Authorizaion': this.props.url.Authorizaion
            },
            params: {
                materialClass: 3
            }
        }).then((data) => {
            const res = data.data.data;
            var {serialNumberChildren} = this.state;
            for (var i = 0; i < res.length; i++) {
                let e = res[i];
                serialNumberChildren.push(
                    <Option key={e.id}>{e.materialName}</Option>
                )
            }
            if (res) {
                this.setState({
                    serialNumberChildren: serialNumberChildren
                });
            }
        });
    }

    render() {
        var height1 = document.body.clientHeight - 330;
        return (
            <div className='product-standrad-bottom' style={{height: height1}}>
                {
                    this.props.data ? this.props.data.map(e => {
                        return (
                            <Block key={e.id} name={e.name} id={`${e.id}-${e.name}`}
                                   onBlockChange={this.blockClick}/>
                        );
                    }) : null
                }
                <Block flag={1} name='新增成品' onBlockChange={this.blockClick} add={this.props.add}
                       clickI={this.props.clickI} id={-1} serialNumberChildren={this.state.serialNumberChildren}
                />
            </div>
        );
    }
}

export default Product;