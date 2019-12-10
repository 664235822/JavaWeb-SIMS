package com.dao;

import com.entity.MyException;
import com.entity.StudentBean;
import com.entity.TeacherBean;
import org.apache.poi.ss.usermodel.*;

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
        Workbook workbook = WorkbookFactory.create(in);

        in.close();

        int sheetNum = workbook.getNumberOfSheets();

        for (int i = 0; i < sheetNum; i++) {
            Sheet sheet = workbook.getSheetAt(i);
            int rowNUm = sheet.getLastRowNum();

            Row firstRow = sheet.getRow(0);
            int colNum = firstRow.getLastCellNum();

            StringBuffer columnNames = new StringBuffer();
            String[] info = null;
            switch (tableName) {
                case "Teacher":
                    info = TeacherBean.teacherInfo;
                    break;
                case "Student":
                    info = StudentBean.studentInfo;
                    break;
            }
            for (int j = 0; j < colNum; j++) {
                columnNames.append(info[j]);
                columnNames.append(",");
            }
            columnNames.deleteCharAt(columnNames.length() - 1);

            for (int j = 1; j <= rowNUm; j++) {
                Row currentRow = sheet.getRow(j);
                StringBuffer values = new StringBuffer();
                for (int col = 0; col < colNum; col++) {
                    Cell cell = currentRow.getCell(col);
                    cell.setCellType(CellType.STRING);

                    if (firstRow.getCell(col).getStringCellValue().equals("tCode")) {
                        String code = cell.getStringCellValue();
                        int stateId = 1;
                        switch (tableName) {
                            case "Teacher":
                                stateId = 2;
                                break;
                            case "Student":
                                stateId = 3;
                                break;
                        }
                        String sql = "insert into Login (code,pwd,stateId) values (" + code + "," + code + "," + stateId + ");";
                        queryUpdate(sql);
                    }

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

        InputStream in = new FileInputStream(filePath);
        Workbook workbook = WorkbookFactory.create(in);

        in.close();

        ResultSetMetaData metaData = rs.getMetaData();
        int colNum = metaData.getColumnCount();

        int sheetNum = workbook.getNumberOfSheets();

        for (int i = 0; i < sheetNum; i++) {
            Sheet sheet = workbook.getSheetAt(i);
            int rowNum = 0;
            while (rs.next()) {
                rowNum++;
                Row currentRow = sheet.createRow(rowNum);
                for (int j = 0; j < colNum; j++) {
                    currentRow.createCell(j, CellType.STRING).setCellValue(rs.getObject(j).toString());
                }
            }
        }

        File file = new File(filePath);
        OutputStream out = new FileOutputStream(file);
        workbook.write(out);

        out.close();
        destroy(rs);
    }
}
