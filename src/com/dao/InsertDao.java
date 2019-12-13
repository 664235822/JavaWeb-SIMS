package com.dao;

import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;

import java.sql.SQLException;

/*
 * 添加信息类
 */
public class InsertDao extends BaseDao {

    public InsertDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 添加教师信息
     * @param info 教师信息
     * @throws SQLException, MyException
     */
    public void insertTeacher(TeacherBean info) throws SQLException, MyException {
        StringBuffer columnNames = new StringBuffer();
        for (int i = 0; i < TeacherBean.teacherInfo.length; i++) {
            columnNames.append(TeacherBean.teacherInfo[i]);
            columnNames.append(",");
        }
        columnNames.deleteCharAt(columnNames.length() - 1);

        StringBuffer values = new StringBuffer();
        values.append("'" + info.getCode() + "'").append(",");
        values.append("'" + info.getName() + "'").append(",");
        values.append("'" + info.getSex() + "'").append(",");
        values.append("'" + info.getAge() + "'").append(",");
        values.append("'" + info.getEducation() + "'").append(",");
        values.append("'" + info.getGoodAt() + "'").append(",");
        values.append("'" + info.getPhone() + "'").append(",");
        values.append("'" + info.getQQ() + "'").append(",");
        values.append("'" + info.getEmail() + "'").append(",");
        values.append("'" + info.getAddress() + "'").append(",");
        values.append("'" + info.getIntroduction() + "'");

        String sql = "insert into Login (code,pwd,stateId) values ('" + info.getCode() + "','" + info.getPwd() + "','2');";
        queryUpdate(sql);

        sql = "insert into Teacher (" + columnNames.toString() + ") values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 添加学生信息
     * @param info 学生信息
     * @throws SQLException, MyException
     */
    public void insertStudent(StudentBean info) throws SQLException, MyException {
        StringBuffer columnNames = new StringBuffer();
        for (int i = 0; i < StudentBean.studentInfo.length; i++) {
            columnNames.append(StudentBean.studentInfo[i]);
            columnNames.append(",");
        }
        columnNames.deleteCharAt(columnNames.length() - 1);

        StringBuffer values = new StringBuffer();
        values.append("'" + info.getCode() + "'").append(",");
        values.append("'" + info.getName() + "'").append(",");
        values.append("'" + info.getAge() + "'").append(",");
        values.append("'" + info.getSex() + "'").append(",");
        values.append("'" + info.getQQ() + "'").append(",");
        values.append("'" + info.getPhone() + "'").append(",");
        values.append("'" + info.getAddress() + "'").append(",");
        values.append("'" + info.getClassId() + "'");

        String sql = "insert into Login (code,pwd,stateId) values ('" + info.getCode() + "','" + info.getPwd() + "','3');";
        queryUpdate(sql);

        sql = "insert into Teacher (" + columnNames.toString() + ") values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }
}
