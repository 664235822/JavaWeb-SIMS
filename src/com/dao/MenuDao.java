package com.dao;

import com.entity.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 * 获取主界面菜单类
 */
public class MenuDao extends BaseDao {

    public MenuDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 获取主界面菜单
     * @param character 登录角色
     * @param currentPage 当前页码
     * @return BaseBean 返回菜单信息
     * @throws SQLException
     */
    public BaseBean getMenu(String character, int currentPage) throws SQLException {
        String sql = "select * from Menu where menuId in (select menuid from " + character + ")";
        if (currentPage != 0) {
            sql += "limit " + (currentPage - 1) * 10 + ",10;";
        }

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<MenuParentBean> list = new ArrayList<>();

        while (rs.next()) {
            if (rs.getInt("parent") == 0) {
                MenuParentBean parent = new MenuParentBean();
                parent.setMenuId(rs.getInt("menuId"));
                parent.setMenuName(rs.getString("menuName"));
                parent.setItems(new ArrayList<MenuItemBean>());
                list.add(parent);
            } else {
                MenuItemBean item = new MenuItemBean();
                item.setMenuId(rs.getInt("menuId"));
                item.setMenuName(rs.getString("menuName"));
                item.setUrl(rs.getString("url"));

                for (int i = 0; i < (list).size(); i++) {
                    if (list.get(i).getMenuId() == rs.getInt("parent")) {
                        list.get(i).getItems().add(item);
                        break;
                    }
                }
            }
        }

        table.setList(list);

        sql = "select count(*) as count from Menu where menuId in (select menuid from " + character + ");";
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
        result.setMessage("查看菜单成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取菜单Id
     * @param character 登录角色
     * @return BaseBean 返回菜单Id信息
     * @throws SQLException
     */
    public BaseBean getMenuId(String character) throws SQLException {
        String sql = "select * from " + character + ";";

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();
        List<Integer> list = new ArrayList<>();

        while (rs.next()) {
            list.add(rs.getInt("menuId"));
        }

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        result.setMessage("查看菜单Id成功");
        destroy(rs);

        return result;
    }

    /*
     * 更新菜单权限
     * @param 登录角色
     * @param menuId 菜单编号
     * @param update 更新行为
     * @throws SQLException, MyException
     */
    public void updateMenu(String character, int menuId, boolean update) throws SQLException, MyException {
        if (update) {
            String sql = "insert " + character + " (menuId) values ('" + menuId + "');";
            queryUpdate(sql);
        } else {
            String sql = "delete from " + character + " where menuId='" + menuId + "';";
            queryUpdate(sql);
        }

        destroy(null);
    }
}
