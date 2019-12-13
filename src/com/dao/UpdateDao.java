package com.dao;

import com.entity.MyException;
import com.entity.StudentBean;

import java.sql.SQLException;
import java.util.List;

/*
 * 更新信息类
 */
public class UpdateDao extends BaseDao {

    public UpdateDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 学生转班
     * @param studentInfo 要转班的学生信息列表
     * @throws SQLException, MyException
     */
    public void updateClassId(List<StudentBean> studentInfo) throws SQLException, MyException {
        for (int i = 0; i < studentInfo.size(); i++) {
            String sql = "update Student ";
            sql += "set classId='" + studentInfo.get(i).getClassId() + "' ";
            sql += "where code='" + studentInfo.get(i).getCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }
}
