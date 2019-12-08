package com.dao;

import com.entity.MyException;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;

import java.io.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

/*
 * Excel操作类
 */
public class ExcelDao extends BaseDao {

    public ExcelDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 导入Excel文件到数据库
     * @param filePath Excel文件路径
     * @param tableName 数据库表名
     * @throws MyException, IOException, SQLException
     */
    public void importFromExcelToMysql(String filePath, String tableName) throws MyException, IOException, SQLException {
        if (!(filePath.endsWith(".xls") || filePath.endsWith((".xlsx")))) {
            throw new MyException("文件格式错误");
        }

        InputStream in = new FileInputStream(filePath);
        HSSFWorkbook workbook = new HSSFWorkbook(in);

        int sheetNum = workbook.getNumberOfSheets();

        for (int i = 0; i < sheetNum; i++) {
            HSSFSheet sheet = workbook.getSheetAt(i);
            int rowNUm = sheet.getLastRowNum();

            HSSFRow firstRow = sheet.getRow(0);
            int colNum = firstRow.getLastCellNum();

            StringBuffer columnNames = new StringBuffer();
            for (int j = 0; j < colNum; j++) {
                columnNames.append(firstRow.getCell(j).getStringCellValue());
                columnNames.append(",");
            }
            columnNames.deleteCharAt(columnNames.length() - 1);

            for (int j = 1; j <= rowNUm; j++) {
                HSSFRow currentRow = sheet.getRow(j);
                StringBuffer values = new StringBuffer();
                for (int col = 0; col < colNum; col++) {
                    HSSFCell cell = currentRow.getCell(col);
                    cell.setCellType(CellType.STRING);
                    values.append("'" + cell.getStringCellValue() + "'");
                    values.append(",");
                }
                values.deleteCharAt(values.length() - 1);

                String sql = "insert into " + tableName + " (" + columnNames.toString() + ") values (" + values.toString() + ");";
                queryUpdate(sql);
            }
        }

        destroy(null);
    }

    /*
     * 将数据库表导出到Excel文件
     * @param filePath Excel文件路径
     * @param tableName 数据库表名
     * @throws SQLException, IOException
     */
    public void exportFromMysqlToExcel(String filePath, String tableName) throws SQLException, IOException {
        String sql = "select * from " + tableName;
        ResultSet rs = querySelect(sql);

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(tableName);

        ResultSetMetaData metadata = rs.getMetaData();
        HSSFRow firstRow = sheet.createRow(0);
        int colNum = metadata.getColumnCount();
        for (int i = 0; i < colNum; i++) {
            firstRow.createCell(i, CellType.STRING).setCellValue(metadata.getColumnName(i));
        }

        int rowNum = 0;
        while (rs.next()) {
            rowNum++;
            HSSFRow currentRow = sheet.createRow(rowNum);
            for (int i = 0; i < colNum; i++) {
                currentRow.createCell(i, CellType.STRING).setCellValue(rs.getObject(i).toString());
            }
        }

        File file = new File(filePath);
        FileOutputStream stream = new FileOutputStream(file);
        workbook.write(stream);

        destroy(rs);
    }
}