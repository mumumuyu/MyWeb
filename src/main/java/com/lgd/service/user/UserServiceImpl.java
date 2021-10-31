package com.lgd.service.user;

import com.lgd.dao.UserMapper;
import com.lgd.pojo.User;
import com.lgd.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;

public class UserServiceImpl implements UserService{
    @Override
    public User login(String id, String password) {
        SqlSession sqlSession = MybatisUtils.getsqlSession();

        UserMapper userMapper= sqlSession.getMapper(UserMapper.class);
        User user = userMapper.getUserById(id);
        sqlSession.close();

        if (null != user) {
            if (!user.getPwd().equals(password)) {
                user = null;
            }
        }
        return user;
    }

    @Override
    public boolean register(User user) {
        SqlSession sqlSession = MybatisUtils.getsqlSession();
        UserMapper userMapper= sqlSession.getMapper(UserMapper.class);
        int num = userMapper.addUser(user);
        sqlSession.commit();//千万别忘了！！！
        sqlSession.close();
        if(num != 0) {
            return true;
        }
        return false;
    }

}
