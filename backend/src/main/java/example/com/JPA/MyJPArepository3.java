package example.com.JPA;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import example.com.model.Orders;

@Repository

public interface MyJPArepository3 extends CrudRepository<Orders,String>{
	
}
