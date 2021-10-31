// 导入公共模块
import { serverURL, imgServerURL } from './commons.js';

layui.use(['form', 'jquery', 'layer', 'upload', 'element'], function () {
    var form = layui.form, layer = layui.layer, $ = layui.jquery, upload = layui.upload, element = layui.element;
    // 登录人信息
    let otext = sessionStorage.getItem('operator');
    if (otext) {
        let operator = JSON.parse(otext);
        if (operator.headSculpture != null && operator.headSculpture != '') {
            $('#operatorImg').attr('src', imgServerURL + operator.headSculpture);
        }
        if (operator.uNickname != null && operator.uNickname != '') {
            $('#operatorName').text(operator.uNickname);
        }
    }
    // 点击个人资料按钮
    $('#userInfoBtn').click(function (e) {
        e.preventDefault();
        // 点击个人资料按钮 弹出修改密码页面
        layer.open({
            type: 1,
            content: $('#userinfo'),
            title: '个人资料',
            area: ['660px', '480px'],
            closeBtn: 2,
            shadeClose: false,
            success: function (layero, index) {
                $('#userinfo_title').text('个人资料');
                $.ajax({
                    type: "GET",
                    url: serverURL + "/api/user/getByUid",
                    beforeSend: function (xhr) {
                        // 将用户ID存储在请求头中
                        // oId 操作人ID
                        xhr.setRequestHeader('oId', uId);
                        // uId 被查询的用户ID
                        xhr.setRequestHeader('uId', uId);
                        layer.msg('加载中', {
                            icon: 16,
                            shade: 0.01,
                        });
                    },
                    dataType: "json",
                    success: function (response) {
                        switch (response.code) {
                            case '200':
                                let user = response.data;
                                // 将获取到用户ID保存在临时存储中
                                sessionStorage.setItem('muid', user.uId);
                                form.val('userinfo_form', {
                                    // "name": "value"
                                    "uAccount": user.uAccount,
                                    "uNickname": user.uNickname,
                                    "headSculpture": user.headSculpture,
                                    "uRealname": user.uRealname,
                                    "uIdCard": user.uIdCard,
                                    "uMobile": user.uMobile
                                });
                                break;

                            default:
                                break;
                        }
                    }
                });
                // 异步验证账号是否可以使用
                $('#account').keyup(function (e) {
                    e.preventDefault();
                    if ($.trim($(this).val()) != '') {
                        $.ajax({
                            type: "get",
                            url: serverURL + "/api/user/checkAccount/" + $.trim($(this).val()),
                            beforeSend: function (xhr) {
                                // 将用户ID存储在请求头中
                                // oId 操作人ID
                                xhr.setRequestHeader('oId', uId);
                                // uId 被查询的用户ID
                                xhr.setRequestHeader('uId', uId);
                            },
                            dataType: "json",
                            success: function (response) {
                                if (response.data) {
                                    $('#submit_userinfo').addClass('layui-btn-disabled').attr('disabled', true);
                                    layer.tips(response.msg, '#account', {
                                        tips: [1, '#FA9090']
                                    });
                                } else {
                                    $('#submit_userinfo').removeClass('layui-btn-disabled').attr('disabled', false);
                                    $('#submit_userinfo').removeAttr('disabled');
                                }
                            }
                        });
                    }
                });
                // 普通图片上传
                var uploadInst = upload.render({
                    elem: '#selectImg',
                    url: serverURL + '/user.do?methodName=bindHeadSculpture',
                    // auto: false,
                    // choose: function (obj) {
                    //     //将每次选择的文件追加到文件队列
                    //     var files = obj.pushFile();

                    //     //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    //     obj.preview(function (index, file, result) {
                    //         console.log(index); //得到文件索引
                    //         console.log(file); //得到文件对象
                    //         console.log(result); //得到文件base64编码，比如图片

                    //         //obj.resetFile(index, file, '123.jpg'); //重命名文件名，layui 2.3.0 开始新增

                    //         //这里还可以做一些 append 文件列表 DOM 的操作

                    //         //obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
                    //         //delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
                    //         $('#preview').attr('src', result);
                    //     });
                    // },
                    multiple: false,
                    before: function (obj) {
                        $('#demoText').html('');
                        //预读本地文件示例，不支持ie8
                        obj.preview(function (index, file, result) {
                            $('#preview').attr('src', result); //图片链接（base64）
                        });
                    },
                    progress: function (n, elem, res, index) {
                        var percent = n + '%' //获取进度百分比
                        element.progress('demo', percent); //可配合 layui 进度条元素使用

                        // console.log(elem); //得到当前触发的元素 DOM 对象。可通过该元素定义的属性值匹配到对应的进度条。
                        // console.log(res); //得到 progress 响应信息
                        // console.log(index); //得到当前上传文件的索引，多文件上传时的进度条控制，如：
                        // element.progress('demo-' + index, n + '%'); //进度条
                    },
                    accept: 'images',
                    acceptMime: 'image/*',
                    done: function (res) {
                        //上传完毕回调
                        switch (res.code) {
                            case '200':
                                //上传成功 更新token
                                let headImg = imgServerURL + res.data.headImg;
                                // 显示上传后的图像
                                $('#thumbImagePath').attr('src', headImg);
                                $('#fullPath').attr('src', headImg);
                                // 表单赋值将上传返回后的图像地址赋值给表单
                                $('#headImg').val(res.data.headImg);
                                // css效果 隐藏上传进度条
                                $('#demo').css('display', 'none');
                                break;
                            default:
                                //如果上传失败
                                break;
                        }
                    },
                    error: function () {
                        //请求异常回调
                        //演示失败状态，并实现重传
                        var demoText = $('#demoText');
                        demoText.html('<span style="color: #ff5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                        demoText.find('.demo-reload').on('click', function () {
                            uploadInst.upload();
                        });
                    }
                });
                // 修改个人资料提交按钮事件触发
                form.on('submit(submit_userinfo)', function (data) {
                    let userinfo = data.field;
                    // 从临时存储中获取用户ID
                    userinfo.uId = sessionStorage.getItem('muid');
                    // 从对象中删除file属性
                    delete userinfo.file;
                    $.ajax({
                        type: "PATCH",
                        url: serverURL + "/api/user/modifyUser",
                        beforeSend: function (xhr) {
                            $('#submit_userinfo').addClass('layui-btn-disabled').attr('disabled', true);
                            // 将用户ID存储在请求头中
                            xhr.setRequestHeader("oId", uId);
                            layer.msg('加载中', {
                                icon: 16,
                                shade: 0.01,
                            });
                        },
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify(userinfo),
                        dataType: "json",
                        success: function (response) {
                            // 启动登录按钮
                            $('#submit_userinfo').removeClass('layui-btn-disabled').attr('disabled', false);
                            $('#submit_userinfo').removeAttr('disabled');
                            switch (response.code) {
                                case '200':
                                    // 更新页面显示的登录人昵称
                                    $('#operatorName').text(response.data.uNickname);
                                    // 更新登陆人头像
                                    if (response.data.headSculpture) {
                                        $('#operatorImg').attr('src', imgServerURL + response.data.headSculpture);
                                    }
                                    // 关闭当前弹出层
                                    layer.msg(response.msg, { icon: 1, shade: 0.3 });
                                    setTimeout(() => {
                                        layer.close(index);
                                        form.val('userinfo_form', {
                                            // "name": "value"
                                            "uAccount": "",
                                            "uNickname": "",
                                            "headSculpture": "",
                                            "uRealname": "",
                                            "uIdCard": "",
                                            "uMobile": ""
                                        });
                                    }, 2000)
                                    break;

                                default:
                                    break;
                            }
                        }
                    });
                    return false;
                });
            },
            cancel: function () {
                sessionStorage.removeItem('muid');
                form.val('userinfo_form', {
                    // "name": "value"
                    "uAccount": "",
                    "uNickname": "",
                    "headSculpture": "",
                    "uRealname": "",
                    "uIdCard": "",
                    "uMobile": ""
                });
                $('#userinfo').css('display', 'none');
            }
        });
    });
    // 点击修改密码按钮
    $('#modifypasswordBtn').click(function (e) {
        e.preventDefault();
        // 点击修改密码按钮 弹出修改密码页面
        layer.open({
            type: 1,
            content: $('#modifypassword'),
            title: '修改密码',
            area: ['660px', '320px'],
            closeBtn: 2,
            shadeClose: false,
            success: function (layero, index) {
                // console.log(layero, index);
                $('#modifypassword_title').text('修改密码');
                // 修改密码提交按钮事件触发
                form.on('submit(formModifyPassword)', function (data) {
                    // console.log(data.field);
                    $.ajax({
                        type: "POST",
                        url: serverURL + "/api/user/modifyPassword/" + uId,
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        beforeSend: function (xhr) {
                            $('#formModifyPassword').addClass('layui-btn-disabled').attr('disabled', true);
                            layer.msg('加载中', {
                                icon: 16,
                                shade: 0.01,
                                time: 0
                            });
                        },
                        data: data.field,
                        dataType: "json",
                        success: function (response) {
                            // 启动登录按钮
                            $('#formModifyPassword').removeClass('layui-btn-disabled').attr('disabled', false);
                            $('#formModifyPassword').removeAttr('disabled');
                            switch (response.code) {
                                case '200':
                                    // 关闭当前弹出层
                                    layer.msg(response.msg, { icon: 1, shade: 0.3 });
                                    setTimeout(() => {
                                        layer.close(index);
                                        // $('#uPassword').val('');
                                        // $('#reuPassword').val('');
                                        // $('#originalPassword').val('');
                                        form.val('modifypassword_form', {
                                            // "name": "value"
                                            "uPassword": "",
                                            "reuPassword": "",
                                            "originalPassword": ""
                                        });
                                    }, 2000);
                                    break;
                                case '602':
                                    $('#uPassword').focus();
                                    layer.tips(response.msg, '#uPassword', {
                                        tips: [1, '#FA9090']
                                    });
                                    break;
                                case '603':
                                    $('#reuPassword').focus();
                                    layer.tips(response.msg, '#reuPassword', {
                                        tips: [1, '#FA9090']
                                    });
                                    break;
                                case '604':
                                    $('#originalPassword').focus();
                                    layer.tips(response.msg, '#originalPassword', {
                                        tips: [3, '#FA9090']
                                    });
                                    break;
                                case '605':
                                    $('#uPassword').focus();
                                    layer.tips(response.msg, '#uPassword', {
                                        tips: [1, '#FA9090']
                                    });
                                    break;
                                case '606':
                                    $('#reuPassword').focus();
                                    layer.tips(response.msg, '#reuPassword', {
                                        tips: [1, '#FA9090']
                                    });
                                    break;
                                case '607':
                                    $('#originalPassword').focus();
                                    layer.tips(response.msg, '#originalPassword', {
                                        tips: [3, '#FA9090']
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                    return false;
                });
            },
            cancel: function () {
                form.val('modifypassword_form', {
                    // "name": "value"
                    "uPassword": "",
                    "reuPassword": "",
                    "originalPassword": ""
                });
                $('#modifypassword').css('display', 'none');
            }
        });
    });
});