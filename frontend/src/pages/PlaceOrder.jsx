import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TableBarIcon from "@mui/icons-material/TableBar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import Axios from "axios";
import { AddOrderDetails } from "../Service/service";

const PlaceOrder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    email: "",
    phone: "",
    tableNo: "",
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:9090/deliciousbyte/view/menu"
        );
        const availableItems = response.data.filter(
          (item) => item.status === "available"
        );
        setMenuItems(availableItems);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: parseInt(value) || 0 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount = menuItems.reduce((acc, item) => {
    const qty = quantities[item.menuid] || 0;
    return acc + qty * item.price;
  }, 0);

  const handleSubmitOrder = async () => {
    const orderItems = menuItems
      .filter((item) => quantities[item.menuid])
      .map((item) => ({
        menuid: item.menuid,
        dishname: item.dishname,
        price: item.price,
        quantity: quantities[item.menuid],
      }));

    if (orderItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const payload = {
      ...orderDetails,
      totalAmount,
      items: orderItems,
    };

    try {
      await AddOrderDetails(payload);
      alert("Order placed successfully!");
      setQuantities({});
      setOrderDetails({ customerName: "", email: "", phone: "", tableNo: "" });
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "#f3f6f9",
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "1100px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          p: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            sx={{ bgcolor: "#3f51b5", width: 60, height: 60, margin: "0 auto" }}
          >
            <RestaurantMenuIcon fontSize="large" />
          </Avatar>
          <Typography variant="h3" mt={2} fontWeight="bold" color="primary">
            Place Your Order
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mt: 1, mb: 2, p: 0 }}
          >
            Freshly made dishes at your fingertips
          </Typography>
        </Box>

        {/* Customer Info */}
        <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#9c27b0",
              fontWeight: "bold",
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            Customer Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="customerName"
                value={orderDetails.customerName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={orderDetails.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={orderDetails.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Table Number"
                name="tableNo"
                value={orderDetails.tableNo}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Menu Items */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#9c27b0",
              fontWeight: "bold",
            }}
          >
            <FastfoodIcon sx={{ mr: 1 }} />
            Menu Items
          </Typography>

          <Box
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {menuItems.map((item) => (
              <Box
                key={item.menuid}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                <Box sx={{ flex: "2" }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.dishname}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {item.category}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0,
                    m: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="green"
                    sx={{
                      fontSize: "16px",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    ₹{item.price}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1", minWidth: 100 }}>
                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    variant="outlined"
                    inputProps={{ min: 0 }}
                    value={quantities[item.menuid] || ""}
                    onChange={(e) =>
                      handleQuantityChange(item.menuid, e.target.value)
                    }
                    fullWidth
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Total & Submit */}
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Typography variant="h6" gutterBottom>
              🧾 Total Amount: ₹{totalAmount}
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleSubmitOrder}
            >
              ✅ Confirm & Submit Order
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
