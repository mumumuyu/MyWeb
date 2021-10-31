package com.lgd.servlet.user;

import com.lgd.pojo.User;
import com.lgd.service.user.UserService;
import com.lgd.service.user.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class RegisterServlet extends HttpServlet {
    //接受用户参数、调用业务层、转发视图
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO 自动生成的方法存根
        System.out.println("正在注册 ============ " );

        //获取用户名和密码
        String id = req.getParameter("id");
        String name = req.getParameter("name");
        String pwd = req.getParameter("pwd");
        //调用service方法，进行用户匹配
        UserService userService = new UserServiceImpl();
       boolean flag = userService.register(new User(id,name,pwd));
        PrintWriter out = resp.getWriter();
        if(true == flag){
            //注册成功
            System.out.println("注册成功 ============ " );
            out.print("<script>alert('注册成功!');window.location.href='"+getServletContext().getContextPath()+"/login.jsp'</script>");
        }else{
            System.out.println("注册失败 ============ " );
            //页面跳转（login.jsp）带出提示信息--转发
            out.print("<script>alert('注册失败!');window.location.href='"+getServletContext().getContextPath()+"/Register.jsp'</script>");
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO 自动生成的方法存根
        doGet(req, resp);
    }
}