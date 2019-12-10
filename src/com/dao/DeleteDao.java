package com.dao;

import com.entity.MyException;

import java.sql.SQLException;
import java.util.List;

/*
 * 删除信息类
 */
public class DeleteDao extends BaseDao {

    public DeleteDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 删除信息
     * @param 数据库表名
     * @param 要删除行的id字段列表
     * @throws SQLException, MyException
     */
    public void delete(String tableName, List<Integer> idList) throws SQLException, MyException {
        for (int i = 0; i < idList.size(); i++) {
            String sql = "delete from " + tableName + " where id='" + idList.get(i) + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }
}
