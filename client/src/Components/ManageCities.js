import React, { useEffect, useState } from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import './Assets/managecity.css'

const ManageCities = () => {

    const history = useHistory();

    const [cities, setCities] = useState([""]);
    useEffect(() => {
        const getCities = async () => {
            const res = await axios.post("/displaycity");
            setCities(res.data);
        }
        getCities();
    }, []);


    const editCity = (id) => {
        var link = "/editCity?id=" + id;
        history.push(link);
    }


    const deleteCity  = async (id) =>  {
        if (window.confirm("Are you sure you want to delete?")) {
            const res = await fetch("/deletecity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const data = await res.json();
            console.log(res.status);
            if (res.status !== 422 || !data) {
                window.alert("Invalid Data Input");
                console.log("Invalid Data Input");
            }
            else {
                window.alert("City Deleted");
                console.log("City Deleted");
                history.go(0);
            }
        }
    }

    if (cities) {
        var CitiesData = cities.map((val, i) => (
            <tr key={i}>
                <td key={val._id} className="clm1">{i + 1}</td>
                <td className="clm2">{val.name}</td>
                <td className="clm3">{val.details}</td>
                <td className="clm4">{val.location}</td>
                <td className="clm5"><button className="btn btn-primary" onClick={() => editCity(val._id, val)}  >Edit</button>&ensp;
                    <button className="btn btn-danger" onClick={() => deleteCity(val._id, val)}>Delete</button></td>
            </tr>
        ))
   
    } else {
        CitiesData = <tr>
            <td colSpan="4">No Records Found</td>
        </tr>
    }

    return (
        <div className="container-managecity">
            <br/><br/><center><h1>All Cities</h1></center>
            <div><br/><br/><center>
                <table bordered className="table-city">
                    <thead>
                        <tr>
                            <th className="clm1">#</th>
                            <th className="clm2">City Name</th>
                            <th className="clm3">City Details</th>
                            <th className="clm4">City Location</th>
                            <th className="clm5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CitiesData}
                    </tbody>
                </table>
                </center></div>
                <section className="back2">
               <center> <NavLink to="/adminpanel" className="back2">Back</NavLink></center>
                <br />
            </section>
            <br/><br/><br/>
        </div>
    )
}

export default ManageCities