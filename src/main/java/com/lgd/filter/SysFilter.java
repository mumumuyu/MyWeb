package com.lgd.filter;

import com.lgd.pojo.User;
import com.lgd.utils.Constants;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SysFilter implements Filter{
	@Override
	public void init(FilterConfig filterConfig) throws ServletException{
		
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		// TODO 自动生成的方法存根
		//System.out.println("SysFilter doFilter()===========");
		HttpServletRequest request =  (HttpServletRequest)req;
		HttpServletResponse response = (HttpServletResponse)resp;
		
		//过滤器，从session中获取用户
		User user = (User)request.getSession().getAttribute(Constants.USER_SESSION);
		//User user = (User)request.getSession().getAttribute("userSession");
		if(user == null){//已经被移除或者注销了，或者未登录
			response.sendRedirect("/MyWeb_war/error.jsp");
			//System.out.println("未登录");
		}else {
			chain.doFilter(req, resp);
			//System.out.println("过滤器");
		}
	}

	@Override
	public void destroy() {
		// TODO 自动生成的方法存根
		
	}
	
}
