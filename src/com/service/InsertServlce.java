package com.service;

import com.dao.InsertDao;
import com.entity.BaseBean;
import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;

import java.sql.SQLException;

/*
 * 添加信息服务类
 */
public class InsertServlce {

    InsertDao insertDao;

    /*
     * 添加信息
     * @param tableName 数据库表名
     * @param info 要添加的信息实体
     * @param pwd 要添加的用户密码
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void Insert(String tableName, Object info, String pwd) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        insertDao = new InsertDao();

        switch (tableName) {
            case "Teacher":
                insertDao.insertTeacher((TeacherBean) info, pwd);
                break;
            case "Student":
                insertDao.insertStudent((StudentBean) info, pwd);
                break;
        }
    }
}
