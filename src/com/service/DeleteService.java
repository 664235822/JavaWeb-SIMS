package com.service;

import com.dao.DeleteDao;
import com.entity.MyException;

import java.sql.SQLException;
import java.util.List;

/*
 * 删除信息服务类
 */
public class DeleteService {

    DeleteDao deleteDao;

    /*
     * 删除信息
     * @param 数据库表名
     * @param 要删除行的账号字段列表
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void delete(String tableName, List<Integer> codeList) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        deleteDao = new DeleteDao();

        switch (tableName) {
            case "Teacher":
                deleteDao.deleteTeacher(codeList);
                break;
            case "Student":
                deleteDao.deleteStudent(codeList);
                break;
        }

    }
}
