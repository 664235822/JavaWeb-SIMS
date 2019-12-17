package com.dao;

import com.entity.ClassBean;
import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

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
        String sql = "update Teacher " +
                "set code='" + teacherInfo.getCode() + "'," +
                "name='" + teacherInfo.getName() + "'," +
                "sex='" + teacherInfo.getSex() + "'," +
                "age='" + teacherInfo.getAge() + "'," +
                "education='" + teacherInfo.getEducation() + "'," +
                "goodAt='" + teacherInfo.getGoodAt() + "'," +
                "phone='" + teacherInfo.getPhone() + "'," +
                "QQ='" + teacherInfo.getQQ() + "'," +
                "email='" + teacherInfo.getEmail() + "'," +
                "introduction='" + teacherInfo.getIntroduction() + "' " +
                "where code='" + teacherInfo.getCode() + "';";

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
        String sql = "update Student " +
                "set code='" + studentInfo.getCode() + "'," +
                "name='" + studentInfo.getName() + "'," +
                "age='" + studentInfo.getAge() + "'," +
                "sex='," + studentInfo.getSex() + "'," +
                "QQ='" + studentInfo.getQQ() + "'," +
                "phone='" + studentInfo.getPhone() + "'," +
                "email='" + studentInfo.getAddress() + "'," +
                "where code='" + studentInfo.getCode() + "';";

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
            String sql = "update Student " +
                    "set classId='" + classInfo.get(i).getClassId() + "' " +
                    "where code='" + classInfo.get(i).getCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 为年级添加班级
     * @param classMap @key 班级编号 @value 年级Id
     * @throws SQLException, MyException
     */
    public void updateClass(Map<String, Integer> classMap) throws SQLException, MyException {
        for (String classCode : classMap.keySet()) {
            String sql = "update Class " +
                    "set gradeId='" + classMap.get(classCode) + "' " +
                    "where classCode='" + classCode + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 为年级添加科目
     * @param classMap @key 科目编号 @value 年级Id
     * @throws SQLException, MyException
     */
    public void updateSubject(Map<String, Integer> subjectMap) throws SQLException, MyException {
        for (String classCode : subjectMap.keySet()) {
            String sql = "update Subject " +
                    "set gradeId='" + subjectMap.get(classCode) + "' " +
                    "where subjectCode='" + classCode + "';";

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
        String sql = "update Login " +
                "set pwd='" + pwd + "' " +
                "where code='" + code + "';";

        queryUpdate(sql);
    }
}
