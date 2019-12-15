package com.entity;

/*
 * 菜单表格实体类
 */
public class MenuBean {

    //菜单Id
    private int menuId;
    //菜单名
    private String menuName;
    //父级菜单Id
    private int parent;
    //菜单地址
    private String url;

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public int getParent() {
        return parent;
    }

    public void setParent(int parent) {
        this.parent = parent;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
