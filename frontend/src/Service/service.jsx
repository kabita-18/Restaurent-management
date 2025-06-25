import axios from "axios";

export const BASE_URL = "http://localhost:9090";
export const myAxios = axios.create({
    baseURL:BASE_URL
})

export const registerUsers = async (user) =>{
    console.log(user);
    try{
        const response = await myAxios.post("/deliciousbyte/register", user);
        return response.data;
    }
    catch (error) {
        console.error('Sign-up error:', error);
        return 'Error occurred';
  }
}

export const register = async (user)=>{
    console.log(user)
    const response = await myAxios.post("deliciousbyte/owner/manager/addmanager", user);
    return response.data;
}

export const AddMenuItems = async (menu)=>{
    try{
        const response=await myAxios.post("deliciousbyte/owner/menu/add",menu);
        console.log('Success!', response.data);
    }
    catch (error) {
    if (error.response && error.response.status === 400) {
     
      alert(error.response.data);
    } else {
     
      console.error('Error adding menu!', error);
    }
  }
    
}

export const updatePassword = async (log) => {
    const token = localStorage.getItem("token");

    const response = await myAxios.put("deliciousbyte/manager/updatepassword", log, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

export const UpdateMenuItemsOwners = async (menu)=>{
    const response = await myAxios.put("deliciousbyte/owner/menu/update",menu)
    return response.data
}

export const UpdateMenuItemsManager = async (menu)=>{
    const response=await myAxios.put("deliciousbyte/manager/menu/update",menu)
    return response.data
}
export const checklogin = async(log)=>{
    const response = await myAxios.post("/deliciousbyte/login", log, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true 
    });
    return response.data;
    // console.log(log)
    // const response=await myAxios.post("/login", log)
    // return response.data;
}

export const UpdateManagerDetails = async (manager) =>{
    
    const response = await myAxios.put("deliciousbyte/owner/manager/updatemanager", manager);
    return response.data;
}
// export const getManagerDetails = async (manager) =>{
    
//     const response = await myAxios.get("deliciousbytes/view/manager", manager);
//     return response.data;
// }

export const AddOrderDetails = async (order) =>{
    try {
    const response = await myAxios.post("deliciousbyte/order/addorder", order);
    return response.data;
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
    
}

// export const fetchUserProfile = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("No token found");
//   }

//   const response = await myAxios.get("deliciousbyte/login", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return response.data;
// };


