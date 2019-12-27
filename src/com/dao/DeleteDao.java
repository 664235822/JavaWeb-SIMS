package com.dao;

import com.entity.MyException;

import java.sql.ResultSet;
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
     * 删除教师信息
     * @param 要删除行的账号字段列表
     * @throws SQLException, MyException
     */
    public void deleteTeacher(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "select id from Teacher where code='" + codeList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            int id = 0;
            if (rs.next()) {
                id = rs.getInt("id");
            }

            sql = "select * from TeacherClass where tId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from TeacherClass where tId='" + id + "';";
                queryUpdate(sql);
            }
            rs.close();

            sql = "delete from Teacher where code='" + codeList.get(i) + "';";
            queryUpdate(sql);

            sql = "delete from Login where code='" + codeList.get(i) + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 删除学生信息
     * @param 要删除行的账号字段列表
     * @throws SQLException, MyException
     */
    public void deleteStudent(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "select id from Student where code='" + codeList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            int id = 0;
            if (rs.next()) {
                id = rs.getInt("id");
            }

            sql = "select * from Result where sId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from Result where sId='" + id + "';";
                queryUpdate(sql);
            }
            rs.close();

            sql = "delete from Student where code='" + codeList.get(i) + "';";
            queryUpdate(sql);

            sql = "delete from Login where code='" + codeList.get(i) + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 删除班级信息
     * @param 要删除行的班级编号字段列表
     * @throws SQLException, MyException
     */
    public void deleteClass(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "select id from Class where classCode='" + codeList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            int id = 0;
            if (rs.next()) {
                id = rs.getInt("id");
            }

            sql = "select * from TeacherClass where classId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from TeacherClass where classId='" + id + "';";
                queryUpdate(sql);
            }
            rs.close();

            sql = "delete from Class where classCode='" + codeList.get(i) + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }

    /*
     * 删除科目信息
     * @param 要删除行的班级编号字段列表
     * @throws SQLException, MyException
     */
    public void deleteSubject(List<Integer> codeList) throws SQLException, MyException {
        for (int i = 0; i < codeList.size(); i++) {
            String sql = "select id from Subject where subjectCode='" + codeList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            int id = 0;
            if (rs.next()) {
                id = rs.getInt("id");
            }

            sql = "select * from TeacherClass where subId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "update TeacherClass set subId=null where subId='" + id + "';";
                queryUpdate(sql);
            }

            sql = "select * from Result where subId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from Result where subId='" + id + "';";
                queryUpdate(sql);
            }

            sql = "select * from Attendance where subId='" + id + "';";
            rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from Attendance where subId='" + id + "';";
                queryUpdate(sql);
            }

            sql = "delete from Subject where subjectCode='" + codeList.get(i) + "';";
            queryUpdate(sql);

            rs.close();
        }

        destroy(null);
    }

    /*
     * 删除教师班级科目联系
     * @param 要删除行的id字段列表
     * @throws SQLException, MyException
     */
    public void delectTeacherClass(List<Integer> idList) throws SQLException, MyException {
        for (int i = 0; i < idList.size(); i++) {
            String sql = "select * from TeacherClass where id='" + idList.get(i) + "';";
            ResultSet rs = querySelect(sql);
            if (rs.next()) {
                sql = "delete from TeacherClass where id='" + idList.get(i) + "';";
                queryUpdate(sql);
            }

            rs.close();
        }

        destroy(null);
    }
}
