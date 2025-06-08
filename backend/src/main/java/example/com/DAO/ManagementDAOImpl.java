package example.com.DAO;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import example.com.JPA.MyJPARepository;
import example.com.JPA.MyJPARepository2;
import example.com.JPA.MyJPArepository3;
import example.com.JPA.UserRepository;
import example.com.JWT.JWTUtilityTokenProvider;
import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.Orders;
import example.com.model.RegisterUser;
import jakarta.transaction.Transactional;


@Repository
public class ManagementDAOImpl implements ManagementDAO{
	 @Autowired
	 public MyJPARepository myRepo;
	 
	 @Autowired
	 public MyJPARepository2 myRepo2;
	 @Autowired
	 public MyJPArepository3 myRepo3;
	 @Autowired
	 public UserRepository userRepo;
	 @Autowired
	 private JWTUtilityTokenProvider jwtTokenProvider;
	 
	 @Override
	 public boolean addMenuItems(Menu m) {
		if(myRepo.save(m) != null) {
			return true;
		}
	
		 return false;
	 }

	@Override
	@Transactional
	public boolean updateMenu(Menu m) {
		int t=myRepo.updatePriceOrStatus(m.getDishname(),m.getStatus(),m.getPrice());
		System.out.println(t);
		if(t>0)
		{
			return true;
		}
		return false;
	}
	
	public boolean addManager(Manager mgr) {
		if(myRepo2.save(mgr) != null) {
			return true;
		}
		return false;
	}
	
	@Transactional
	public boolean updateManager(Manager mgr) {
		int t = myRepo2.updateManager(mgr.getMid(), mgr.getStatus());
		if(t> 0) {
			return true;
		}
		return false;
	}
	
	
	@Override
	@Transactional
	public boolean updateMenuByManager(Menu m) {
		int t = myRepo.updateMenuByManager(m.getDishname(), m.getStatus());
		if(t > 0) {
			return true;
		}
		return false;
	}
	
	public boolean addOrderByManager(Orders odr) {
		if(myRepo3.save(odr) != null) {
			return true;
		}
	
		 return false;
	}

	@Override
	public List<Orders> findAllOrders() {
		List<Orders> orderlist = (List<Orders>) myRepo3.findAll();
		return orderlist;
	}

	@Override
	public List<Menu> findAllMenus() {
		
		List<Menu> menuList = (List<Menu>) myRepo.findAll();
		return menuList;
	}

	@Override
	public List<Manager> findAllManager() {

		List<Manager> managerList = (List<Manager>) myRepo2.findAll();
		return managerList;
	}

	@Override
	public int userLogin(Login log) {
		
		RegisterUser user = userRepo.findByEmail(log.getUseremail());
//		System.out.println("Email entered: " + log.getUseremail());
//		System.out.println("Password entered: " + log.getPassword());
		
		if(user != null && user.getEmail().equals(log.getUseremail())&& log.getPassword().equals(user.getPassword())){
//			System.out.println("Input password: " + log.getPassword());
//		    System.out.println("DB password: " + user.getPassword());
			return 1;
		}
		else {
            System.out.println("Password mismatch.");
        }
		
		return 0;
	}

	@Override
	@Transactional
	public boolean updatePassword(Login log) {
		String email = log.getUseremail();
	    String password = log.getPassword();

	    RegisterUser user = userRepo.findByEmail(email);

	    if (user != null && user.getPassword().equals(password) && user.getEmail().equals(user)) {
	      
	        int rowsUpdated = userRepo.updatePassword(email, password); 
	        System.out.println("Rows updated: " + rowsUpdated);
	        return rowsUpdated > 0;
	    }
	    return false;
	}

	@Override
	public boolean addUsers(RegisterUser r) {
		if(userRepo.save(r)!= null) return true;
		return false;

	}

	@Override
	public RegisterUser findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}

	@Override
	public JwtResponse generateJwtToken(String useremail) {
		// TODO Auto-generated method stub
		RegisterUser user = userRepo.findByEmail(useremail);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		 String jwtToken = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());
	     return new JwtResponse(jwtToken);

		
	}

	@Override
	public Map<String, String> loginUser(Login login)throws BadCredentialsException {
		// TODO Auto-generated method stub
		RegisterUser user = userRepo.findByEmail(login.getUseremail());
        if (user == null) {
            throw new BadCredentialsException("User not found");
        }

        if (!user.getPassword().equals(login.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
		return response;
	}

//	@Override
//	public boolean updatePassword(String email, String newPassword) {
//		int rowsUpdated = userRepo.updatePassword(email.trim().toLowerCase(), newPassword);
//        return rowsUpdated > 0;
//	}

	
}
