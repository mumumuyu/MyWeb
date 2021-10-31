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
    <link rel="stylesheet" href="static/css/index.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/layui/css/layui.css">
    <script src="${pageContext.request.contextPath}/static/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <title>登录界面</title>
    <script>
        if (window != top) {
            top.location.replace(location.href);
        }
    </script>
</head>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<body>
<div class="box">
    <div class="left"></div>
    <div class="right">
        <h4>登 录</h4>
        <form name="loginForm" action="${pageContext.request.contextPath }/login.do" method="post">
            <input class="acc" name="id" type="text" placeholder="用户名">
            <input class="acc" name="pwd" type="password" placeholder="密码">
            <input type="text" value="" placeholder="请输入验证码（不区分大小写）" class="acc2">
            &nbsp;&nbsp;
            <canvas id="canvas" width="100" height="43"></canvas>
            <input class="submit" type="button" value="登录">
        </form>
        <div class="fn">
            <a href="${pageContext.request.contextPath}/Register.jsp">注册账号</a>
            <a href="${pageContext.request.contextPath}/login.jsp">重置</a>
        </div>
    </div>
</div>
<script>
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
            ,form = layui.form
            ,table = layui.table;

        layer.msg('欢迎你');
    });
    $(function(){
        var show_num = [];
        draw(show_num);

        $("#canvas").on('click',function(){
            draw(show_num);
        })
        $(".submit").on('click',function(){
            var val = $(".acc2").val().toLowerCase();
            var num = show_num.join("");
            if ( loginForm.id.value==="")
            {
                layer.alert('请输入用户名', {
                    icon: 5,
                    title: "提示"
                });
                $(".acc2").val('');
                draw(show_num);
                return;
            }else if ( loginForm.pwd.value==="")
            {
                layer.alert('请输入密码', {
                    icon: 5,
                    title: "提示"
                });
                $(".acc2").val('');
                draw(show_num);
                return;
            }else if(val==''){
                layer.alert('请输入验证码', {
                    icon: 5,
                    title: "提示"
                });
                $(".acc2").val('');
                draw(show_num);
                return;
            }else if(val != num){
                layer.alert('验证码错误！请重新输入！', {
                    icon: 5,
                    title: "提示"
                });
                $(".acc2").val('');
                draw(show_num);
                return;
            }
            loginForm.submit();
        })
    })
    function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度

        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    function randomColor() {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
</script>
</body>

</html>
