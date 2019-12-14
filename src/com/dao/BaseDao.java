package com.dao;

import com.entity.MyException;

import java.sql.*;

/*
 * 数据库连接类
 */
public class BaseDao {

    Connection conn;
    Statement st;

    /*
     * 连接到数据库
     * @throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException
     */
    protected BaseDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
        conn = DriverManager.getConnection(
                "jdbc:mysql://129.28.136.155:3306/SIMS?characterEncoding=UTF-8", "root", "zhuzhou9uu897@");

        st = conn.createStatement();
    }

    /*
     * 查询数据
     * @param sql 查询语句
     * @return ResultSet 返回数据
     * @throws SQLException
     */
    protected ResultSet querySelect(String sql) throws SQLException {
        return st.executeQuery(sql);
    }

    /*
     * 添加、更新、删除数据
     * @param sql 查询语句
     * @throws SQLException, MyException
     */
    protected void queryUpdate(String sql) throws SQLException, MyException {
        int index = st.executeUpdate(sql);
        if (index == 0) throw new MyException("数据库更新失败");
    }

    /*
     * 关闭数据库连接
     * @param rs 查询返回数据
     * @throws SQLException
     */
    protected void destroy(ResultSet rs) throws SQLException {
        if (rs != null)
            rs.close();
        st.close();
        conn.close();
    }
}