package com.service;

import com.dao.LoginDao;
import com.entity.BaseEntity;

import java.sql.SQLException;

public class LoginService {

    LoginDao loginDao;

    public BaseEntity checkUserInfo(String code,String pwd) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        loginDao=new LoginDao();

        BaseEntity result = loginDao.login(code,pwd);
        return result;
    }
}
