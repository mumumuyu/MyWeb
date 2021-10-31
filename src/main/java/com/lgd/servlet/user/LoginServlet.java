package com.lgd.servlet.user;

import com.lgd.pojo.User;
import com.lgd.service.user.UserService;
import com.lgd.service.user.UserServiceImpl;
import com.lgd.utils.Constants;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Asus
 */
@SuppressWarnings("serial")
public class LoginServlet extends HttpServlet{
	//接受用户参数、调用业务层、转发视图
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO 自动生成的方法存根
		System.out.println("login ============ " );

		//获取用户名和密码
		String id = req.getParameter("id");
		String pwd = req.getParameter("pwd");
		//调用service方法，进行用户匹配
		UserService userService = new UserServiceImpl();
		User user = userService.login(id,pwd);
		PrintWriter out = resp.getWriter();
		if(null != user){
			//登录成功
			System.out.println("succeed ============ " );
			//放入session
			req.getSession().setAttribute(Constants.USER_SESSION,user);
			out.print("<script>alert('succeed!');window.location.href='"+getServletContext().getContextPath()+"/jsp/theme.jsp'</script>");
		}else {
			System.out.println("登录失败 ============ ");
			//页面跳转（login.jsp）带出提示信息--转发
			out.print("<script>alert('The username or password is wrong!!');window.location.href='"+getServletContext().getContextPath()+"/login.jsp'</script>");
		}
	}
}
