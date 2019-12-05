package com.entity;

public class BaseBean {

    public static final int SUCCESS = 1;
    public static final int FAILED = 0;

    private int code;

    private Object data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
