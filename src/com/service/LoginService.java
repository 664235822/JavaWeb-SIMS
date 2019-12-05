package com.service;

import com.dao.LoginDao;
import com.entity.BaseBean;

import java.sql.SQLException;

public class LoginService {

    LoginDao loginDao;

    public BaseBean checkUserInfo(String code, String pwd) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        loginDao = new LoginDao();

        return loginDao.login(code, pwd);
    }
}
