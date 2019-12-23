package com.dao;

import com.entity.*;

import java.sql.SQLException;
import java.util.List;

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

        String sql = "insert into Login (code,pwd,stateId) values ('" + info.getCode() + "',password(" + info.getPwd() + "),'2');";
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

        String sql = "insert into Login (code,pwd,stateId) values ('" + info.getCode() + "',password(" + info.getPwd() + "),'3');";
        queryUpdate(sql);

        sql = "insert into Student (" + columnNames.toString() + ") values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 为教师分配班级
     * @param info 要分配的教师信息
     * @throws SQLException, MyException
     */
    public void insertTeacherClass(TeacherBean info) throws SQLException, MyException {
        StringBuffer values = new StringBuffer();
        values.append("'" + info.getId() + "'").append(",");
        values.append("'" + info.getClassId() + "'").append(",");
        values.append("'" + info.getSubId() + "'");

        String sql = "insert into TeacherClass (tId,classId,subId) values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 添加年级信息
     * @param info 年级信息
     * @throws SQLException, MyException
     */
    public void insertGrade(GradeBean info) throws SQLException, MyException {
        StringBuffer values = new StringBuffer();
        values.append("'" + info.getGradeCode() + "'").append(",");
        values.append("'" + info.getGradeName() + "'").append(",");
        values.append("'" + info.getCreateMessage() + "'");

        String sql = "insert into Grade (gradeCode,gradeName,createMessage) values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 添加班级信息
     * @param info 班级信息
     * @throws SQLException, MyException
     */
    public void insertClass(ClassBean info) throws SQLException, MyException {
        StringBuffer values = new StringBuffer();
        values.append("'" + info.getClassCode() + "'").append(",");
        values.append("'" + info.getClassName() + "'").append(",");
        values.append("'" + info.getCreateMessage() + "'").append(",");
        values.append("'" + info.getGradeId() + "'");

        String sql = "insert into Class (classCode,className,createMessage,gradeId) values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 添加科目信息
     * @param info 科目信息
     * @throws SQLException, MyException
     */
    public void insertSubject(SubjectBean info) throws SQLException, MyException {
        StringBuffer values = new StringBuffer();
        values.append("'" + info.getSubjectCode() + "'").append(",");
        values.append("'" + info.getSubjectName() + "'").append(",");
        values.append("'" + info.getCreateMessage() + "'").append(",");
        values.append("'" + info.getGradeId() + "'");

        String sql = "insert into Subject (subjectCode,subjectName,createMessage,gradeId) values (" + values.toString() + ");";
        queryUpdate(sql);

        destroy(null);
    }

    /*
     * 添加学生成绩
     * @param 学生成绩信息列表
     * @throws SQLException, MyException
     */
    public void insertResult(List<ResultBean> resultInfo) throws SQLException, MyException {
        for (ResultBean info : resultInfo) {
            if (info.getsId() == 0 || info.getSubId() == 0)
                continue;

            StringBuffer values = new StringBuffer();
            values.append("'" + info.getsId() + "'").append(",");
            values.append("'" + info.getSubId() + "'").append(",");
            values.append("'" + info.getResult() + "'");

            String sql = "insert into Result (sId,subId,result) values (" + values.toString() + ");";
            queryUpdate(sql);
        }

        destroy(null);
    }
}
