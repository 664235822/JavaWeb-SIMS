package com.entity;

import java.util.List;

/*
 * 年级信息实体类
 */
public class GradeBean {

    //年级id
    private int id;
    //年级编号
    private String gradeCode;
    //年级名
    private String gradeName;
    //创建人
    private String createMessage;
    //创建时间
    private String createTime;
    //班级列表
    private List<ClassBean> classes;
    //科目列表
    private List<SubjectBean> subjects;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGradeCode() {
        return gradeCode;
    }

    public void setGradeCode(String gradeCode) {
        this.gradeCode = gradeCode;
    }

    public String getGradeName() {
        return gradeName;
    }

    public String getCreateMessage() {
        return createMessage;
    }

    public void setCreateMessage(String createMessage) {
        this.createMessage = createMessage;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public List<ClassBean> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassBean> classes) {
        this.classes = classes;
    }

    public List<SubjectBean> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectBean> subjects) {
        this.subjects = subjects;
    }
}
