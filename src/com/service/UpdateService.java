package com.service;

import com.alibaba.fastjson.JSON;
import com.dao.UpdateDao;
import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;

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
                TeacherBean teacherInfo=JSON.parseObject(info,TeacherBean.class);
                updateDao.updateTeacher(teacherInfo);
                break;
            case "Student":
                StudentBean studentInfo=JSON.parseObject(info,StudentBean.class);
                updateDao.updateStudent(studentInfo);
            case "StudentClass":
                List<StudentBean> classInfo = JSON.parseArray(info, StudentBean.class);
                updateDao.updateClassId(classInfo);
                break;
        }
    }
}
