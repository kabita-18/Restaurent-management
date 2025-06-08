package example.com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import example.com.JWT.JWTUtilityTokenProvider;
import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.Orders;
import example.com.model.RegisterUser;
import example.com.service.ManagementService;

@RestController
@RequestMapping("/deliciousbyte")
//@CrossOrigin(origins = "http://localhost:5173")
public class AppController {
	@Autowired
	private ManagementService service;
	@Autowired
    private AuthenticationManager authenticationManager;
	

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome to Web Application";
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody RegisterUser r) {
		try {
			if (service.findByEmail(r.getEmail()) != null) {
				return "Email already exists.";
			} else if (service.addUsers(r)) {
				return "User details added successfully...";
			}
		} catch (DataIntegrityViolationException e) {
			return "User details invalid.";
		}
		return "Something went wrong";

	}
	//Mannual user login method
	@PostMapping("/loginuser")
	public int userLogin(@RequestBody Login login) {
		System.out.println(login);
		return service.userLogin(login);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody Login login) {
		 try {
	            Map<String, String> response = service.loginUser(login);
	            return ResponseEntity.ok(response);
	        } catch (BadCredentialsException e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
	        }
	}

	@PostMapping("/owner/menu/add")

	public String addMenuItems(@RequestBody Menu m) {
		if (service.addMenuItems(m)) {
			return "Menu added successfully...";
		}
		return "invalid menu";
	}

	@PutMapping("/owner/menu/update")
	public String updateMenu(@RequestBody Menu m) {
		if (service.updateMenu(m)) {
			return "Update Successfully..";
		}
		return "invalid..";
	}

	@PostMapping("/owner/manager/addmanager")

	public String addManager(@RequestBody Manager mgr) {
		if (service.addManager(mgr)) {
			return "Manager Added Successfully..";
		}
		return "invalid manager details";
	}

	@PutMapping("/owner/manager/updatemanager")
	public String updateManager(@RequestBody Manager mgr) {
		if (service.updateManager(mgr)) {
			return "Manager Updated...!";
		}
		return "manager update failed..";
	}

	@PutMapping("/manager/menu/update")
	public String updateMenuByManager(@RequestBody Menu m) {
		if (service.updateMenuByManager(m)) {
			return "menu updated..!";

		}
		return "update failed..";
	}

	@PostMapping("/manager/order/addorder")
	public String addOrderByManager(@RequestBody Orders odr) {
		if (service.addOrderByManager(odr)) {
			return "Order added successfully...";
		}
		return "invalid order";
	}

	@GetMapping("/view/order")
	public List<Orders> listOfOrders() {
		List<Orders> o = service.findAllOrders();
		if (o != null) {
			return o;

		}
		return null;
	}

	@GetMapping("/view/menu")

	public List<Menu> listOfMenus() {
		List<Menu> m = service.findAllMenus();
		if (m != null) {
			return m;
		}
		return null;
	}

	@GetMapping("/view/manager")
	public List<Manager> listOfManager() {
		List<Manager> m = service.findAllManager();
		if (m != null) {
			return m;
		}
		return null;
	}

	@PutMapping("/manager/updatepassword")
	public String updatePassword(@RequestBody Login log) {
		System.out.println(log.getUseremail());
		System.out.println(log.getPassword());

		if (service.updatePassword(log)) {
			return "Update Successful...";
		}
		return "Error..";
	}

}
