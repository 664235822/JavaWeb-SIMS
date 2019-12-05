package com.service;

import com.dao.MenuDao;
import com.entity.BaseBean;

import java.sql.SQLException;

public class MenuService {

    MenuDao menuDao;

    public BaseBean getMenu(String character) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        menuDao =new MenuDao();

        return menuDao.getMenu(character);
    }
}
