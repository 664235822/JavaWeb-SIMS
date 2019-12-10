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
     * @param currentPage 当前页号
     * @result 返回表格信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean selectTable(String tableName, String code, String name, int currentPage) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        selectDao = new SelectDao();

        BaseBean result = new BaseBean();
        switch (tableName) {
            case "Teacher":
                result = selectDao.selectTeacher(code, name, currentPage);
                break;
            case "Student":
                result = selectDao.selectStudent(code, name, currentPage);
                break;
        }

        return result;
    }
}
