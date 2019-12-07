package com.service;

import com.dao.MenuDao;
import com.entity.BaseBean;

import java.sql.SQLException;


/*
 * 获取主界面菜单服务类
 */
public class MenuService {

    MenuDao menuDao;

    /*
     * 获取主界面菜单
     * @param character 登录角色
     * @return BaseBean 返货菜单信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean getMenu(String character) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        menuDao = new MenuDao();

        return menuDao.getMenu(character);
    }
}
