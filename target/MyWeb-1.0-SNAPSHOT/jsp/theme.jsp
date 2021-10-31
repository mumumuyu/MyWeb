<%--
  Created by IntelliJ IDEA.
  User: LGD
  Date: 2021/10/13
  Time: 19:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false"%>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>管理系统</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/layui/css/layui.css">
</head>

<body>
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo layui-hide-xs layui-bg-black">管理系统</div>
        <!-- 头部区域（可配合layui 已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <!-- 移动端显示 -->
            <!-- <li class="layui-nav-item layui-show-xs-inline-block layui-hide-sm" lay-header-event="menuLeft">
<i class="layui-icon layui-icon-spread-left"></i>
</li>

<li class="layui-nav-item layui-hide-xs"><a href="">控制台</a></li>
<li class="layui-nav-item layui-hide-xs"><a href="">商品管理</a></li>
<li class="layui-nav-item layui-hide-xs"><a href="">用户</a></li>
<li class="layui-nav-item">
<a href="javascript:;">其它系统</a>
<dl class="layui-nav-child">
<dd><a href="">邮件管理</a></dd>
<dd><a href="">消息管理</a></dd>
<dd><a href="">授权管理</a></dd>
</dl>
</li> -->
            <li class="layui-nav-item layadmin-flexible" lay-unselect>
                <a href="javascript:;" layadmin-event="flexible" title="侧边伸缩">
                    <i class="layui-icon layui-icon-shrink-right" id="LAY_app_flexible"></i>
                </a>
            </li>
            <li class="layui-nav-item" lay-unselect>
                <a href="javascript:;" layadmin-event="refresh" title="刷新">
                    <i class="layui-icon layui-icon-refresh-3"></i>
                </a>
            </li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item layui-hide layui-show-md-inline-block">
                <a>
                    <img src="${pageContext.request.contextPath }/static/images/bg3.png" class="layui-nav-img">
<%--                    <cite th:text="${userSession.name}"></cite>--%>
                    <span id="operatorName">${userSession.name}</span>
                </a>
                <dl class="layui-nav-child">
                    <dd><a href="javascript:void(0)" id="userInfoBtn">个人资料</a></dd>
                    <dd><a href="javascript:void(0)" id="modifypasswordBtn">修改密码</a></dd>
                    <dd><a href="${pageContext.request.contextPath }/logout.do">退出系统</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item" lay-header-event="menuRight" lay-unselect>
                <a href="javascript:;">
                    <i class="layui-icon layui-icon-more-vertical"></i>
                </a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" lay-filter="test">
                <li class="layui-nav-item">
                    <a class="" href="javascript:;">系统管理</a>
                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;">用户列表</a></dd>
                        <dd><a href="javascript:;">添加用户</a></dd>
                    </dl>
                </li>

                <li class="layui-nav-item"><a href="javascript:;">统计报表</a></li>
                <li class="layui-nav-item">
                    <a href="javascript:;">收入管理</a>
                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;">收入明细</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">支出管理</a>
                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;">支出明细</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>

    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">内容主体区域。</div>
    </div>

    <div class="layui-footer">
        <!-- 底部固定区域 -->
        copyright © 2021 LGD all rights reserved. Version 1.0.0
    </div>
</div>
<!-- 修改用户信息 -->
<div style="display: none;" id="userinfo">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend><span id="userinfo_title"></span></legend>
    </fieldset>
    <form class="layui-form" action="" lay-filter="userinfo_form">
        <div class="layui-form-item">
            <label class="layui-form-label">账号</label>
            <div class="layui-input-inline">
                <input type="text" name="uAccount" id="account" value="" autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
                <input type="text" name="uNickname" value="" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label"><button type="button" class="layui-btn"
                                                    id="selectImg">选择头像</button></label>
            <div class="layui-input-block">
                <input type="text" name="headSculpture" id="headImg" value="" autocomplete="off"
                       class="layui-input layui-hide">
                <img id="preview" src="./images/qq1.png" width="150px">
                <img id="thumbImagePath" width="150px">
                <img id="fullPath" width="150px">
                <div class="layui-progress layui-progress" lay-showpercent="true" lay-filter="demo" id="demo"
                     style="display: none ;width: 450px;">
                    <div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div>
                </div>
                <p id="demoText"></p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">真实姓名</label>
            <div class="layui-input-inline">
                <input type="text" name="uRealname" value="" autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label">身份证号</label>
            <div class="layui-input-inline">
                <input type="text" name="uIdCard" value="" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">手机号</label>
            <div class="layui-input-inline">
                <input type="tel" name="uMobile" id="mobile" value="" autocomplete="off" class="layui-input">
            </div>

            <label class="layui-form-label"></label>
            <div class="layui-input-inline">
                <button class="layui-btn" lay-submit lay-filter="submit_userinfo" id="submit_userinfo">立即提交</button>
            </div>
        </div>
    </form>
</div>

<!-- 修改密码 -->
<div id="modifypassword" style="display: none;">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend><span id="modifypassword_title"></span></legend>
    </fieldset>
    <form class="layui-form" action="" lay-filter="modifypassword_form">
        <div class="layui-form-item">
            <label class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
                <input type="password" name="uPassword" placeholder="请输入新密码" lay-verify="required|pass"
                       autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
                <input type="password" name="reuPassword" placeholder="请确认新密码" lay-verify="required|repass"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">原密码</label>
            <div class="layui-input-inline">
                <input type="password" name="originalPassword" placeholder="请输入原密码" lay-verify="required|opass"
                       autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label"></label>
            <div class="layui-input-inline">
                <button class="layui-btn" lay-submit lay-filter="formModifyPassword">立即提交</button>
            </div>
        </div>
    </form>
</div>
<script src="${pageContext.request.contextPath}/static/layui/layui.js"></script>
<script>
    //JS
    layui.use(['element', 'layer', 'util'], function () {
        var element = layui.element
            , layer = layui.layer
            , util = layui.util
            , $ = layui.$;

        //头部事件
        util.event('lay-header-event', {
            //左侧菜单事件
            menuLeft: function (othis) {
                layer.msg('展开左侧菜单的操作', { icon: 0 });
            }
            , menuRight: function () {
                layer.open({
                    type: 1
                    , content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
                    , area: ['260px', '100%']
                    , offset: 'rt' //右上角
                    , anim: 5
                    , shadeClose: true
                });
            }
        });

    });
</script>
<script src="${pageContext.request.contextPath}/static/js/operator.js" type="module"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/common.js?v=315"></script>
</body>

