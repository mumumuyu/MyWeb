<%--
  Created by IntelliJ IDEA.
  User: LGD
  Date: 2021/10/13
  Time: 20:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <%--    <meta charset="UTF-8">--%>
    <%--    <meta http-equiv="X-UA-Compatible" content="IE=edge">--%>
    <%--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/layui/css/layui.css">
        <script src="${pageContext.request.contextPath}/static/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" href="static/css/index.css">
    <title>注册界面</title>
</head>

<body>
<div class="box">
    <div class="left"></div>
    <div class="right">
        <h4>注 册</h4>
        <form name="register" action="${pageContext.request.contextPath }/register.do">
            <input class="acc" name="id" type="text" placeholder="用户名">
            <input class="acc" name="pwd" type="password" placeholder="密码">
            <input class="acc" name="name" type="text" placeholder="姓名">
            <input class="submit" type="button" value="注册" onclick="validate()">
        </form>
        <div class="fn">
            <a href="${pageContext.request.contextPath}/login.jsp">返回首页</a>
        </div>
    </div>
</div>
<script>
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
            ,form = layui.form
            ,table = layui.table;

        layer.msg('请输入你的用户名，密码和姓名');
    });
    function validate()
    {
        if ( register.id.value==="")
        {
            layer.alert('请输入用户名', {
                icon: 5,
                title: "提示"
            });
            return;
        }
        if ( register.pwd.value==="")
        {
            layer.alert('请输入密码', {
                icon: 5,
                title: "提示"
            });
            return;
        }
        if ( register.name.value==="")
        {
            layer.alert('请输入姓名', {
                icon: 5,
                title: "提示"
            });
            return;
        }
        register.submit();
    }
</script>
</body>
</html>
