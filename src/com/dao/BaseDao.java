package com.dao;

import java.sql.*;

public class BaseDao {

    Connection conn;
    Statement st;

    public BaseDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
        conn = DriverManager.getConnection(
                "jdbc:mysql://119.28.8.50:3306/SIMS", "root", "zhuzhou9uu897@");

        st=conn.createStatement();
    }

    public ResultSet querySelect(String sql) throws SQLException {
        return st.executeQuery(sql);
    }

    public boolean queryUpdate(String sql) throws SQLException {
        int index=st.executeUpdate(sql);
        return index != 0;
    }

    public void destroy(ResultSet set) throws SQLException {
        if(set!=null)
            set.close();
        st.close();
        conn.close();
    }
}