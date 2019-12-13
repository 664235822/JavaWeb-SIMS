package com.dao;

import com.entity.BaseBean;
import com.entity.LoginBean;
import com.entity.MyException;

import java.sql.ResultSet;
import java.sql.SQLException;

/*
 * 用户登录类
 */
public class LoginDao extends BaseDao {

    public LoginDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 用户登录
     * @param code 用户名
     * @param pwd 密码
     * @param stateId 用户类型
     * @return BaseBean 返回登录信息
     * @throws SQLException, MyException
     */
    public BaseBean login(String code, String pwd, int stateId) throws SQLException, MyException {
        String sql = "select * from Login where code = '" + code + "' and pwd = '" + pwd + "' and stateId = '" + stateId + "';";

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();

        if (rs.next()) {
            result.setCode(BaseBean.SUCCESS);
            LoginBean loginInfo = new LoginBean();

            switch (rs.getInt("stateId")) {
                case 1:
                    loginInfo.setUsername(rs.getString("code"));
                    break;
                case 2:
                    sql = "select name from Teacher where code = '" + rs.getString("code") + "'";
                    rs = querySelect(sql);
                    if (rs.next())
                        loginInfo.setUsername(rs.getString("name"));
                    else
                        throw new MyException("获取用户名失败");
                    break;
                case 3:
                    sql = "select name from Student where code = '" + rs.getString("code") + "'";
                    rs = querySelect(sql);
                    if (rs.next())
                        loginInfo.setUsername(rs.getString("name"));
                    else
                        throw new MyException(("获取用户名失败"));
                    break;
            }

            result.setCode(BaseBean.SUCCESS);
            result.setData(loginInfo);
            result.setMessage("登录成功");
        } else {
            throw new MyException("登录失败，用户名和密码错误");
        }

        destroy(rs);
        return result;
    }
}
