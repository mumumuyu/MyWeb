layui.define(['form', 'layedit', 'laydate', 'jquery', 'layer'], function (exports) {
    var form = layui.form, layer = layui.layer, layedit = layui.layedit, laydate = layui.laydate, layer = layui.layer, $ = layui.jquery;
    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        },
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            if ($('input[type=password]').val() != value) {
                return '两次密码输入不一致！';
            }
        },
        opass: function (value) {
            if ($('input[type=password]').val() == value) {
                return '新密码与原始密码一致，无需修改';
            }
        }
    });
    exports('laymod', {});
});