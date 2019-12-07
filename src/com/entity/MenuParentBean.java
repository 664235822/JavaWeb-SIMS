package com.entity;

import java.util.List;

/*
 * 父级菜单实体类
 */
public class MenuParentBean {

    //菜单序号
    private int menuId;
    //菜单名
    private String menuName;
    //子菜单列表
    private List<MenuItemBean> items;

    public String getMenuName() {
        return menuName;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public List<MenuItemBean> getItems() {
        return items;
    }

    public void setItems(List<MenuItemBean> items) {
        this.items = items;
    }
}
