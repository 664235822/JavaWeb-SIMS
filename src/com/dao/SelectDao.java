package com.dao;

import com.entity.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 * 查看表格类
 */
public class SelectDao extends BaseDao {

    public SelectDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 查询教师信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @param currentPage 当前页号
     * @return BaseBean 返回教师信息
     * @throws SQLException
     */
    public BaseBean selectTeacher(String code, String name, int currentPage) throws SQLException {
        String sql = "select * from Teacher where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and name like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<TeacherBean> list = new ArrayList<>();

        while (rs.next()) {
            TeacherBean teacher = new TeacherBean();

            teacher.setId(rs.getInt("id"));
            teacher.setCode(rs.getString("code"));
            teacher.setName(rs.getString("name"));
            teacher.setSex(rs.getString("sex"));
            teacher.setAge(rs.getInt("age"));
            teacher.setEducation(rs.getString("education"));
            teacher.setGoodAt(rs.getString("goodAt"));
            teacher.setPhone(rs.getString("phone"));
            teacher.setQQ(rs.getString("QQ"));
            teacher.setEmail(rs.getString("email"));
            teacher.setAddress(rs.getString("address"));
            teacher.setIntroduction(rs.getString("introduction"));

            list.add(teacher);
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setPwd(selectPwd(list.get(i).getCode()));
        }

        table.setList(list);

        selectCount("Teacher", code, name, table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看教师信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 单独查看学生信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @param currentPage 当前页号
     * @return BaseBean 返回学生信息
     * @throws SQLException
     */
    public BaseBean selectStudentOnly(String code, String name, int currentPage) throws SQLException {
        String sql = "select * from Student where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and name like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<StudentBean> list = new ArrayList<>();

        while (rs.next()) {
            StudentBean student = new StudentBean();

            student.setId(rs.getInt("id"));
            student.setCode(rs.getString("code"));
            student.setName(rs.getString("name"));
            student.setAge(rs.getInt("age"));
            student.setSex(rs.getString("sex"));
            student.setQQ(rs.getString("QQ"));
            student.setPhone(rs.getString("phone"));
            student.setAddress(rs.getString("address"));
            student.setClassId(rs.getInt("classId"));

            list.add(student);
        }

        table.setList(list);

        selectCount("Student", code, name, table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("单独查看学生信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看学生信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @param currentPage 当前页号
     * @return BaseBean 返回学生信息
     * @throws SQLException
     */
    public BaseBean selectStudent(String code, String name, int currentPage) throws SQLException {
        String sql = "select st.id,st.code,st.name,st.age,st.sex,st.QQ,st.phone,st.address,st.classId,cl.className,gr.gradeName,tea.name tName from Class cl " +
                "inner join Student st on st.classId=cl.id " +
                "inner join TeacherClass tc on tc.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Teacher tea on tc.tId=tea.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<StudentBean> list = new ArrayList<>();

        while (rs.next()) {
            StudentBean student = new StudentBean();

            student.setId(rs.getInt("id"));
            student.setCode(rs.getString("code"));
            student.setName(rs.getString("name"));
            student.setAge(rs.getInt("age"));
            student.setSex(rs.getString("sex"));
            student.setQQ(rs.getString("QQ"));
            student.setPhone(rs.getString("phone"));
            student.setAddress(rs.getString("address"));
            student.setClassId(rs.getInt("classId"));
            student.setClassName(rs.getString("className"));
            student.setGradeName(rs.getString("gradeName"));
            student.setTeacherName(rs.getString("tName"));

            list.add(student);
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setPwd(selectPwd(list.get(i).getCode()));
        }

        table.setList(list);

        selectCount("Student", code, name, table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看学生信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取年级信息
     * @param 年级Id
     * @param currentPage 当前页号
     * @return BaseBean 返回年级信息
     * @throws SQLException
     */
    public BaseBean selectGrade(String gradeId, int currentPage) throws SQLException {
        String sql = "select * from Grade where 1=1 ";
        if (!gradeId.isEmpty()) {
            sql += "and id='" + gradeId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<GradeBean> list = new ArrayList<>();

        while (rs.next()) {
            GradeBean grade = new GradeBean();
            grade.setId(rs.getInt("id"));
            grade.setGradeCode(rs.getString("gradeCode"));
            grade.setGradeName(rs.getString("gradeName"));
            grade.setCreateMessage(rs.getString("createMessage"));
            grade.setCreateTime(rs.getDate("createTime").toString());
            list.add(grade);
        }

        table.setList(list);

        selectCount("Grade", "", "", table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看年级信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取班级信息
     * @param code 查询班级编号
     * @param name 查询班级名
     * @param currentPage 当前页号
     * @return BaseBean 返回班级信息
     * @throws SQLException
     */
    public BaseBean selectClass(String code, String name, int currentPage) throws SQLException {
        String sql = "select * from Class where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and classCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and className like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<ClassBean> list = new ArrayList<>();

        while (rs.next()) {
            ClassBean _class = new ClassBean();
            _class.setId(rs.getInt("id"));
            _class.setClassCode(rs.getString("classCode"));
            _class.setClassName(rs.getString("className"));
            _class.setCreateMessage(rs.getString("createMessage"));
            _class.setCreateTime(rs.getDate("createTime").toString());
            _class.setGradeId(rs.getInt("gradeId"));
            list.add(_class);
        }

        table.setList(list);

        selectCount("Class", "", "", table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看班级信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取科目信息
     * @param code 查询科目编号
     * @param name 查询科目名
     * @param currentPage 当前页号
     * @return BaseBean 返回班级信息
     * @throws SQLException
     */
    public BaseBean selectSubject(String code, String name, int currentPage) throws SQLException {
        String sql = "select * from Subject where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and subjectCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and subjectName like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<SubjectBean> list = new ArrayList<>();

        while (rs.next()) {
            SubjectBean subject = new SubjectBean();
            subject.setId(rs.getInt("id"));
            subject.setSubjectCode(rs.getString("subjectCode"));
            subject.setSubjectName(rs.getString("subjectName"));
            subject.setCreateMessage(rs.getString("createMessage"));
            subject.setCreateTime(rs.getDate("createTime").toString());
            subject.setGradeId(rs.getInt("gradeId"));
            list.add(subject);
        }

        table.setList(list);

        selectCount("Subject", "", "", table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看科目信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取年级班级科目信息
     * @return BaseBean 返回年级班级科目信息
     * @throws SQLException
     */
    public BaseBean selectGradeAll() throws SQLException {
        BaseBean result = new BaseBean();
        List<GradeBean> list = new ArrayList<>();

        String sql = "select * from Grade;";
        ResultSet rs = querySelect(sql);

        int gradeId = 0;
        while (rs.next()) {
            if (rs.getInt("id") != gradeId) {
                gradeId = rs.getInt("id");

                GradeBean grade = new GradeBean();
                grade.setId(rs.getInt("id"));
                grade.setGradeCode(rs.getString("gradeCode"));
                grade.setGradeName(rs.getString("gradeName"));
                grade.setClasses(new ArrayList<>());
                grade.setSubjects(new ArrayList<>());

                list.add(grade);
            }
        }

        sql = "select * from Class;";
        rs = querySelect(sql);

        gradeId = 0;
        while (rs.next()) {
            if (rs.getInt("gradeId") != gradeId) {
                gradeId = rs.getInt("gradeId");
            }

            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getId() == gradeId) {
                    ClassBean _class = new ClassBean();
                    _class.setId(rs.getInt("id"));
                    _class.setClassCode(rs.getString("classCode"));
                    _class.setClassName(rs.getString("className"));

                    list.get(i).getClasses().add(_class);
                }
            }
        }

        sql = "select * from Subject;";
        rs = querySelect(sql);

        gradeId = 0;
        while (rs.next()) {
            if (rs.getInt("gradeId") != gradeId) {
                gradeId = rs.getInt("gradeId");
            }

            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getId() == gradeId) {

                    SubjectBean subject = new SubjectBean();
                    subject.setId(rs.getInt("id"));
                    subject.setSubjectCode(rs.getString("subjectCode"));
                    subject.setSubjectName(rs.getString("subjectName"));

                    list.get(i).getSubjects().add(subject);
                }
            }
        }

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        result.setMessage("获取年级班级科目信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取教师科目信息
     * @param code 查询科目编号
     * @param name 查询科目名
     * @param currentPage 当前页号
     * @return BaseBean 返回教师科目信息
     * @throws SQLException
     */
    public BaseBean selectTeacherClass(String code, String name, int currentPage) throws SQLException {
        String sql = "select su.subjectCode,su.subjectName,gr.gradeName,cl.className,te.name from TeacherClass tec " +
                "inner join Subject su on tec.subId=su.id " +
                "inner join Teacher te on tec.tId=te.id " +
                "inner join Class cl on tec.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and subjectCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and subjectName like '%" + name + "%' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<TeacherClassBean> list = new ArrayList<>();

        while (rs.next()) {
            TeacherClassBean teacherClass = new TeacherClassBean();
            teacherClass.setSubjectCode(rs.getString("subjectCode"));
            teacherClass.setSubjectName(rs.getString("subjectName"));
            teacherClass.setGradeName(rs.getString("gradeName"));
            teacherClass.setClassName(rs.getString("className"));
            teacherClass.setTeacherName(rs.getString("name"));
            list.add(teacherClass);
        }

        table.setList(list);

        sql = "select count(*) as count from TeacherClass tec " +
                "inner join Subject su on tec.subId=su.id " +
                "inner join Teacher te on tec.tId=te.id " +
                "inner join Class cl on tec.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and subjectCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and subjectName like '%" + name + "%' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看教师科目信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看科任老师信息
     * @param gradeId 年级编号
     * @param classId 班级编号
     * @param subjectId 科目编号
     * @param currentPage 当前页号
     * @return BaseBean 返回科任老师信息
     * @throws SQLException
     */
    public BaseBean selectSubjectTeacher(int gradeId, int classId, int subjectId, int currentPage) throws SQLException {
        String sql = "SELECT te.code,te.name,te.sex,su.subjectName,te.education,te.age FROM TeacherClass tec " +
                "left join Subject su on tec.subId=su.id " +
                "inner join Teacher te on tec.tId=te.id " +
                "inner join Class cl on tec.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "where 1=1 ";
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<TeacherClassBean> list = new ArrayList<>();

        while (rs.next()) {
            TeacherClassBean teacherClass = new TeacherClassBean();
            teacherClass.setTeacherCode(rs.getString("code"));
            teacherClass.setTeacherName(rs.getString("name"));
            teacherClass.setSex(rs.getString("sex"));
            teacherClass.setSubjectName(rs.getString("subjectName"));
            teacherClass.setEducation(rs.getString("education"));
            teacherClass.setAge(rs.getInt("age"));
            list.add(teacherClass);
        }

        table.setList(list);

        sql = "select count(*) as count from TeacherClass tec " +
                "left join Subject su on tec.subId=su.id " +
                "inner join Teacher te on tec.tId=te.id " +
                "inner join Class cl on tec.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "where 1=1 ";
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看科任老师信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看学生成绩表
     * @param code 查询账号
     * @param name 查询用户名
     * @param gradeId 年级编号
     * @param classId 班级编号
     * @param subjectId 科目编号
     * @param currentPage 当前页号
     * @return BaseBean 返回学生成绩信息
     * @throws SQLException
     */
    public BaseBean selectResult(String code, String name, int gradeId, int classId, int subjectId, int currentPage) throws SQLException {
        String sql = "select re.id,re.subId,re.sId,re.time,re.result,gr.gradeName,cl.className,st.code,st.name,su.subjectName from Result re " +
                "inner join Student st on re.sid=st.id " +
                "inner join Class cl on st.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Subject su on re.subId=su.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<ResultBean> list = new ArrayList<>();

        while (rs.next()) {
            ResultBean _result = new ResultBean();
            _result.setId(rs.getInt("id"));
            _result.setSubId(rs.getInt("subId"));
            _result.setsId(rs.getInt("sId"));
            _result.setTime(rs.getDate("time").toString());
            _result.setResult(rs.getDouble("result"));
            _result.setGradeName(rs.getString("gradeName"));
            _result.setClassName(rs.getString("className"));
            _result.setCode(rs.getString("code"));
            _result.setName(rs.getString("name"));
            _result.setSubjectName(rs.getString("subjectName"));

            list.add(_result);
        }

        table.setList(list);

        sql = "select count(*) as count from Result re " +
                "inner join Student st on re.sid=st.id " +
                "inner join Class cl on st.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Subject su on re.subId=su.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看学生成绩成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看添加学生成绩信息
     * @param gradeId 年级编号
     * @param classId 班级编号
     * @param subjectId 科目编号
     * @param currentPage 当前页号
     * @return BaseBean 返回添加学生成绩信息
     * @throws SQLException
     */
    public BaseBean selectAddResult(int gradeId, int classId, int subjectId, int currentPage) throws SQLException {
        String sql = "select st.id,su.id subjectId,gr.gradeName,cl.className,st.code,st.name,su.subjectName from Student st " +
                "inner join Class cl on st.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Subject su on su.gradeId=gr.id " +
                "where 1=1 ";
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<ResultBean> list = new ArrayList<>();

        while (rs.next()) {
            ResultBean _result = new ResultBean();
            _result.setsId(rs.getInt("id"));
            _result.setSubId(rs.getInt("subjectId"));
            _result.setGradeName(rs.getString("gradeName"));
            _result.setClassName(rs.getString("className"));
            _result.setCode(rs.getString("code"));
            _result.setName(rs.getString("name"));
            _result.setSubjectName(rs.getString("subjectName"));

            list.add(_result);
        }

        table.setList(list);

        sql = "select count(*) as count from Student st " +
                "inner join Class cl on st.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Subject su on su.gradeId=gr.id " +
                "where 1=1 ";
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看添加学生成绩信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看考勤信息
     * @param code 查询学生编号
     * @param name 查询学生姓名
     * @param gradeId 年级编号
     * @param classId 班级编号
     * @param subjectId 科目编号
     * @param currentPage 当前页号
     * @return BaseBean 返回考勤信息
     * @throws SQLException
     */
    public BaseBean selectAttendance(String code, String name, int gradeId, int classId, int subjectId, int currentPage) throws SQLException {
        String sql = "select st.code,st.name,gr.gradeName,cl.className,su.subjectName,att.AttendanceType,at.AttendanceTime from Attendance at " +
                "inner join Student st on at.sId=st.id " +
                "inner join Subject su on at.subId=su.id " +
                "inner join Class cl on at.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join AttendanceType att on at.AttendanceType=att.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10 ";
        }
        sql += ";";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<AttendanceBean> list = new ArrayList<>();

        while (rs.next()) {
            AttendanceBean attendance = new AttendanceBean();
            attendance.setCode(rs.getString("code"));
            attendance.setName(rs.getString("name"));
            attendance.setGradeName(rs.getString("gradeName"));
            attendance.setClassName(rs.getString("className"));
            attendance.setSubjectName(rs.getString("subjectName"));
            attendance.setType(rs.getString("AttendanceType"));
            attendance.setName(rs.getDate("AttendanceTime").toString());

            list.add(attendance);
        }

        table.setList(list);

        sql = "select count(*) as count from Attendance at " +
                "inner join Student st on at.sId=st.id " +
                "inner join Subject su on at.subId=su.id " +
                "inner join Class cl on at.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join AttendanceType att on at.AttendanceType=att.id " +
                "where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        if (gradeId != 0) {
            sql += "and gr.id='" + gradeId + "' ";
        }
        if (classId != 0) {
            sql += "and cl.id='" + classId + "' ";
        }
        if (subjectId != 0) {
            sql += "and su.id='" + subjectId + "' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看考勤信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取表格行数和页数
     * @param 数据库表名
     * @param 查询账号
     * @param 查询用户名
     * @param 返回表格实体类
     * @throws SQLException
     */
    void selectCount(String tableName, String code, String name, TableBean obj) throws SQLException {
        String sql = "select count(*) as count from " + tableName + " where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and name like '%" + name + "%' ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        obj.setDataCount(dataCount);
        obj.setPageCount(pageCount);

        rs.close();
    }

    /*
     * 获取密码
     * @param 查询账号
     * @return String 密码
     * @throws SQLException
     */
    String selectPwd(String code) throws SQLException {
        String sql = "select * from Login where code='" + code + "';";
        String pwd = null;
        ResultSet rs = querySelect(sql);
        if (rs.next()) {
            pwd = rs.getString("pwd");
        }

        rs.close();
        return pwd;
    }
}
