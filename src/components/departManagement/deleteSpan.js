import React from 'react';
import {Popconfirm,message} from "antd";
import axios from "axios";

const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjMzNTg1NX0.7fGSanhO8Gm_5_HQZE9gtz842TFnHQsUx_25S6Yl7oBpyFhjYkNPiWsuR2NP2eG60iWXoXqgKYU7tsgGFoLbyg'

class DeletaSpan extends React.Component {
    render() {
        return (
            <span>
                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(this.props.record.id)} okText="确定" cancelText="取消" >
                    <a href="#">删除</a>
                </Popconfirm>
            </span>
        )
    }
    handleDelete = (id) => {
        console.log("++++++")
        console.log(id);
        axios({
            url:`http://218.77.105.241:40080/jc/department/`+parseInt(id),
            method:'Delete',
            headers:{
                'Authorization':Authorization
            },
        }).then((data)=>{
            console.log(data);
            message.info(data.data.message);
        }).catch((error)=>{
            console.log(error);
            message.info(error.data)
        });
        setTimeout(() => {
            this.props.getFetch();
        }, 1000);
    }
}

export default DeletaSpan;
