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
     * @result 返回表格信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean selectTable(String tableName) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        selectDao = new SelectDao();

        BaseBean result = new BaseBean();
        switch (tableName) {
            case "Teacher":
                result = selectDao.selectTeacher();
                break;
            case "Student":
                result = selectDao.selectStudent();
                break;
        }

        return result;
    }
}
