package example.com.DAO;

import java.util.List;
import java.util.Map;

import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.Orders;
import example.com.model.PasswordUpdateRequest;
import example.com.model.RegisterUser;
import jakarta.servlet.http.HttpServletRequest;

public interface ManagementDAO {

	public boolean addMenuItems(Menu m);

	public boolean updateMenu(Menu m);

	public boolean addManager(Manager mgr);

	public boolean updateManager(Manager mgr);

	public boolean updateMenuByManager(Menu m);
	
	public boolean addOrderByManager(Orders odr);

	public List<Orders> findAllOrders();

	public List<Menu> findAllMenus();

	public List<Manager> findAllManager();

	public int userLogin(Login log);

//	public boolean updatePassword(Login log);

	public boolean addUsers(RegisterUser r);

	public RegisterUser findByEmail(String email);

	public JwtResponse generateJwtToken(String useremail);

	public Map<String, String> loginUser(Login login);

	public boolean updatePassword(PasswordUpdateRequest request);

//	public boolean updatePassword(String email, String newPassword);


}
