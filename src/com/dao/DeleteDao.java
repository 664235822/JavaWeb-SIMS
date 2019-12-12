package com.dao;

import com.entity.MyException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/*
 * 删除信息类
 */
public class DeleteDao extends BaseDao {

    public DeleteDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 删除教师信息
     * @param 数据库表名
     * @param 要删除行的账号字段列表
     * @throws SQLException, MyException
     */
    public void deleteTeacher(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "delete from Teacher where tCode='" + codeList.get(i) + "';";
            queryUpdate(sql);

            sql = "delete from Login where code='" + codeList.get(i) + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 删除学生信息
     * @param 要删除行的账号字段列表
     * @throws SQLException, MyException
     */
    public void deleteStudent(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "delete from Student where stuCode='" + codeList.get(i) + "';";
            queryUpdate(sql);

            sql = "delete from Login where code='" + codeList.get(i) + "';";
            queryUpdate(sql);

            sql = "select * from Result where stuCode='" + codeList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from Result where stuCode='" + codeList.get(i) + "';";
                queryUpdate(sql);
            }
            rs.close();
        }

        destroy(null);
    }
}
