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
    //班级列表
    private List<ClassBean> classes;

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

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public List<ClassBean> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassBean> classes) {
        this.classes = classes;
    }
}
