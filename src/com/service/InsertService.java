package com.service;

import com.alibaba.fastjson.JSON;
import com.dao.InsertDao;
import com.entity.*;

import java.sql.SQLException;
import java.util.List;

/*
 * 添加信息服务类
 */
public class InsertService {

    InsertDao insertDao;

    /*
     * 添加信息
     * @param tableName 数据库表名
     * @param info 要添加的信息JSON字符串
     * @param pwd 要添加的用户密码
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void Insert(String tableName, String info) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        insertDao = new InsertDao();

        switch (tableName) {
            case "Teacher":
                TeacherBean teacher = JSON.parseObject(info, TeacherBean.class);
                insertDao.insertTeacher(teacher);
                break;
            case "Student":
                StudentBean student = JSON.parseObject(info, StudentBean.class);
                insertDao.insertStudent(student);
                break;
            case "TeacherClass":
                TeacherClassBean teacherClass = JSON.parseObject(info, TeacherClassBean.class);
                insertDao.insertTeacherClass(teacherClass);
                break;
            case "ClassTeacher":
                TeacherClassBean classTeacher = JSON.parseObject(info, TeacherClassBean.class);
                insertDao.insertClassTeacher(classTeacher);
                break;
            case "Result":
                List<ResultBean> resultInfo = JSON.parseArray(info, ResultBean.class);
                insertDao.insertResult(resultInfo);
                break;
            case "Grade":
                GradeBean grade = JSON.parseObject(info, GradeBean.class);
                insertDao.insertGrade(grade);
                break;
            case "Class":
                ClassBean _class = JSON.parseObject(info, ClassBean.class);
                insertDao.insertClass(_class);
                break;
            case "Subject":
                SubjectBean subject = JSON.parseObject(info, SubjectBean.class);
                insertDao.insertSubject(subject);
                break;
            case "Attendance":
                List<AttendanceBean> attendanceInfo = JSON.parseArray(info, AttendanceBean.class);
                insertDao.insertAttendance(attendanceInfo);
                break;
            case "Habit":
                HabitBean habit = JSON.parseObject(info, HabitBean.class);
                insertDao.insertHabit(habit);
                break;
        }
    }
}
