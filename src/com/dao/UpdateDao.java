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
                "address='" + teacherInfo.getAddress() + "'," +
                "introduction='" + teacherInfo.getIntroduction() + "' " +
                "where code='" + teacherInfo.getCode() + "';";

        queryUpdate(sql);

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
                "sex='" + studentInfo.getSex() + "'," +
                "QQ='" + studentInfo.getQQ() + "'," +
                "phone='" + studentInfo.getPhone() + "'," +
                "address='" + studentInfo.getAddress() + "' " +
                "where code='" + studentInfo.getCode() + "';";

        queryUpdate(sql);

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
     * 科目转年级
     * @param gradeList 要转年级的科目信息列表
     * @throws SQLException, MyException
     */
    public void updateSubjectId(List<SubjectBean> gradeList) throws SQLException, MyException {
        for (int i = 0; i < gradeList.size(); i++) {
            String sql = "update Subject " +
                    "set gradeId='" + gradeList.get(i).getGradeId() + "' " +
                    "where subjectCode='" + gradeList.get(i).getSubjectCode() + "';";

            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 更新考勤状态
     * @param attendanceList 要更新的考勤信息列表
     * @throws SQLException, MyException
     */
    public void updateAttendanceType(List<AttendanceBean> attendanceList) throws SQLException, MyException {
        for (int i = 0; i < attendanceList.size(); i++) {
            String sql = "update Attendance " +
                    "set AttendanceType='" + attendanceList.get(i).getType() + "' " +
                    "where id='" + attendanceList.get(i).getId() + "';";

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
}
