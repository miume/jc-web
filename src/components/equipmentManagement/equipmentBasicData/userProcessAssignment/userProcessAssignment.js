import React from 'react';
import Blockquote from "../processName/processName";
import DepTree from "../../../BlockQuote/department";
import axios from "axios";

class UserProcessAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
        this.getTableData = this.getTableData.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('dataEntry'));
        let operation = JSON.parse(localStorage.getItem('menus')) ?
            JSON.parse(localStorage.getItem('menus')).filter(e => e.menuId === current.menuParentId):[],
            click = operation.length ? operation[0]['menuList'] : [];
        this.operation = click.length ? click.filter(e => e.menuId === current.menuId)[0].operations: [];
        const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        return (
            <div>
                <Blockquote menu={current.menuParent} name="工序名称" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className='equipment'>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <div className='equipment-right'>
                    </div>
                </div>
            </div>
        )
    }

    getTableData(params) {
        console.log(params)
        let {deptId, depName} = params;
        if(depName) {
            this.setState({
                deptId: deptId,
                deptName: depName
            });
        }
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.userProcessName.userProcess}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if(res && res.list) {
                for(let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = i + 1;
                }
                this.pagination.total = res.total;
                this.setState({
                    rightTableData: res.list
                })
            }
            this.setState({
                loading: false
            })
        })
    }
}

export default UserProcessAssignment;
