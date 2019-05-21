import React from "react";

const home = {
    /**用来判断该菜单有哪些操作权限 */
   judgeOperation(operation,operationCode){
       let flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
       return flag.length>0?true:false
   },
    /**字段过长处理
     * text 代表要处理的字段
     * max 代表最多显示的长度
     * */
    judgeText(text,max=8) {
        if (text && text.length > max) {
            return <span className='text-decoration' title={text}>{text.substring(0, max)+'...'}</span>
        } else {
            return text
        }
    }
}

export default home;