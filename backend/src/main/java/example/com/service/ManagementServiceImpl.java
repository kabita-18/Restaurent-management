package example.com.service;



import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import example.com.DAO.ManagementDAO;
import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.Orders;
import example.com.model.RegisterUser;

@Service
public class ManagementServiceImpl implements ManagementService {
	@Autowired
	public ManagementDAO managementDAO;
	
	@Override
	public boolean addMenuItems(Menu m) {
		return managementDAO.addMenuItems(m);
	}

	@Override
	public boolean updateMenu(Menu m) {
		
		return managementDAO.updateMenu(m);
	}
	
	public boolean addManager(Manager mgr) {
		return managementDAO.addManager(mgr);
	}
	
	public boolean updateManager(Manager mgr) {
		return managementDAO.updateManager(mgr);
	}
	public boolean updateMenuByManager(Menu m) {
		return managementDAO.updateMenuByManager(m);
	}
	
	public boolean addOrderByManager(Orders odr) {
		return managementDAO.addOrderByManager(odr);
	}

	@Override
	public List<Orders> findAllOrders() {
		
		return managementDAO.findAllOrders();
	}

	@Override
	public List<Menu> findAllMenus() {
		return managementDAO.findAllMenus();
	}

	@Override
	public List<Manager> findAllManager() {
		
		return managementDAO.findAllManager();
	}

	@Override
	public int userLogin(Login log) {
		return managementDAO.userLogin(log);
	}

	@Override
	public boolean updatePassword(Login log) {
		
		return managementDAO.updatePassword(log);
	}

	@Override
	public boolean addUsers(RegisterUser r) {
		// TODO Auto-generated method stub
		return managementDAO.addUsers(r);
	}

	@Override
	public RegisterUser findByEmail(String email) {
		// TODO Auto-generated method stub
		return managementDAO.findByEmail(email);
	}

	@Override
	public JwtResponse generateJwtToken(String useremail) {
		// TODO Auto-generated method stub
		return managementDAO.generateJwtToken(useremail);
	}

	@Override
	public Map<String, String> loginUser(Login login) {
		// TODO Auto-generated method stub
		return managementDAO.loginUser(login);
	}

//	@Override
//	public boolean updatePassword(String email, String newPassword) {
//		
//		return managementDAO.updatePassword(email, newPassword);
//	}
}
