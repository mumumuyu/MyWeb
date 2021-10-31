package com.lgd.servlet.user;

import com.lgd.pojo.User;
import com.lgd.service.user.UserService;
import com.lgd.service.user.UserServiceImpl;
import com.lgd.utils.Constants;
import org.json.JSONObject;

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

		String msg = null;
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
			req.getSession().setAttribute(Constants.USER_SESSION,user);
			msg="ok";
		}else {
			System.out.println("登录失败 ============ ");
			msg="no";
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("msg", msg);
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(jsonObject.toString());
	}
}
