package com.dao;

import com.entity.BaseEntity;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginDao extends BaseDao{

    public LoginDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    public BaseEntity login(String code, String pwd) throws SQLException {
        String sql="select * from Login where code = '"+code +"' and pwd = '"+pwd+"';";

        ResultSet rs= querySelect(sql);
        BaseEntity result=new BaseEntity();

        if(rs.next()){
            result.setCode(BaseEntity.SUCCESS);
            result.setData("登录成功");
        }else{
            result.setCode(BaseEntity.FAILED);
            result.setData("登录失败，用户名和密码错误");
        }

        destroy(rs);
        return result;
    }
}
