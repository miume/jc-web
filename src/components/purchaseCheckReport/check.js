import React from 'react';
import '../Home/page.css';
import WhiteSpace from "../BlockQuote/whiteSpace";
import CheckTable from './checkTable';
import SearchCell from '../BlockQuote/search';
import DeleteButton from './checkDeleteButton';

const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        id:i,
        a: '周小伟',
        b: '启动',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: '无',
        h: '无',
        i: '不通过',
        j: 'j',
        k: 'k',
        l: 'l'
    });
}


class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
        };
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
    };
    render() {
        const { loading,selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <div className="fl">
                    <DeleteButton
                        selectedRowKeys={this.state.selectedRowKeys}
                        start={this.start}
                        loading={loading}
                        cancel={this.cancel}
                    />
                </div>
                <SearchCell
                />

                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <CheckTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
    /**实现批量删除功能 */
    start = () => {
        const ids = this.state.selectedRowKeys.toString();
        console.log(ids);
        // axios({
        //     url:`http://218.77.105.241:40080/jc/department/deleteByIds?ids=`+ids,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':Authorization
        //     },
        // }).then((data)=>{
        //     message.info(data.data.message);
        // }).catch((error)=>{
        //     message.info(error.data.message)
        // });
        // this.fetch();
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    /**---------------------- */
}

export default Check;