package com.service;

import com.alibaba.fastjson.JSON;
import com.dao.InsertDao;
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
        }
    }
}
