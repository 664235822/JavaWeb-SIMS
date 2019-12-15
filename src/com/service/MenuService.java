package com.service;

import com.dao.MenuDao;
import com.entity.BaseBean;
import com.entity.MyException;

import java.sql.SQLException;


/*
 * 获取主界面菜单服务类
 */
public class MenuService {

    MenuDao menuDao;

    /*
     * 获取主界面菜单
     * @param character 登录角色
     * @param currentPage 当前页号
     * @param getId 是否只返回页码id
     * @return BaseBean 返货菜单信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean getMenu(String character, int currentPage, boolean getId) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        menuDao = new MenuDao();

        BaseBean result = null;
        if (!getId) {
            if (currentPage == 0) {
                result = menuDao.getMenu(character);
            } else {
                result = menuDao.getMenuTable(currentPage);
            }
        } else {
            result = menuDao.getMenuId(character);
        }
        return result;
    }

    /*
     * 更新菜单权限
     * @param 登录角色
     * @param menuId 菜单编号
     * @param update 更新行为
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void updateMenu(String character, int menuId, boolean update) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        menuDao = new MenuDao();

        menuDao.updateMenu(character, menuId, update);
    }
}
