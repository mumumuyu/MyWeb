package com.lgd.dao;

import com.lgd.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author LGD
 */
public interface UserMapper {
    /**
     * 获得所有用户
     * @param
     * @return com.lgd.pojo.User
     */
    List<User> getUserList();

    /**
     * 获得指定Id用户
     * @return User
     */
    User getUserById(String id);

    /**
     * 增加用户
     * @param user
     * @return int
     */
    int addUser(User user);

    /**
     * 获得所有用户
     * @param   user
     * @return int
     */
    int updateUser(User user);

    /**
     * 获得所有用户
     * @param id
     * @return int
     */
    int deleteUser(String id);
    @Select("select * from mybatis.user where id = #{id}")
    User getUserById2(@Param("id") String id);

    @Insert("insert into user(id,name,pwd) values (#{id},#{name},#{password})")
    int addUser2(User user);

    @Update("update user set name=#{name},pwd=#{password} where id=#{id}")
    int updateUser2(User user);

    @Delete("delete from user where id = #{id}")
    int deleteUser2(@Param("id") String id);
}
