package com.service;

import com.dao.ExcelDao;
import com.entity.MyException;

import java.io.IOException;
import java.sql.SQLException;

/*
 * Excel操作服务类
 */
public class ExcelService {

    ExcelDao excelDao;

    /*
     * 导入Excel文件到数据库
     * @param filePath Excel文件路径
     * @param tableName 数据库表名
     * @throws MyException, IOException, SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException
     */
    public void importFromExcelToMysql(String filePath, String tableName) throws MyException, IOException, SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException {
        excelDao = new ExcelDao();

        excelDao.importFromExcelToMysql(filePath, tableName);
    }

    /*
     * 将数据库表导出到Excel文件
     * @param filePath Excel文件路径
     * @param tableName 数据库表名
     * @throws SQLException, IOException, IllegalAccessException, InstantiationException, ClassNotFoundException
     */
    public void exportFromMysqlToExcel(String filePath, String tableName) throws SQLException, IOException, IllegalAccessException, InstantiationException, ClassNotFoundException {
        excelDao = new ExcelDao();

        excelDao.exportFromMysqlToExcel(filePath, tableName);
    }
}
