package com.dao;

import com.entity.BaseBean;
import com.entity.MyException;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginDao extends BaseDao {

    public LoginDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    public BaseBean login(String code, String pwd, int stateId) throws SQLException, MyException {
        String sql = "select * from Login where code = '" + code + "' and pwd = '" + pwd + "' and stateId = '" + stateId + "';";

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();

        if (rs.next()) {
            result.setCode(BaseBean.SUCCESS);
            result.setData("登录成功");
        } else {
            throw new MyException("登录失败，用户名和密码错误");
        }

        destroy(rs);
        return result;
    }
}
