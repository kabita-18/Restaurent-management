import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Button from '@mui/material/Button';
import "../caps.css"

let flag=0;
let filtermanagers=[];
const ViewManager = () => {
  const [managers,setManagers]=useState([])
  useEffect(()=>{
    const asyncall=async()=>
    {
    await Axios.get("http://localhost:9091/deliciousbyte/view/manager")
    .then((res)=>{
      setManagers(res.data);
      console.log(res)
    })}
    asyncall();
    const intervalId = setInterval(() => {
      asyncall();
      
    }, 3000);
    return () => clearInterval(intervalId);
  },[])
 
  const sortByAvailability=()=>{
    const sorted=[...managers].sort((a,b)=>{
        return a.status> b.status ? 1 : -1
      })
      setManagers(sorted)
  }

  const [searchManager,setSearchManager]=useState("");

  const managerSearch=(e)=>{
    setSearchManager(e.target.value);
  }

  if(searchManager.length>0)
  {
    flag=1;
    filtermanagers=managers.filter((manager)=>{
      return manager.mname.toLowerCase().includes(searchManager.toLowerCase())
    })
  }
  if(searchManager.length==0 && flag==1)
  {
    flag=0;
    filtermanagers=managers;
  }
    

  const clearSort=()=>{
    window.location.reload(false);
  }
  return (
    <>
    <div id="cont">
    <Button variant="contained" className="but" onClick={sortByAvailability}>Sort by availability</Button>
    <input type='text' placeholder='search manager' onChange={managerSearch}></input>
    <Button variant="contained" className="but" onClick={clearSort}>Clear Sort</Button>

      <table id='view'>
        <tbody>
        <tr>
          <th>Manager ID</th>
          <th>Manager Name</th>
          <th>Manager Email</th>
          <th>Manager Status</th>
        </tr>
        {searchManager.length>0?
            (filtermanagers.map((manager)=>{
              return(
                <tr>
                  <td>{manager.mid}</td>
                  <td>{manager.mname}</td>
                  <td>{manager.email}</td>
                  {manager.status=== "Available"? (
                          <td style={{color:"green"}}>{manager.status}</td>
                        ) : (
                          <td style={{color:"red"}}>{manager.status}</td>

                        )
                  }
                  
                </tr>              
              )
            })
            ):managers.map((manager)=>{
              return(
                <tr>
                  <td>{manager.mid}</td>
                  <td>{manager.mname}</td>
                  <td>{manager.email}</td>
                 
                  {manager.status=== "Available"? (
                          <td style={{color:"green"}}>{manager.status}</td>
                        ) : (
                          <td style={{color:"red"}}>{manager.status}</td>

                        )
                  }
                  
                </tr>              
              )
            })
          }
        </tbody>
      </table>
      </div>
    </>
  )
}

export default ViewManager
