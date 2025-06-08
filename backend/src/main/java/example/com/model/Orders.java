package example.com.model;



import java.util.Date;

import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 1000)

public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator="port_gen")
	private int orderid;
	
	 
	 @Temporal(TemporalType.DATE)
	 @DateTimeFormat(pattern = "yyyy-MM-dd")
	 @Column(name = "orderdate")
	 @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date orderdate= new Date();
	
	@Size(min = 10, max = 10)
	private String mobileno;
	
	@Column(unique = true, nullable = false)
	private int tableno;
	
	@Column(nullable = false)
	private String orderinfo;
	
	@Column(nullable = false)
	private double tprice;

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public Date getOrderdate() {
		return orderdate;
	}

	public void setOrderdate(Date orderdate) {
		this.orderdate = orderdate;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public int getTableno() {
		return tableno;
	}

	public void setTableno(int tableno) {
		this.tableno = tableno;
	}

	public String getOrderinfo() {
		return orderinfo;
	}

	public void setOrderinfo(String orderinfo) {
		this.orderinfo = orderinfo;
	}

	public double getTprice() {
		return tprice;
	}

	public void setTprice(double tprice) {
		this.tprice = tprice;
	}

	public Orders( Date orderdate, String mobileno, int tableno, String orderinfo, double tprice) {
		super();
		
		this.orderdate = orderdate;
		this.mobileno = mobileno;
		this.tableno = tableno;
		this.orderinfo = orderinfo;
		this.tprice = tprice;
	}

	public Orders() {
		super();
	}

	@Override
	public String toString() {
		return "Orders [orderid=" + orderid + ", orderdate=" + orderdate + ", mobileno=" + mobileno + ", tableno="
				+ tableno + ", orderinfo=" + orderinfo + ", tprice=" + tprice + "]";
	}
	
	
	
	
	
}
