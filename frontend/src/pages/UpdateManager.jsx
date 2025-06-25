import React from 'react';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Axios from "axios"
 import { UpdateManagerDetails } from "../Service/service";
import "../caps.css"
import {useNavigate} from "react-router-dom"

const UpdateManager = () => {
  const [managerDetails, setManagerDetails] = useState([]);
  const nav=useNavigate();
  useEffect(()=>{
    const asynccall=async()=>{
       await Axios.get("http://localhost:9091/deliciousbyte/view/manager")
       .then(res=>{
        setManagerDetails(res.data)
        console.log(res.data)
       
       })
    }
    asynccall();
    const intervalId = setInterval(() => {
       asynccall();
       console.log(managerDetails)
     }, 3000);
     return () => clearInterval(intervalId);
},[])
  
  const formik = useFormik({
    initialValues: {
      mid: "",
      mname: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      UpdateManagerDetails(values).then((res)=>{
        console.log(res)
        console.log("update log");
        nav('/ownerhome')
        alert("Updated Successfully")
      }).catch((error)=>{
        console.log(error);
        console.log("Error log");
      })
    }});
  return (
    <div id="cont">
       <form onSubmit={formik.handleSubmit}>
        <label htmlFor="mid">Manager ID</label><br />

          <input name="mid" value={formik.values.mid} onChange={formik.handleChange}/><br />
          <br></br>
        
        <label htmlFor="mname">Manager Name</label><br />
        {
          managerDetails.map((manager)=>{
            if(manager.mid==formik.values.mid)
            {
               formik.values.mname=manager.mname;
            }
          })
        }
        <br></br>
        <input name="mname" value={formik.values.mname} disabled></input><br />
        <label htmlFor="status">Select Status</label><br />
        <select onClick={formik.handleChange} name="status">
          <option value="">Select</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select><br /><br />
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default UpdateManager;
