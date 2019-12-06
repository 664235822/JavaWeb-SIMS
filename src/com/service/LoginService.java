package com.service;

import com.dao.LoginDao;
import com.entity.BaseBean;
import com.entity.MyException;

import java.sql.SQLException;

public class LoginService {

    LoginDao loginDao;

    public BaseBean checkUserInfo(String code, String pwd, int stateId) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        loginDao = new LoginDao();

        return loginDao.login(code, pwd, stateId);
    }
}
