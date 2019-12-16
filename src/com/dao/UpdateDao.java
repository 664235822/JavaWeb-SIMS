package com.dao;

import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;

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
     * 更新教师信息
     * @param teacherInfo 要更新的教师信息
     * @throws SQLException, MyException
     */
    public void updateTeacher(TeacherBean teacherInfo) throws SQLException, MyException {
        String sql = "update Teacher ";
        sql += "set code='" + teacherInfo.getCode() + "',";
        sql += "name='" + teacherInfo.getName() + "',";
        sql += "sex='" + teacherInfo.getSex() + "',";
        sql += "age='" + teacherInfo.getAge() + "',";
        sql += "education='" + teacherInfo.getEducation() + "',";
        sql += "goodAt='" + teacherInfo.getGoodAt() + "',";
        sql += "phone='" + teacherInfo.getPhone() + "',";
        sql += "QQ='" + teacherInfo.getQQ() + "',";
        sql += "email='" + teacherInfo.getEmail() + "',";
        sql += "introduction='" + teacherInfo.getIntroduction() + "' ";
        sql += "where code='" + teacherInfo.getCode() + "';";

        queryUpdate(sql);

        updatePwd(teacherInfo.getCode(), teacherInfo.getPwd());

        destroy(null);
    }

    /*
     * 更新学生信息
     * @param studentInfo 要更新的学生信息
     * @throws SQLException, MyException
     */
    public void updateStudent(StudentBean studentInfo) throws SQLException, MyException {
        String sql = "update Student ";
        sql += "set code='" + studentInfo.getCode() + "',";
        sql += "name='" + studentInfo.getName() + "',";
        sql += "age='" + studentInfo.getAge() + "',";
        sql += "sex='," + studentInfo.getSex() + "',";
        sql += "QQ='" + studentInfo.getQQ() + "',";
        sql += "phone='" + studentInfo.getPhone() + "',";
        sql += "email='" + studentInfo.getAddress() + "',";
        sql += "where code='" + studentInfo.getCode() + "';";

        queryUpdate(sql);

        updatePwd(studentInfo.getCode(), studentInfo.getPwd());

        destroy(null);
    }

    /*
     * 学生转班
     * @param studentInfo 要转班的学生信息列表
     * @throws SQLException, MyException
     */
    public void updateClassId(List<StudentBean> classInfo) throws SQLException, MyException {
        for (int i = 0; i < classInfo.size(); i++) {
            String sql = "update Student ";
            sql += "set classId='" + classInfo.get(i).getClassId() + "' ";
            sql += "where code='" + classInfo.get(i).getCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 更新用户密码
     * @param code 账户名
     * @param pwd 密码
     * @throws SQLException, MyException
     */
    void updatePwd(String code, String pwd) throws SQLException, MyException {
        String sql = "update Login ";
        sql += "set pwd='" + pwd + "' ";
        sql += "where code='" + code + "';";

        queryUpdate(sql);
    }
}
