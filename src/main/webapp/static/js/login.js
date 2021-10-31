// 导入公共模块
// import commons from './js/commons.js'
import { serverURL } from './commons.js'
// 引入layui 弹出层模块 和jQuery模块
layui.use(['layer', 'jquery'], function () {
    // 引入layui 弹出层模块 和jQuery模块
    var layer = layui.layer, $ = layui.jquery;
    // 页面加载完成后账号获取焦点
    $('#uAccount').focus();
    // 点击登录按钮 异步登录
    $('#submitBtn').click(function (e) {
        e.preventDefault();
        // 获取账号的值
        let uAccount = $('#uAccount').val();
        // 获取密码的值
        let uPassword = $('#uPassword').val();
        if ('' == uAccount || '' == $.trim(uAccount)) {
            // 如果账号为空 
            $('#uAccount').focus();
            // 页面提示
            layer.open({
                type: 4,
                content: ['账号不能为空', '#uAccount'],
                time: 2000
            });
        } else if ('' == uPassword || '' == $.trim(uPassword)) {
            // 如果密码为空 
            $('#uPassword').focus();
            // 页面提示
            layer.open({
                type: 4,
                content: ['密码不能为空', '#uPassword'],
                time: 2000
            });
        } else {
            // console.log(uAccount + uPassword);
            // 禁用登录按钮
            $('#submitBtn').addClass('layui-btn-disabled').attr('disabled', true);
            // 将参数封装为对象
            let data = {
                // :属性名:属性值
                uAccount: $.trim(uAccount),
                uPassword: $.trim(uPassword),
            };
            // 如果账号和密码不为空 异步提交  
            $.ajax({
                // 规定请求的类型（GET 或 POST）,新增  PUT PATCH DELETE HEAD OPTIONS CONNECT TRACE
                type: "post",
                // 规定发送请求的 URL。默认是当前页面。
                url: serverURL + "/api/user/login",
                // 布尔值，表示请求是否异步处理。默认是 true。
                async: true,
                // 发送请求前运行的函数。
                beforeSend: function (xhr) {
                    layer.msg('加载中', {
                        icon: 16,
                        shade: 0.01,
                        time: 0
                    });
                },
                // 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。
                contentType: "application/json;charset=UTF-8",
                // 规定要发送到服务器的数据。
                data: JSON.stringify(data),
                // 预期的服务器响应的数据类型。 text xml json 等
                dataType: "json",
                success: function (response, status, xhr) {
                    // 疯狂模式，关闭所有层
                    layer.closeAll()
                    // 启动登录按钮
                    $('#submitBtn').removeClass('layui-btn-disabled').attr('disabled', false);
                    switch (response.code) {
                        case '200':
                            layer.msg(response.msg, { icon: 1, shade: 0.3 });
                            sessionStorage.setItem('operator',JSON.stringify(response.data));
                            console.log(sessionStorage.getItem('operator'));
                            window.location.replace(serverURL + response.location);
                            break;
                        case '601':
                            // 如果账号为空 
                            $('#uAccount').focus();
                            // 页面提示
                            layer.open({
                                type: 4,
                                content: ['账号不能为空', '#uAccount'],
                                time: 2000
                            });
                            break;
                        case '602':
                            // 如果密码为空 
                            $('#uPassword').focus();
                            // 页面提示
                            layer.open({
                                type: 4,
                                content: ['密码不能为空', '#uPassword'],
                                time: 2000
                            });
                            break;
                        default:
                            $('#uPassword').focus();
                            layer.msg(response.msg, { icon: 2, shade: 0.3 });
                            break;
                    }
                },
                error: function (xhr, status, error) {
                    // 疯狂模式，关闭所有层
                    layer.closeAll()
                    // 启动登录按钮
                    $('#submitBtn').removeClass('layui-btn-disabled').attr('disabled', false);
                    $('#submitBtn').removeAttr('disabled');
                    // console.log(error);
                },
                // 设置本地的请求超时时间（以毫秒计）。
                timeout: 3000,
                // 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
                complete: function (xhr, status) {
                    if (status == 'timeout') {
                        layer.msg('请求超时', { icon: 5, shade: 0.3 });
                    }
                }
            });
        }
        // 防止表单同步提交
        return false;
    });
});