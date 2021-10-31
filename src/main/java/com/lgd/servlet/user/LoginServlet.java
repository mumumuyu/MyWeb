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
	//�����û�����������ҵ��㡢ת����ͼ
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO �Զ����ɵķ������
		System.out.println("login ============ " );

		String msg = null;
		//��ȡ�û���������
		String id = req.getParameter("id");
		String pwd = req.getParameter("pwd");
		//����service�����������û�ƥ��
		UserService userService = new UserServiceImpl();
		User user = userService.login(id,pwd);
		PrintWriter out = resp.getWriter();
		if(null != user){
			//��¼�ɹ�
			System.out.println("succeed ============ " );
			req.getSession().setAttribute(Constants.USER_SESSION,user);
			msg="ok";
		}else {
			System.out.println("��¼ʧ�� ============ ");
			msg="no";
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("msg", msg);
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(jsonObject.toString());
	}
}
