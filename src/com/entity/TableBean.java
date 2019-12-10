package com.entity;

import java.util.List;

/*
 * 表格实体类
 */
public class TableBean {

    //返回数据集合
    private List list;
    //返回数据总页数
    private int pageCount;
    //返回数据总条数
    private int dataCount;

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getDataCount() {
        return dataCount;
    }

    public void setDataCount(int dataCount) {
        this.dataCount = dataCount;
    }
}
