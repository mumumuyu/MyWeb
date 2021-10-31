import {serverURL} from './commons.js';

/**
 * 取侧边栏菜单
 * @param {*} pid
 */
function getLeftSideMenu(pid) {
    if (!pid) {
        pid = 0;
    }
    layui.use('element', function () {
        var element = layui.element;
        var $ = layui.jquery;
        $.ajax({
            type: "get",
            url: serverURL + "/api/user/getMenu",
            beforeSend: function (xhr) {
                // 将用户ID存储在请求头中
                // uId 操作人ID
                xhr.setRequestHeader('uId', uId);
            },
            dataType: "json",
            success: function (response) {
                switch (response.code) {
                    case '200':
                        let data = response.data
                        // console.log(data);
                        let listStr = '';
                        // 遍历生成主菜单
                        $.each(data, function (index, menu) {
                            if ((menu.href == null || menu.href == '') && menu.children != null && menu.children.length > 0) {
                                // 如果是目录并且子菜单不为空 获取子菜单
                                listStr += '<li class="layui-nav-item"><a class="" href="javascript:;"><i class="' + menu.icon + '"></i>' + menu.title + '</a><dl class="layui-nav-child">';
                                // 子菜单
                                $.each(menu.children, function (indexInChildren, subMenu) {
                                    listStr += getChildMenu(subMenu, 0);
                                });
                                listStr += '</dl></li>';
                            } else if ((menu.href == null || menu.href == '') && menu.children == null && menu.children.length == 0) {
                                // 如果是目录但是子菜单为空
                                listStr += '<li class="layui-nav-item"><a class="" href="javascript:;"><i class="' + menu.icon + '"></i>' + menu.title + '</a></li>';
                            } else {
                                //不是目录那就是按钮
                                listStr += `<li class="layui-nav-item"><a class="" href="javascript:showTab(${menu.href},${menu.title},${menu.href})"><i class="${menu.icon}"></i>${menu.title}</a></li>`;
                            }
                        });
                        $('#menu').html('<ul class="layui-nav layui-nav-tree" lay-filter="test">' + listStr + '</ul>');
                        element.init();
                        break;

                    default:
                        break;
                }
            }
        });
    });
}

// 导航菜单的间隔
var menuCell = 1;

function getChildMenu(subMenu, num) {

    num++;
    let subStr = '';
    if ((subMenu.href == null || subMenu.href == '') && subMenu.children != null && subMenu.children.length > 0) {
        // 如果是目录并且子菜单不为空 获取子菜单
        subStr += '<dd><ul><li class="layui-nav-item"><a style="text-indent: ' + num * menuCell + 'em;"  class="" href="javascript:;"><i class="' + subMenu.icon + '"></i>' + subMenu.title + '</a><dl class="layui-nav-child">';
        // 子菜单
        layui.use('element', function () {
            var element = layui.element;
            var $ = layui.jquery;
            $.each(subMenu.children, function (indexInChildren, subSubMenu) {
                subStr += getChildMenu(subSubMenu, num);
            });
        });
        subStr += "</dl></li></ul></dd>";
    } else if ((subMenu.href == null || subMenu.href == '') && subMenu.children == null) {
        // 如果是目录但是子菜单为空
        subStr += '<dd><ul><li class="layui-nav-item"><a style="text-indent: ' + num * menuCell + 'em;"  class="" href="javascript:;"><i class="' + subMenu.icon + '"></i>' + subMenu.title + '</a></li></ul></dd>';
    } else {
        //不是目录那就是按钮
        subStr += `<li class="layui-nav-item"><a style="text-indent: ${num * menuCell}em;"  class="" href="javascript:showTab('${subMenu.href}','${subMenu.title}','${subMenu.href}')"><i class="${subMenu.icon}"></i>${subMenu.title}</a></li>`;
    }
    return subStr;
}

// 渲染菜单
getLeftSideMenu(0);
