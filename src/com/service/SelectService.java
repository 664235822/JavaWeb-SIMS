package com.service;

import com.dao.SelectDao;
import com.entity.BaseBean;

import java.sql.SQLException;

/*
 * 查看表格服务类
 */
public class SelectService {

    SelectDao selectDao;

    /*
     * 获取表格信息
     * @param 表名
     * @param code 查询账号
     * @param name 查询用户名
     * @param classId 班级编号
     * @param subjectId 科目编号
     * @param currentPage 当前页号
     * @result 返回表格信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean select(String tableName, String code, String name, String gradeId, String classId, String subjectId, String currentPage) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        selectDao = new SelectDao();

        BaseBean result = new BaseBean();
        switch (tableName) {
            case "Teacher":
                result = selectDao.selectTeacher(code, name, Integer.parseInt(currentPage));
                break;
            case "Student":
                result = selectDao.selectStudent(code, name, Integer.parseInt(currentPage));
                break;
            case "StudentOnly":
                result = selectDao.selectStudentOnly(code, name, Integer.parseInt(currentPage));
                break;
            case "Grade":
                result = selectDao.selectGrade(gradeId, Integer.parseInt(currentPage));
                break;
            case "Class":
                result = selectDao.selectClass(code, name, Integer.parseInt(currentPage));
                break;
            case "Subject":
                result = selectDao.selectSubject(code, name, Integer.parseInt(currentPage));
                break;
            case "GradeAll":
                result = selectDao.selectGradeAll();
                break;
            case "TeacherClass":
                result = selectDao.selectTeacherClass(Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), Integer.parseInt(currentPage));
                break;
            case "Result":
                result = selectDao.selectResult(code, name, Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), Integer.parseInt(currentPage));
                break;
            case "AddResult":
                result = selectDao.selectAddResult(Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), Integer.parseInt(currentPage));
                break;
            case "Attendance":
                result = selectDao.selectAttendance(code, name, Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), Integer.parseInt(currentPage));
                break;
            case "Habit":
                result = selectDao.selectHabit(code);
                break;
        }

        return result;
    }
}
