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
    public BaseBean selectTable(String tableName, String code, String name, String gradeId, String classId, String subjectId, int currentPage) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        selectDao = new SelectDao();

        BaseBean result = new BaseBean();
        switch (tableName) {
            case "Teacher":
                result = selectDao.selectTeacher(code, name, currentPage);
                break;
            case "Student":
                result = selectDao.selectStudent(code, name, currentPage);
                break;
            case "Result":
                result = selectDao.selectResult(code, name, Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), currentPage);
                break;
            case "AddResult":
                result = selectDao.selectAddResult(Integer.parseInt(gradeId), Integer.parseInt(classId), Integer.parseInt(subjectId), currentPage);
                break;
            case "Grade":
                result = selectDao.selectGrade(gradeId, currentPage);
                break;
            case "Class":
                result = selectDao.selectClass(currentPage);
                break;
            case "Subject":
                result = selectDao.selectSubject(currentPage);
                break;
        }

        return result;
    }

    /*
     * 获取年级、班级、科目信息
     * @return BaseBean 返回年级、班级、科目信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean selectGradeAll() throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        selectDao = new SelectDao();

        return selectDao.selectGradeAll();
    }
}
