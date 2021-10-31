package com.lgd.service.user;

import com.lgd.pojo.User;

public interface UserService {

    //用户登录
    public User login(String id, String password);

    //用户注册
    public boolean register(User user);


}
