package com.service;

import com.alibaba.fastjson.JSON;
import com.dao.UpdateDao;
import com.entity.*;

import java.sql.SQLException;
import java.util.List;

/*
 * 更新信息服务类
 */
public class UpdateService {

    UpdateDao updateDao;

    /*
     * 更新信息
     * @param tableName 数据库表名
     * @param info 要更新的信息Json字符串
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void update(String tableName, String info) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        updateDao = new UpdateDao();

        switch (tableName) {
            case "Teacher":
                TeacherBean teacherInfo = JSON.parseObject(info, TeacherBean.class);
                updateDao.updateTeacher(teacherInfo);
                break;
            case "Student":
                StudentBean studentInfo = JSON.parseObject(info, StudentBean.class);
                updateDao.updateStudent(studentInfo);
            case "ClassId":
                List<StudentBean> ClassList = JSON.parseArray(info, StudentBean.class);
                updateDao.updateClassId(ClassList);
                break;
            case "GradeId":
                List<ClassBean> gradeList = JSON.parseArray(info, ClassBean.class);
                updateDao.updateGradeId(gradeList);
                break;
            case "SubjectId":
                List<SubjectBean> subjectList = JSON.parseArray(info, SubjectBean.class);
                updateDao.updateSubjectId(subjectList);
                break;
            case "AttendanceType":
                List<AttendanceBean> attendanceList = JSON.parseArray(info, AttendanceBean.class);
                updateDao.updateAttendanceType(attendanceList);
                break;
            case "Class":
                ClassBean classInfo = JSON.parseObject(info, ClassBean.class);
                updateDao.updateClass(classInfo);
                break;
            case "Subject":
                SubjectBean subjectInfo = JSON.parseObject(info, SubjectBean.class);
                updateDao.updateSubject(subjectInfo);
                break;
        }
    }
}
