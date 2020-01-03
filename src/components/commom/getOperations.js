/**判断三级菜单的所有操作权限
 * parentId：三级菜单的父菜单（二级菜单）的menuId
 * currentId：三级菜单的menuId
 * */
export const getOperations = (parentId,currentId) => {
    let menus = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : [];
    console.log(menus)
    console.log(menus.filter(e => e.menuId === parentId))
    let menuList = menus.filter(e => e.menuId === parentId)?menus.filter(e => e.menuId === parentId)[0]['menuList']:[];
    console.log(menuList)
    let operations = menuList.filter(e => e.menuId === currentId)?menuList.filter(e => e.menuId === currentId)[0]['operations']:[];

    return operations;
};

/**判断二级菜单的所有操作权限
 * menuId ：二级菜单的menuId
 * */
export const getSecondsOperations = (menuId) => {
    let menus = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : [],
        operations = menus.filter(e => e.menuId === menuId)[0]['operations'];
    return operations;
};

/**判断菜单的操作权限与否*/
export const judgeOperation = (operation,operationCode) => {
    let flag = operation.length ? operation.filter(e => e['operationCode'] === operationCode) : [];
    return flag.length > 0 ? true : false
};
