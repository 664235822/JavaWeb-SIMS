package com.dao;

import com.entity.*;

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
                "email='" + studentInfo.getAddress() + "' " +
                "where code='" + studentInfo.getCode() + "';";

        queryUpdate(sql);

        updatePwd(studentInfo.getCode(), studentInfo.getPwd());

        destroy(null);
    }

    /*
     * 学生转班
     * @param classList 要转班的学生信息列表
     * @throws SQLException, MyException
     */
    public void updateClassId(List<StudentBean> classList) throws SQLException, MyException {
        for (int i = 0; i < classList.size(); i++) {
            String sql = "update Student " +
                    "set classId='" + classList.get(i).getClassId() + "' " +
                    "where code='" + classList.get(i).getCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 班级转年级
     * @param classList 要转班的学生信息列表
     * @throws SQLException, MyException
     */
    public void updateGradeId(List<ClassBean> gradeList) throws SQLException, MyException {
        for (int i = 0; i < gradeList.size(); i++) {
            String sql = "update Class " +
                    "set gradeId='" + gradeList.get(i).getGradeId() + "' " +
                    "where classCode='" + gradeList.get(i).getClassCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 更新班级名
     * @param classInfo 要更新的班级信息
     * @throws SQLException, MyException
     */
    public void updateClass(ClassBean classInfo) throws SQLException, MyException {
        String sql = "update Class " +
                "set classCode='" + classInfo.getClassCode() + "' ," +
                "className='" + classInfo.getClassName() + "' " +
                "where classCode='" + classInfo.getClassCode() + "';";

        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 更新科目名
     * @param 要更新的科目信息
     * @throws SQLException, MyException
     */
    public void updateSubject(SubjectBean subjectInfo) throws SQLException, MyException {
        String sql = "update Subject " +
                "set subjectCode='" + subjectInfo.getSubjectCode() + "'," +
                "subjectName='" + subjectInfo.getSubjectName() + "' " +
                "where subjectCode='" + subjectInfo.getSubjectCode() + "';";

        queryUpdate(sql);


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
