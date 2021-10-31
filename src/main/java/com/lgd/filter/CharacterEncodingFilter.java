package com.lgd.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * @author lgd
 */
public class CharacterEncodingFilter implements Filter {
    @Override //初始化
    public void init(FilterConfig filterConfig) throws ServletException {
//        System.out.println("过滤器初始化");
    }

    @Override //
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=UTF-8");
        //写test会以下载文件
//        System.out.println("过滤器执行前");
        chain.doFilter(request,response);
        //让请求继续跑，不写就会在这停止
//        System.out.println("过滤器执行后");
    }

    @Override
    public void destroy() {
        System.out.println("过滤器销毁");
    }
}
