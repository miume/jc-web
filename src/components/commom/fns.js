const home = {
    /**用来判断该菜单有哪些操作权限 */
   judgeOperation(operation,operationCode){
       var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
       return flag.length>0?true:false
   },
}

export default home;