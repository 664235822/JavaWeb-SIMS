package com.service;

import com.dao.LoginDao;
import com.entity.BaseBean;
import com.entity.MyException;

import java.sql.SQLException;

/*
 * 登录服务类
 */
public class LoginService {

    LoginDao loginDao;

    /*
     * 用户登录
     * @param code 用户名
     * @param pwd 密码
     * @param stateId 用户类型
     * @return BaseBean 返回登录信息
     * @throws throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public BaseBean login(String code, String pwd, int stateId) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        loginDao = new LoginDao();

        return loginDao.login(code, pwd, stateId);
    }

    /*
     * 修改密码
     * @param code 用户名
     * @param pwd 旧密码
     * @param newPwd 新密码
     * @throws throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void changePwd(String code, String pwd, String newPwd) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        loginDao = new LoginDao();

        loginDao.changePwd(code, pwd, newPwd);
    }
}
